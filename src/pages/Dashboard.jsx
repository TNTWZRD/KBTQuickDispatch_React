import React from 'react';
import { useAuth } from '../utilities/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
    const { user } = useAuth();

    const getDashboardContent = () => {
        if (!user) return null;

        const userRole = typeof user.role === 'string' ? parseInt(user.role) : user.role;
          // Admin Dashboard
        if ((userRole & 16) === 16) {
            return (
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Users" value="0" color="blue" />
                        <StatCard title="Active Drivers" value="0" color="green" />
                        <StatCard title="System Status" value="Online" color="green" />
                        <StatCard title="Daily Calls" value="0" color="purple" />
                    </div>
                    <QuickActions role="admin" />
                </div>
            );
        }
        
        // Manager Dashboard
        if ((userRole & 4) >= 4) {
            return (
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard title="Active Drivers" value="0" color="green" />
                        <StatCard title="Today's Calls" value="0" color="blue" />
                        <StatCard title="Revenue Today" value="$0.00" color="purple" />
                    </div>
                    <QuickActions role="manager" />
                </div>
            );
        }
        
        // Dispatcher Dashboard
        if ((userRole & 2) === 2) {
            return (
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Dispatcher Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard title="Pending Calls" value="0" color="yellow" />
                        <StatCard title="Active Calls" value="0" color="green" />
                        <StatCard title="Available Drivers" value="0" color="blue" />
                    </div>
                    <QuickActions role="dispatcher" />
                </div>
            );
        }
        
        // Driver Dashboard
        if ((userRole & 1) === 1) {
            return (
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard title="Shift Status" value="Off Duty" color="red" />
                        <StatCard title="Today's Calls" value="0" color="blue" />
                        <StatCard title="Today's Earnings" value="$0.00" color="green" />
                    </div>
                    <QuickActions role="driver" />
                </div>
            );
        }
        
        // Default User Dashboard
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Welcome to QuickDispatch</h1>
                <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600">
                        You're successfully logged in to QuickDispatch. Your account is set up but you don't have any special roles assigned yet.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Contact your administrator to get the appropriate roles assigned to access more features.
                    </p>
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
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500'
    };

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className={`h-8 w-8 rounded-md ${colorClasses[color]}`}></div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                            <dd className="text-lg font-medium text-gray-900">{value}</dd>
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

    const actions = getActions();    if (actions.length === 0) return null;

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
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
