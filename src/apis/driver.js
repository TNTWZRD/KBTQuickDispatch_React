import { API_URL, DOMAIN } from "./config";
const DEBUG = true

export const getDrivers = async (auth_token) => {
    try {
        const response = await fetch(`${API_URL}/drivers/getDrivers`, { method: 'GET', headers: {'Authorization': auth_token }});
        if (response.ok) {
            const data = await response.json();
            return [data, false];
        }
        return [false, `Server Error: ${response.statusText}`];
    } catch (error) {
        console.error('Failed to fetch drivers:', error);
        return [false, `Server Error: ${error.message}`];
    }
}