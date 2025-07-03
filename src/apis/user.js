import { API_URL } from "./config";

export const updateUser = async (jwt, userId, userData) => {
    try {
        const response = await fetch(`${API_URL}/users/update_user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify({ user: userData })
        });
        if (response.ok) {
            const data = await response.json();
            return [data, false];
        }
        return [false, `Server Error: ${response.statusText}`];
    } catch (error) {
        console.error('Failed to update user:', error);
        return [false, `Server Error: ${error.message}`];
    }
};

export const deleteUser = async (jwt, userId) => {
    try {
        const response = await fetch(`${API_URL}/users/delete_user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': jwt
            }
        });
        if (response.ok) {
            const data = await response.json();
            return [data, false];
        }
        return [false, `Server Error: ${response.statusText}`];
    } catch (error) {
        console.error('Failed to delete user:', error);
        return [false, `Server Error: ${error.message}`];
    }
};