import React from 'react';
import { useAuth } from '../utilities/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();

    const getDashboardContent = () => {
        if (!user) return null;

        const statCards = [];
        const quickActions = [];

          // Admin Dashboard
        if ((user.roles?.includes('admin') || user.roles?.includes('superadmin'))) {
            statCards.push(
                <div className="bg-white p-6 rounded-lg shadow">
                    Admin
                    <StatCard key="total-users" title="Total Users" value="0" color="blue" />,
                    <StatCard key="active-drivers" title="Active Drivers" value="0" color="green" />,
                    <StatCard key="daily-calls" title="Daily Calls" value="0" color="purple" />
                </div>
            );
            quickActions.push( 'admin');
        }
        
        // Manager Dashboard
        if ((user.roles?.includes('manager'))) {
            statCards.push(
                <div className="bg-white p-6 rounded-lg shadow">
                    Manager
                    <StatCard key="active-drivers" title="Active Drivers" value="0" color="green" />,
                    <StatCard key="todays-calls" title="Today's Calls" value="0" color="blue" />,
                    <StatCard key="revenue-today" title="Revenue Today" value="$0.00" color="purple" />
                </div>
            );
            quickActions.push('manager');
        }
        
        // Dispatcher Dashboard
        if ((user.roles?.includes('dispatcher'))) {
            statCards.push(
                <div className="bg-white p-6 rounded-lg shadow">
                    Dispatcher
                    <StatCard key="pending-calls" title="Pending Calls" value="0" color="yellow" />,
                    <StatCard key="active-calls" title="Active Calls" value="0" color="green" />,
                    <StatCard key="available-drivers" title="Available Drivers" value="0" color="blue" />,
                </div>
            );
            quickActions.push('dispatcher');
        }
        
        // Driver Dashboard
        if (user.roles?.includes('driver')) {
            statCards.push(
                <div className="bg-white p-6 rounded-lg shadow">
                    Driver
                    <StatCard key="shift-status" title="Shift Status" value="Off Duty" color="red" />,
                    <StatCard key="todays-calls" title="Today's Calls" value="0" color="blue" />,
                    <StatCard key="todays-earnings" title="Today's Earnings" value="$0.00" color="green" />
                </div>
            );
            quickActions.push('driver');
        }

        if (statCards.length === 0) {
        
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
        } else {
            return (
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {statCards}
                    </div>
                    <QuickActions role={user.roles || quickActions[0]} />
                </div>
            );
        }
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
        <div className="bg-white shadow rounded-lg w-auto">
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
        if (!role) return [];
        console.log('getActions', role);
        if (Array.isArray(role)) {
            const roles = role.map(r => r.toLowerCase());
            const actions = [];
            roles.forEach(_r => {
                actions.push(...getRoleActions(_r))
            });
            console.log('Combined Actions:', actions);
            return actions;
        }
        return getRoleActions(role);
    };

    const getRoleActions = (_role) => {
        switch (_role) {
            case 'admin':
                return [
                    { title: 'Manage Users', description: 'Add, edit, or remove users', action: '/users-manage' },
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
    }

    const actions = getActions();    if (actions.length === 0) return null;

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {actions.map((action, index) => (
                        <Link
                            key={index}
                            to={action.action}
                            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
                            >
                            <h4 className="font-medium text-gray-900">{action.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
