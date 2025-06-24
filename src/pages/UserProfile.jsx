import React, { useState, useEffect } from 'react';
import { useAuth } from '../utilities/AuthContext';
import { userProfileAPI } from '../apis/userProfile';
import DashboardLayout from '../components/DashboardLayout';

// Profile form component - moved outside to prevent re-creation
const ProfileForm = ({ profileData, setProfileData, handleProfileSubmit, loading }) => (
    <form onSubmit={handleProfileSubmit} className="space-y-6">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
            </label>
            <input
                type="text"
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
            />
        </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
            </label>
            <input
                type="email"
                id="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
            />
        </div>

        <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
            </label>
            <input
                type="text"
                id="username"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
            />
        </div>

        <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number
            </label>
            <input
                type="tel"
                id="phone_number"
                value={profileData.phone_number}
                onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
        </div>        <div>
            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? 'Updating...' : 'Update Profile'}
            </button>
        </div>
    </form>
);

// Preferences form component - moved outside to prevent re-creation
const PreferencesForm = ({ preferences, setPreferences, handlePreferencesSubmit, loading }) => (
    <form onSubmit={handlePreferencesSubmit} className="space-y-6">
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="darkmode"                    checked={preferences.darkmode}
                    onChange={(e) => setPreferences({ ...preferences, darkmode: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="darkmode" className="ml-2 block text-sm text-gray-900">
                    Enable Dark Mode
                </label>
            </div>
            <p className="mt-2 text-sm text-gray-500">
                Toggle between light and dark themes for better viewing experience
            </p>
        </div>        <div>
            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? 'Updating...' : 'Update Preferences'}
            </button>
        </div>
    </form>
);

// Password form component - moved outside to prevent re-creation
const PasswordForm = ({ passwordData, setPasswordData, handlePasswordSubmit, loading }) => (
    <form onSubmit={handlePasswordSubmit} className="space-y-6">        <div>
            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                Current Password
            </label>
            <input
                type="password"
                id="current_password"
                value={passwordData.current_password}
                onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
            />
        </div>

        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
            </label>
            <input
                type="password"
                id="password"
                value={passwordData.password}
                onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                minLength="6"
            />
        </div>

        <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                Confirm New Password
            </label>
            <input
                type="password"
                id="password_confirmation"
                value={passwordData.password_confirmation}
                onChange={(e) => setPasswordData({ ...passwordData, password_confirmation: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                minLength="6"
            />
        </div>        <div>
            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? 'Changing...' : 'Change Password'}
            </button>
        </div>
    </form>
);

const UserProfile = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Profile form data
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        username: '',
        phone_number: ''
    });

    // Preferences form data
    const [preferences, setPreferences] = useState({
        darkmode: false
    });

    // Password form data
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    // Initialize form data when user data is available
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
                username: user.username || '',
                phone_number: user.phone_number || ''
            });
            setPreferences({
                darkmode: user.darkmode || false
            });
        }
    }, [user]);

    // Show message helper
    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    // Handle profile form submission
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const [result, error] = await userProfileAPI.updateProfile(profileData);
        
        if (error) {
            showMessage('error', error);
        } else {
            showMessage('success', 'Profile updated successfully!');
            updateUser(result.user);
        }
        
        setLoading(false);
    };

    // Handle preferences form submission
    const handlePreferencesSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const [result, error] = await userProfileAPI.updatePreferences(preferences);
        
        if (error) {
            showMessage('error', error);
        } else {
            showMessage('success', 'Preferences updated successfully!');
            updateUser(result.user);
        }
        
        setLoading(false);
    };

    // Handle password form submission
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        
        if (passwordData.password !== passwordData.password_confirmation) {
            showMessage('error', 'New passwords do not match');
            return;
        }

        setLoading(true);

        const [, error] = await userProfileAPI.changePassword(passwordData);
        
        if (error) {
            showMessage('error', error);
        } else {
            showMessage('success', 'Password changed successfully!');
            setPasswordData({
                current_password: '',
                password: '',
                password_confirmation: ''
            });
        }
        
        setLoading(false);
    };

    // Tab navigation component
    const TabNavigation = () => (
        <div className="border-b border-dashboard-border mb-8">            <nav className="-mb-px flex space-x-8">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        activeTab === 'profile'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Profile Details
                </button>
                <button
                    onClick={() => setActiveTab('preferences')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        activeTab === 'preferences'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Preferences
                </button>
                <button
                    onClick={() => setActiveTab('password')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        activeTab === 'password'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Change Password
                </button>
            </nav>
        </div>
    );

    return (        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">User Settings</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage your profile information, preferences, and security settings.
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6 space-y-6">
                            {/* Message display */}                            {message.text && (
                                <div className={`rounded-md p-4 ${
                                    message.type === 'success' 
                                        ? 'bg-green-50 text-green-700 border border-green-200' 
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                    {message.text}
                                </div>
                            )}

                            <TabNavigation />

                            {activeTab === 'profile' && (
                                <ProfileForm 
                                    profileData={profileData}
                                    setProfileData={setProfileData}
                                    handleProfileSubmit={handleProfileSubmit}
                                    loading={loading}
                                />
                            )}
                            {activeTab === 'preferences' && (
                                <PreferencesForm 
                                    preferences={preferences}
                                    setPreferences={setPreferences}
                                    handlePreferencesSubmit={handlePreferencesSubmit}
                                    loading={loading}
                                />
                            )}
                            {activeTab === 'password' && (
                                <PasswordForm 
                                    passwordData={passwordData}
                                    setPasswordData={setPasswordData}
                                    handlePasswordSubmit={handlePasswordSubmit}
                                    loading={loading}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </DashboardLayout>
    );
};

export default UserProfile;
