import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';
import { useTheme } from '../utilities/theme';
import Navbar from './Navbar';
import Footer from './Footer';

const DashboardLayout = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    const { isDark } = useTheme();

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
        <div className="min-h-screen bg-dashboard-bg">
            <Navbar />
            
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 theme-nav shadow-lg min-h-screen">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-sidebar-text mb-6">
                            {user?.name || user?.username || 'User'} Dashboard
                        </h2>
                        
                        <nav className="space-y-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`theme-nav-item rounded-md ${
                                        location.pathname === item.path ? 'active' : ''
                                    }`}
                                >
                                    <span className="mr-3 text-lg">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        
                        {/* User Role Badge */}
                        <div className="mt-8 p-3 bg-sidebar-bg/20 rounded-md border border-sidebar-text/20">
                            <p className="text-xs text-sidebar-text/70 uppercase tracking-wide">Current Role</p>
                            <p className="text-sm font-medium text-sidebar-text">
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
