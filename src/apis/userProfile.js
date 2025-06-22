import { API_URL, DOMAIN } from "./config";
import { getCookie } from "../utilities/cookieUtils";

const DEBUG = true;

export class UserProfileAPI {
    constructor() {
        this.updateProfile = this.updateProfile.bind(this);
        this.updatePreferences = this.updatePreferences.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    // Get authenticated request headers
    getAuthHeaders() {
        const token = getCookie('jwt_token');
        DEBUG && console.log('Retrieved token:', token); // Debug log
        
        // Decode the token if it's URL encoded
        const decodedToken = token ? decodeURIComponent(token) : '';
        DEBUG && console.log('Decoded token:', decodedToken); // Debug log
        
        return {
            'Content-Type': 'application/json',
            'Authorization': decodedToken || ''
        };
    }

    // Get current user profile details
    getUserProfile = async () => {
        try {
            const response = await fetch(`${DOMAIN}/current_user`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            if (response.ok) {
                const data = await response.json();
                DEBUG && console.log('User profile fetched successfully');
                return [data, null];
            }

            if (response.status === 401) {
                return [null, 'Unauthorized. Please login again.'];
            }

            return [null, 'Failed to fetch user profile'];
        } catch (error) {
            console.error('Get user profile failed:', error);
            return [null, `Network error: ${error.message}`];
        }
    }

    // Update user profile information
    updateProfile = async (profileData) => {
        try {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: 'PUT',
                body: JSON.stringify({
                    user: profileData
                }),
                headers: this.getAuthHeaders()
            });

            if (response.ok) {
                const data = await response.json();
                DEBUG && console.log('Profile updated successfully');
                return [data, null];
            }

            if (response.status === 400) {
                const errorData = await response.json();
                return [null, `Validation error: ${JSON.stringify(errorData)}`];
            }

            if (response.status === 401) {
                return [null, 'Unauthorized. Please login again.'];
            }

            return [null, 'Failed to update profile'];
        } catch (error) {
            console.error('Update profile failed:', error);
            return [null, `Network error: ${error.message}`];
        }
    }

    // Update user preferences (like dark mode)
    updatePreferences = async (preferences) => {
        try {
            const response = await fetch(`${API_URL}/users/preferences`, {
                method: 'PUT',
                body: JSON.stringify({
                    user: preferences
                }),
                headers: this.getAuthHeaders()
            });

            if (response.ok) {
                const data = await response.json();
                DEBUG && console.log('Preferences updated successfully');
                return [data, null];
            }

            if (response.status === 400) {
                const errorData = await response.json();
                return [null, `Validation error: ${JSON.stringify(errorData)}`];
            }

            if (response.status === 401) {
                return [null, 'Unauthorized. Please login again.'];
            }

            return [null, 'Failed to update preferences'];
        } catch (error) {
            console.error('Update preferences failed:', error);
            return [null, `Network error: ${error.message}`];
        }
    }

    // Change user password
    changePassword = async (passwordData) => {
        try {
            const response = await fetch(`${API_URL}/users/change_password`, {
                method: 'PUT',
                body: JSON.stringify({
                    user: passwordData
                }),
                headers: this.getAuthHeaders()
            });

            if (response.ok) {
                const data = await response.json();
                DEBUG && console.log('Password changed successfully');
                return [data, null];
            }

            if (response.status === 400) {
                const errorData = await response.json();
                return [null, `Validation error: ${JSON.stringify(errorData)}`];
            }

            if (response.status === 401) {
                return [null, 'Unauthorized. Please login again.'];
            }

            if (response.status === 422) {
                return [null, 'Current password is incorrect'];
            }

            return [null, 'Failed to change password'];
        } catch (error) {
            console.error('Change password failed:', error);
            return [null, `Network error: ${error.message}`];
        }
    }
}

export const userProfileAPI = new UserProfileAPI();
