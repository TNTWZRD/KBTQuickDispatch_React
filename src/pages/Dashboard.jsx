import React from 'react';
import { useAuth } from '../utilities/AuthContext';
import { getStatusColor } from '../utilities/theme';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
    const { user } = useAuth();

    const getDashboardContent = () => {
        if (!user) return null;

        const userRole = typeof user.role === 'string' ? parseInt(user.role) : user.role;
        
        // Admin Dashboard
        if ((userRole & 16) === 16) {
            return (
                <div className="space-y-6 theme-fade-in">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Users" value="0" color="primary" />
                        <StatCard title="Active Drivers" value="0" color="success" />
                        <StatCard title="System Status" value="Online" color="success" />
                        <StatCard title="Daily Calls" value="0" color="secondary" />
                    </div>
                    <QuickActions role="admin" />
                </div>
            );
        }
        
        // Manager Dashboard
        if ((userRole & 4) >= 4) {
            return (
                <div className="space-y-6 theme-fade-in">
                    <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard title="Active Drivers" value="0" color="success" />
                        <StatCard title="Today's Calls" value="0" color="primary" />
                        <StatCard title="Revenue Today" value="$0.00" color="secondary" />
                    </div>
                    <QuickActions role="manager" />
                </div>
            );
        }
        
        // Dispatcher Dashboard
        if ((userRole & 2) === 2) {
            return (
                <div className="space-y-6 theme-fade-in">
                    <h1 className="text-3xl font-bold text-gray-900">Dispatcher Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard title="Pending Calls" value="0" color="warning" />
                        <StatCard title="Active Calls" value="0" color="success" />
                        <StatCard title="Available Drivers" value="0" color="primary" />
                    </div>
                    <QuickActions role="dispatcher" />
                </div>
            );
        }
        
        // Driver Dashboard
        if ((userRole & 1) === 1) {
            return (
                <div className="space-y-6 theme-fade-in">
                    <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard title="Shift Status" value="Off Duty" color="error" />
                        <StatCard title="Today's Calls" value="0" color="primary" />
                        <StatCard title="Today's Earnings" value="$0.00" color="success" />
                    </div>
                    <QuickActions role="driver" />
                </div>
            );
        }
        
        // Default User Dashboard
        return (
            <div className="space-y-6 theme-fade-in">
                <h1 className="text-3xl font-bold text-gray-900">Welcome to QuickDispatch</h1>
                <div className="theme-card">
                    <div className="theme-card-body">
                        <p className="text-gray-600">
                            You're successfully logged in to QuickDispatch. Your account is set up but you don't have any special roles assigned yet.
                        </p>
                        <p className="text-gray-600 mt-4">
                            Contact your administrator to get the appropriate roles assigned to access more features.
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <DashboardLayout>
            {getDashboardContent()}
        </DashboardLayout>
    );
};

// Stat Card Component
const StatCard = ({ title, value, color }) => {
    const colorClasses = {
        primary: 'bg-primary-500',
        secondary: 'bg-secondary-500',
        success: 'bg-success-500',
        warning: 'bg-warning-500',
        error: 'bg-error-500'
    };

    const iconBgClasses = {
        primary: 'bg-primary-100',
        secondary: 'bg-secondary-100', 
        success: 'bg-success-100',
        warning: 'bg-warning-100',
        error: 'bg-error-100'
    };

    return (
        <div className="theme-card hover:shadow-md transition-shadow">
            <div className="theme-card-body">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className={`h-8 w-8 rounded-md ${colorClasses[color]} flex items-center justify-center`}>
                            <div className={`h-4 w-4 rounded-sm ${iconBgClasses[color]}`}></div>
                        </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                            <dd className={`text-lg font-bold text-${color}-600`}>{value}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Quick Actions Component
const QuickActions = ({ role }) => {
    const getActions = () => {
        switch (role) {
            case 'admin':
                return [
                    { title: 'Manage Users', description: 'Add, edit, or remove users', action: '/users' },
                    { title: 'System Settings', description: 'Configure system parameters', action: '/admin' },
                    { title: 'View Reports', description: 'Access all system reports', action: '/reports' }
                ];
            case 'manager':
                return [
                    { title: 'View Reports', description: 'Access management reports', action: '/reports' },
                    { title: 'Manage Drivers', description: 'View driver performance', action: '/drivers' },
                    { title: 'Call Board', description: 'Monitor call activity', action: '/call-board' }
                ];
            case 'dispatcher':
                return [
                    { title: 'Call Board', description: 'Manage incoming calls', action: '/call-board' },
                    { title: 'Driver Status', description: 'View driver availability', action: '/drivers' },
                    { title: 'Create Call', description: 'Add new call to system', action: '/calls/new' }
                ];
            case 'driver':
                return [
                    { title: 'Start Shift', description: 'Begin your driving shift', action: '/shift/start' },
                    { title: 'My Calls', description: 'View assigned calls', action: '/my-calls' },
                    { title: 'Update Status', description: 'Change availability status', action: '/status' }
                ];
            default:
                return [];
        }
    };

    const actions = getActions();

    if (actions.length === 0) return null;

    return (
        <div className="theme-card">
            <div className="theme-card-header">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="theme-card-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            className="p-4 border border-dashboard-border rounded-lg hover:bg-gray-50 text-left transition-all hover:shadow-md theme-focus-visible"
                            onClick={() => {
                                // For now, we'll just log the action
                                console.log(`Navigate to: ${action.action}`);
                            }}
                        >
                            <h4 className="font-medium text-gray-900">{action.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
