import {API_URL} from '../apis/config.js';

export const getVehicles = async (auth_token) => {
  try {
    const response = await fetch(`${API_URL}/vehicles/getVehicles`, {
                method: 'GET',
                headers: { 'Authorization': auth_token }
            });
    if (response.ok){
      const data = await response.json();
      // Ensure the response is an array
      if (!Array.isArray(data)) {
        console.error('Invalid response format for vehicles:', data);
        throw new Error('Invalid response format');
      }
      return [data, false];
    }
    return [false, `Server Error: ${response.statusText}`];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [false, `Server Error: ${error.message}`];
  }
}

export const addVehicle = async (auth_token, vehicleData) => {
  try {
    const response = await fetch(`${API_URL}/vehicles/create_vehicle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth_token
      },
      body: JSON.stringify({vehicle: vehicleData})
    });
    if (response.ok) {
      const data = await response.json();
      return [data, false];
    }
    return [false, `Server Error: ${response.statusText}`];
  } catch (error) {
    console.error('Error adding vehicle:', error);
    return [false, `Server Error: ${error.message}`];
  }
}

export const updateVehicle = async (auth_token, vehicleId, vehicleData) => {
  try {
    const response = await fetch(`${API_URL}/vehicles/update_vehicle/${vehicleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth_token
      },
      body: JSON.stringify({vehicle: vehicleData})
    });
    if (response.ok){
      const data = await response.json();
      return [data, false];
    }
    return [false, `Server Error: ${response.statusText}`];
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return [false, `Server Error: ${error.message}`];
  }
}

export const deleteVehicle = async (auth_token, vehicleId) => {
  try {
    const response = await fetch(`${API_URL}/vehicles/delete_vehicle/${vehicleId}`, {
      method: 'DELETE',
      headers: { 'Authorization': auth_token }
    });
    if (response.ok) {
      const data = await response.json();
      return [data, false];
    }
    return [false, `Server Error: ${response.statusText}`];
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return [false, `Server Error: ${error.message}`];
  }
}