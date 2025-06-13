import { API_URL, DOMAIN } from "./config";
const DEBUG = true

export const backendOnline = async () => {
    
    try {
        const response = await fetch(`${API_URL}/status`, { method: 'GET' });
        if (response.ok) {
            DEBUG && console.log('Backend is online');
            return ['Online', ''];
        }
        return ['', `Server Error`];
    }
    catch (error) {
        return ['', `Server down: ${error}`];
    }
}
DEBUG && backendOnline() // check if backend is online

export const registerApi = async (body_object) => {
    try {
        const response = await fetch(`${DOMAIN}/users`, {
            method: 'POST',
            body: JSON.stringify(body_object),
            headers: {
                'Content-Type': 'application/json',
            }});
        if (response.ok) {
            const data = await response.json();
            let auth_token = response.headers.get('Authorization');
            return [{...data, auth: auth_token}, ''];
        }
        console.log('Registration failed:', response);
        if (response.status === 422) {
            const errorData = await response.json();
            let mssg = `Validation error: `;
            Object.keys(errorData.errors).forEach((error) => {
                mssg += `${error} - ${errorData.errors[error]}, `;
            }
            );

            return ['', mssg];
        }
        if (response.status === 409) {
            return ['', 'User already exists. Please try a different username or email.'];
        }
        return ['', `Server Error ${response} ${response.status} ${response.statusText}`];
    }
    catch (error) {
        return ['', `Server down: ${error}`];
    }
}

export const loginApi = async (body_object) => {
    try {
        const response = await fetch(`${DOMAIN}/users/sign_in`, {
            method: 'POST',
            body: JSON.stringify(body_object),
            headers: {
                'Content-Type': 'application/json',
            }});
        if (response.ok) {
            const data = await response.json();
            let auth_token = response.headers.get('Authorization');
            return [{...data, auth: auth_token}, ''];
        }
        console.log('Login failed:', response);
        if (response.status === 401) {
            return ['', 'Invalid credentials. Please try again.'];
        }
        if (response.status === 404) {
            return ['', 'User not found. Please register first.'];
        }
        if (response.status === 500) {
            return ['', 'Server error. Please try again later.'];
        }
        if (response.status === 422) {
            const errorData = await response.json();
            return ['', `Validation error: ${JSON.stringify(errorData)}`];
        }
        return ['', `Server Error ${JSON.stringify(response)} ${response.status} ${response.statusText}`];
    }
    catch (error) {
        return ['', `Server down: ${error}`];
    }
}

export const logoutApi = async (jwt_token) => {
    try {
        const response = await fetch(`${DOMAIN}/users/sign_out`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt_token
            }});
        if (response.ok) {
            return [true, ''];
        }
        console.log('Logout failed:', response);
        if (response.status === 401) {
            return [false, 'You are not logged in.'];
        }
        if (response.status === 404) {
            return [false, 'User not found.'];
        }
        if (response.status === 500) {
            return [false, 'Server error. Please try again later.'];
        }
        return ['', `Server Error ${JSON.stringify(response)} ${response.status} ${response.statusText}`];
    }
    catch (error) {
        return ['', `Server down: ${error}`];
    }
}