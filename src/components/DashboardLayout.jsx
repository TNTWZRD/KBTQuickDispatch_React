import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import UserHelper from '../utilities/UserHelper';
import Navbar from './Navbar';
import Footer from './Footer';

const DashboardLayout = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    
    const user_h = new UserHelper(user);

    // Navigation items based on user role
    const getNavigationItems = () => {
        const baseItems = [
            { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
            { name: 'Profile', path: '/profile', icon: '👤' }
        ];

  
        if (user !== null && user?.roles) {
            console.log('User Roles:', user.roles);    
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
                    { name: 'Drivers', path: '/drivers', icon: '👥' }
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
            if (user_h.isAdmin()) { // admin role
                baseItems.push(
                    { name: 'System Settings', path: '/admin', icon: '🔧' }
                );
            }
        }

        console.log('Navigation Items:', baseItems);
        return baseItems;
    };

    const navigationItems = getNavigationItems();

    const [menuExpanded, setMenuExpanded] = React.useState(false);
    const handleMenuExpand = () => {
        setMenuExpanded(!menuExpanded);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="hidden md:block">
                <Navbar />
            </div>
            
            <div className="flex">
                {/* Sidebar */}
                <div className="sm:w-50 md:w-45 lg:w-64 bg-white shadow-md min-h-screen">
                    <div className="p-2 md:p-4 lg:p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 hidden md:block">
                            {user_h.namePlural() || user_h.userNamePlural() || 'User'} Dashboard
                        </h2>
                        <button className="md:hidden bg-yellow-200 mb-5 py-2 px-5 rounded" onClick={handleMenuExpand}>
                            |||
                        </button>
                        
                        <nav className="space-y-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
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
                    <main className="flex-1 p-2 md:p-4 lg:p-6">
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
