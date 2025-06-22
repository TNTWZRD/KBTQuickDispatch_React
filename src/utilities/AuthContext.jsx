import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { UserAuth } from '../apis/authentication';

const AuthContext = createContext();

const uAuth = new UserAuth();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt_token', 'user_data']);

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
    }, [cookies.jwt_token, removeCookie]);

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
            if (jwt) {
                await uAuth.Logout(jwt);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear state regardless of API call success
            setUser(null);
            setJwt(null);
            setIsAuthenticated(false);
            removeCookie('jwt_token', { path: '/' });
            removeCookie('user_data', { path: '/' });
        }
    };

    const deleteAccount = async () => {
        try {
            if (jwt) {
                const [success, error] = await uAuth.Delete(jwt);
                if (success) {
                    setUser(null);
                    setJwt(null);
                    setIsAuthenticated(false);
                    removeCookie('jwt_token', { path: '/' });
                    removeCookie('user_data', { path: '/' });
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

    const value = {
        isAuthenticated,
        user,
        jwt,
        loading,
        login,
        register,
        logout,
        deleteAccount,
        updateUser
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