import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { UserAuth } from '../apis/authentication';
import { DOMAIN } from '../apis/config';
import { createConsumer } from '@rails/actioncable';

const AuthContext = createContext();

const uAuth = new UserAuth();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt_token', 'user_data']);
    const [userStatus, setUserStatus] = useState('offline');

    // ActionCable state
    const [cableConnected, setCableConnected] = useState(false);
    const [wsAuthenticated, setWsAuthenticated] = useState(false);
    const [subscriptions, setSubscriptions] = useState(new Map());
    const [messageHistory, setMessageHistory] = useState([]);
    
    const cableRef = useRef(null);
    const authChannelRef = useRef(null);
    const statusChannelRef = useRef(null);

    // Construct ActionCable URL
    const getCableUrl = () => {
        const wsProtocol = DOMAIN.startsWith('https') ? 'wss' : 'ws';
        const baseUrl = DOMAIN.replace(/^https?:\/\//, '');
        return `${wsProtocol}://${baseUrl}/cable`;
    };

    // Initialize ActionCable connection
    const initializeCable = useCallback(() => {
        if (cableRef.current || !isAuthenticated || !jwt) return;

        console.log('Initializing ActionCable connection...');
        const cableUrl = getCableUrl();
        
        cableRef.current = createConsumer(cableUrl);

        // Subscribe to AuthChannel for authentication - this will handle connection state
        if (cableRef.current && !authChannelRef.current) {
            console.log('Subscribing to AuthChannel...');
            
            authChannelRef.current = cableRef.current.subscriptions.create(
                { channel: 'AuthChannel' },
                {
                    connected() {
                        console.log('AuthChannel connected');
                        setCableConnected(true);
                        // Authenticate with the server
                        this.perform('authenticate', { token: jwt?.split(' ')[1] });
                    },

                    disconnected() {
                        console.log('AuthChannel disconnected');
                        setCableConnected(false);
                        setWsAuthenticated(false);
                    },

                    rejected() {
                        console.error('AuthChannel subscription rejected');
                        setCableConnected(false);
                        setWsAuthenticated(false);
                    },

                    received(data) {
                        console.log('AuthChannel received:', data);
                        setMessageHistory(prev => [...prev, { ...data, timestamp: new Date().toISOString() }]);

                        if (data.type === 'authentication_success') {
                            console.log('ActionCable authenticated successfully');
                            setWsAuthenticated(true);
                        } else if (data.type === 'authentication_failure') {
                            console.error('ActionCable authentication failed:', data.message);
                            setWsAuthenticated(false);
                        }
                    }
                }
            );

            setSubscriptions(prev => new Map(prev.set('AuthChannel', authChannelRef.current)));
        }
    }, [isAuthenticated, jwt]);

    // Subscribe to a channel
    const subscribeToChannel = useCallback((channelName, params = {}, callbacks = {}) => {
        if (!cableRef.current || subscriptions.has(channelName)) {
            return subscriptions.get(channelName);
        }

        console.log(`Subscribing to ${channelName}...`, params);

        const subscription = cableRef.current.subscriptions.create(
            { channel: channelName, ...params },
            {
                connected() {
                    console.log(`${channelName} connected`);
                    callbacks.connected && callbacks.connected();
                },

                disconnected() {
                    console.log(`${channelName} disconnected`);
                    callbacks.disconnected && callbacks.disconnected();
                },

                rejected() {
                    console.error(`${channelName} subscription rejected`);
                    callbacks.rejected && callbacks.rejected();
                },

                received(data) {
                    console.log(`${channelName} received:`, data);
                    setMessageHistory(prev => [...prev, { 
                        ...data, 
                        channel: channelName,
                        timestamp: new Date().toISOString() 
                    }]);
                    callbacks.received && callbacks.received(data);
                }
            }
        );

        setSubscriptions(prev => new Map(prev.set(channelName, subscription)));
        return subscription;
    }, [subscriptions]);

    // Unsubscribe from a channel
    const unsubscribeFromChannel = useCallback((channelName) => {
        const subscription = subscriptions.get(channelName);
        if (subscription) {
            console.log(`Unsubscribing from ${channelName}...`);
            subscription.unsubscribe();
            setSubscriptions(prev => {
                const newMap = new Map(prev);
                newMap.delete(channelName);
                return newMap;
            });
        }
    }, [subscriptions]);

    // Send message to a channel
    const sendToChannel = useCallback((channelName, action, data = {}) => {
        const subscription = subscriptions.get(channelName);
        if (subscription && cableConnected) {
            console.log(`Sending to ${channelName}:`, { action, data });
            subscription.perform(action, data);
            return true;
        } else {
            console.warn(`Cannot send to ${channelName}: not connected or not subscribed`);
            return false;
        }
    }, [subscriptions, cableConnected]);

    // Cleanup cable connection
    const disconnectCable = useCallback(() => {
        if (cableRef.current) {
            console.log('Disconnecting ActionCable...');
            cableRef.current.disconnect();
            cableRef.current = null;
            authChannelRef.current = null;
            statusChannelRef.current = null;
            setSubscriptions(new Map());
            setCableConnected(false);
            setWsAuthenticated(false);
        }
    }, []);

    const handleStatusUpdate = useCallback((status) => {
        if (!cableRef.current || !wsAuthenticated) return;
        status = status || userStatus;
        setUserStatus(status);
        console.log('Updating user status:', status);
        if (statusChannelRef.current) {
            statusChannelRef.current.perform('message', { status });
        }
    }, [statusChannelRef, userStatus, wsAuthenticated, cableRef, setUserStatus]);

    const subscribeToStatusChannel = useCallback(() => {
        if (!cableRef.current || statusChannelRef.current || !wsAuthenticated) return;

        console.log('Subscribing to StatusChannel...');

        statusChannelRef.current = cableRef.current.subscriptions.create(
            { channel: 'StatusChannel' },
            {
                connected() {
                    console.log('StatusChannel connected');
                    handleStatusUpdate('online');
                },

                disconnected() {
                    console.log('StatusChannel disconnected');
                    handleStatusUpdate('offline');
                },

                rejected() {
                    console.error('StatusChannel subscription rejected');
                    handleStatusUpdate('offline');
                },

                received(data) {
                    console.log('StatusChannel received:', data);
                    setMessageHistory(prev => [...prev, { ...data, timestamp: new Date().toISOString() }]);

                    if (data.type === 'status_update') {
                        console.log('StatusChannel status update received:', data);
                    } else if (data.type === 'status_update_failed') {
                        console.error('StatusChannel status update failed:', data.message);
                    }
                }
                
            }
        );

        setSubscriptions(prev => new Map(prev.set('StatusChannel', statusChannelRef.current)));
    }, [cableRef, statusChannelRef, wsAuthenticated, handleStatusUpdate]);

    useEffect(() => {
        if (cableRef.current && !statusChannelRef.current) {
            subscribeToStatusChannel();
        }
    }, [subscribeToStatusChannel, cableRef, statusChannelRef]);

    // Initialize cable when authenticated
    useEffect(() => {
        if (isAuthenticated && jwt && !cableRef.current) {
            initializeCable(); 
        } else if (!isAuthenticated && cableRef.current) {
            disconnectCable();
        }
    }, [isAuthenticated, jwt, initializeCable, disconnectCable]);

    // Check if user is already authenticated on component mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const storedToken = cookies.jwt_token;
                if (storedToken) {
                    const [userData, error] = await uAuth.checkLogin(storedToken);
                    if (userData && !error) {
                        setUser(userData);
                        setJwt(storedToken);
                        setIsAuthenticated(true);
                    } else {
                        // Token is invalid, remove it
                        removeCookie('jwt_token', { path: '/' });
                        removeCookie('user_data', { path: '/' });
                    }
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, [cookies.jwt_token, removeCookie, subscribeToStatusChannel]);

    const login = async (login, password) => {
        try {
            setLoading(true);
            const [response, error] = await uAuth.Login({ user: { login, password }});
            
            if (response && !error) {
                const { auth, ...userData } = response;
                setUser(userData.data);
                setJwt(auth);
                setIsAuthenticated(true);
                
                // Store in cookies with 7 days expiration
                const expires = new Date();
                expires.setDate(expires.getDate() + 7);
                setCookie('jwt_token', auth, { path: '/', expires });
                setCookie('user_data', JSON.stringify(userData.data), { path: '/', expires });

                return [true, null];
            } else {
                return [false, error];
            }
        } catch (error) {
            console.error('Login failed:', error);
            return [false, `Login failed: ${error.message}`];
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const [response, error] = await uAuth.Register(userData);
            
            if (response && !error) {
                const { auth, ...userInfo } = response;
                setUser(userInfo.data);
                setJwt(auth);
                setIsAuthenticated(true);
                
                // Store in cookies with 7 days expiration
                const expires = new Date();
                expires.setDate(expires.getDate() + 7);
                setCookie('jwt_token', auth, { path: '/', expires });
                setCookie('user_data', JSON.stringify(userInfo.data), { path: '/', expires });
                
                return [true, null];
            } else {
                return [false, error];
            }
        } catch (error) {
            console.error('Registration failed:', error);
            return [false, `Registration failed: ${error.message}`];
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            if (statusChannelRef.current) {
                handleStatusUpdate('offline');
            }
            if (jwt) {
                await uAuth.Logout(jwt);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Disconnect cable before clearing state
            disconnectCable();
            
            // Clear state regardless of API call success
            setUser(null);
            setJwt(null);
            setIsAuthenticated(false);
            removeCookie('jwt_token', { path: '/' });
            removeCookie('user_data', { path: '/' });
            setWsAuthenticated(false);
        }
    };

    const deleteAccount = async () => {
        try {
            if (jwt) {
                const [success, error] = await uAuth.Delete(jwt);
                if (success) {
                    // Disconnect cable before clearing state
                    disconnectCable();
                    
                    setUser(null);
                    setJwt(null);
                    setIsAuthenticated(false);
                    removeCookie('jwt_token', { path: '/' });
                    removeCookie('user_data', { path: '/' });
                    setWsAuthenticated(false);
                    return [true, null];
                } else {
                    return [false, error];
                }
            }
            return [false, 'No authentication token found'];
        } catch (error) {
            console.error('Delete account failed:', error);
            return [false, `Delete account failed: ${error.message}`];
        }
    };

    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
        // Update the cookie with new user data
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        setCookie('user_data', JSON.stringify(updatedUserData), { path: '/', expires });
    };

    // Get connection status
    const getConnectionStatus = () => {
        if (!cableConnected) return 'disconnected';
        if (!wsAuthenticated) return 'connected_unauthenticated';
        return 'connected_authenticated';
    };

    const value = {
        isAuthenticated,
        user,
        jwt,
        loading,
        login,
        register,
        logout,
        deleteAccount,
        updateUser,
        userStatus,
        // ActionCable methods
        cable: {
            connected: cableConnected,
            authenticated: wsAuthenticated,
            status: getConnectionStatus(),
            subscribeToChannel,
            unsubscribeFromChannel,
            sendToChannel,
            messageHistory,
            subscriptions: Array.from(subscriptions.keys())
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}