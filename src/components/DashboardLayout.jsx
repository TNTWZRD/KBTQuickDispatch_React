import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import UserHelper from '../utilities/UserHelper';
import Navbar from './Navbar';
import Footer from './Footer';

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    
    const user_h = new UserHelper(user);

    // Navigation items based on user role
    const getNavigationItems = () => {
        const baseItems = [
            { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
            { name: 'Profile', path: '/profile', icon: '👤' }
        ];

  
        if (user !== null && user?.roles) { 
            // Add driver-specific items
            if (user_h.isDriver()) { // driver role
                baseItems.push(
                    { name: 'My Shifts', path: '/shifts', icon: '🚖' },
                    { name: 'My Calls', path: '/my-calls', icon: '📞' }
                );
            }
            
            // Add dispatcher-specific items
            if (user_h.isDispatcher()) { // dispatcher role
                baseItems.push(
                    { name: 'Call Board', path: '/call-board', icon: '📋' },
                    { name: 'Drivers', path: '/drivers', icon: '👥' },
                    { name: 'Vehicles', path: '/vehicles', icon: '🚕' }
                );
            }
            
            // Add manager+ specific items
            if (user_h.isManager()) { // manager role or higher
                baseItems.push(
                    { name: 'Reports', path: '/reports', icon: '📊' },
                    { name: 'Users', path: '/users-manage', icon: '⚙️' }
                );
            }
            
            // Add admin-specific items
            if (user_h.isOwner()) { // admin role
                baseItems.push(
                    { name: 'System Settings', path: '/admin', icon: '🔧' }
                );
            }
        }

        return baseItems;
    };

    const navigationItems = getNavigationItems();

    const [menuExpanded, setMenuExpanded] = React.useState(false);
    const handleMenuExpand = () => {
        setMenuExpanded(!menuExpanded);
    }

     const handleLogout = async () => {
        try {
            await logout();
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="hidden md:block">
                <Navbar />
            </div>
            
            <div className="flex">
                {/* Sidebar */}
                <div className="md:w-59 lg:w-64 bg-white shadow-md min-h-screen">
                    <div className="p-2 md:p-4 lg:p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 hidden md:block">
                            {user_h.namePlural() || user_h.userNamePlural() || 'User'} Dashboard
                        </h2>
                        <button className="md:hidden bg-yellow-200 mb-5 p-2 px-4 rounded" onClick={handleMenuExpand}>
                            |||
                        </button>
                        
                        <nav className="space-y-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center p-2 text-sm font-medium rounded-md transition-colors ${
                                        location.pathname === item.path
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <span className="mr-auto text-lg">{item.icon}</span>
                                    <span className={`${(!menuExpanded)? "hidden" : ""} md:inline-block`}>
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                            <span className={`${(menuExpanded)? '': 'hidden'} md:hidden text-sm text-gray-500 mt-2`}>
                                <button onClick={handleLogout} className="bg-yellow-300 hover:bg-yellow-500 rounded px-2 py-1.5">
                                    Logout
                                </button>
                            </span>
                        </nav>
                        
                        {/* User Role Badge */}
                        <div className='mt-8 p-3 bg-gray-100 rounded-md hidden md:block'>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Current Role</p>
                            <p className="text-sm font-medium text-gray-900">
                                {(user.roles.slice(1)).map((r) => { return r[0].toUpperCase()+r.slice(1) }).join(', ') || 'No roles assigned'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col" onClick={() => setMenuExpanded(false)}>
                    <main className="flex-1 p-1 md:p-4 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
            
            <div className="hidden md:block mt-13">
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;
