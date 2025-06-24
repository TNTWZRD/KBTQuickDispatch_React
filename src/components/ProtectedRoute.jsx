import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utilities/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, user, loading } = useAuth();    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            <div className="text-lg font-medium text-gray-900">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If a specific role is required, check if user has that role
    if (requiredRole && user) {
        // This assumes the user object has a has_role method or role field
        // For now, we'll implement a simple role check
        const hasRole = (role) => {
            if (!user.role) return false;
            // Convert role to number if it's a string
            const userRole = typeof user.role === 'string' ? parseInt(user.role) : user.role;
            const roleValues = {
                user: 0,
                driver: 1,
                dispatcher: 2,
                manager: 4,
                owner: 8,
                admin: 16
            };
            
            const requiredRoleValue = roleValues[role] || role;
            return (userRole & requiredRoleValue) === requiredRoleValue;
        };

        if (!hasRole(requiredRole)) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
