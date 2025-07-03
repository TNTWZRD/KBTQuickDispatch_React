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

export const createDriver = async (auth_token, driverData) => {
    try {
        const response = await fetch(`${API_URL}/drivers/create_driver`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth_token
            },
            body: JSON.stringify({ driver: driverData })
        });
        if (response.ok) {
            const data = await response.json();
            return [data, false];
        }
        return [false, `Server Error: ${response.statusText}`];
    } catch (error) {
        console.error('Failed to create driver:', error);
        return [false, `Server Error: ${error.message}`];
    }
}

export const updateDriver = async (auth_token, driverId, driverData) => {
    try {
        const response = await fetch(`${API_URL}/drivers/update_driver/${driverId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth_token
            },
            body: JSON.stringify({ driver: driverData })
        });
        if (response.ok) {
            const data = await response.json();
            return [data, false];
        }
        return [false, `Server Error: ${response.statusText}`];
    } catch (error) {
        console.error('Failed to update driver:', error);
        return [false, `Server Error: ${error.message}`];
    }
}

export const deleteDriver = async (auth_token, driverId) => {
    try {
        const response = await fetch(`${API_URL}/drivers/delete_driver/${driverId}`, {
            method: 'DELETE',
            headers: { 'Authorization': auth_token }
        });
        if (response.ok) {
            const data = await response.json();
            return [data, false];
        }
        return [false, `Server Error: ${response.statusText}`];
    } catch (error) {
        console.error('Failed to delete driver:', error);
        return [false, `Server Error: ${error.message}`];
    }
}