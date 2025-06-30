import { API_URL } from "./config";


export const getUsers = async (auth_token) => {
    try {
        const response = await fetch(`${API_URL}/users/getUsers`, {
            method: 'GET',
            headers: { 'Authorization': auth_token }
        });
        if (response.ok) {
            const data = await response.json();
            return [data, false];
        }
        return [false, `Server Error: ${response.statusText}`];
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [false, `Server Error: ${error.message}`];
    }
}