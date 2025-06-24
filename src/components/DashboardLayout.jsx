import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';

const DashboardLayout = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    // Navigation items based on user role
    const getNavigationItems = () => {
        const baseItems = [
            { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
            { name: 'Profile', path: '/profile', icon: '👤' }
        ];

        // Role-specific navigation items
        if (user) {
            const userRole = typeof user.role === 'string' ? parseInt(user.role) : user.role;
            
            // Add driver-specific items
            if ((userRole & 1) === 1) { // driver role
                baseItems.push(
                    { name: 'My Shifts', path: '/shifts', icon: '🚖' },
                    { name: 'My Calls', path: '/my-calls', icon: '📞' }
                );
            }
            
            // Add dispatcher-specific items
            if ((userRole & 2) === 2) { // dispatcher role
                baseItems.push(
                    { name: 'Call Board', path: '/call-board', icon: '📋' },
                    { name: 'Drivers', path: '/drivers', icon: '👥' }
                );
            }
            
            // Add manager+ specific items
            if ((userRole & 4) >= 4) { // manager role or higher
                baseItems.push(
                    { name: 'Reports', path: '/reports', icon: '📊' },
                    { name: 'Users', path: '/users', icon: '⚙️' }
                );
            }
            
            // Add admin-specific items
            if ((userRole & 16) === 16) { // admin role
                baseItems.push(
                    { name: 'System Settings', path: '/admin', icon: '🔧' }
                );
            }
        }

        return baseItems;
    };

    const navigationItems = getNavigationItems();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-md min-h-screen">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            {user?.name || user?.username || 'User'} Dashboard
                        </h2>
                        
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
                                    <span className="mr-3 text-lg">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        
                        {/* User Role Badge */}
                        <div className="mt-8 p-3 bg-gray-100 rounded-md">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Current Role</p>
                            <p className="text-sm font-medium text-gray-900">
                                {getUserRoleDisplay(user?.role)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

// Helper function to display user roles
const getUserRoleDisplay = (role) => {
    if (!role) return 'User';
    
    const userRole = typeof role === 'string' ? parseInt(role) : role;
    const roles = [];
    
    if ((userRole & 16) === 16) roles.push('Admin');
    if ((userRole & 8) === 8) roles.push('Owner');
    if ((userRole & 4) === 4) roles.push('Manager');
    if ((userRole & 2) === 2) roles.push('Dispatcher');
    if ((userRole & 1) === 1) roles.push('Driver');
    if (userRole === 0) roles.push('User');
    
    return roles.length > 0 ? roles.join(', ') : 'User';
};

export default DashboardLayout;
