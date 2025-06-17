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

export class UserAuth {
    constructor() {
        this.Register = this.Register.bind(this);
        this.Login = this.Login.bind(this);
        this.Logout = this.Logout.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.Delete = this.Delete.bind(this);
    }

    Register = async (body_object) => {
        try{
            const response = await fetch(`${DOMAIN}/signup`, {
                method: 'POST',
                body: JSON.stringify(body_object),
                headers: {
                    'Content-Type': 'application/json',
                }});
            if (response.ok) {
                const data = await response.json();
                let auth_token = response.headers.get('Authorization');
                return [{...data, auth: auth_token}, false];
            }
            if (response.status === 400) {
                const errorData = await response.json();
                return [false, `Validation error: ${JSON.stringify(errorData)}`];
            }
            if (response.status === 409) {
                return [false, 'User already exists. Please login instead.'];
            }
        } catch (error) {
            console.error('Registration failed:', error);
            return [false, `Server Error: ${error}`];
        }
    }

    Login = async (body_object) => {
        try {
            const resp = await fetch(`${DOMAIN}/login`, {
                method: 'POST',
                body: JSON.stringify(body_object),
                headers: {
                    'Content-Type': 'application/json',
                }});
            if (resp.ok) {
            const data = await resp.json();
            let auth_token = resp.headers.get('Authorization');
            return [{...data, auth: auth_token}, false];
            }
            console.log('Login failed:', resp);
            if (resp.status === 401) {
            return [false, 'Invalid credentials. Please try again.'];
            }
            if (resp.status === 404) {
            return [false, 'User not found. Please register first.'];
            }
            if (resp.status === 422) {
            const errorData = await resp.json();
            return [false, `Validation error: ${JSON.stringify(errorData)}`];
            }
        } catch (error) {
            console.error('Login failed:', error);
            return [false, `Server Error: ${error}`];
        }
    }

    Logout = async (jwt_token) => {
        try {
            const response = await fetch(`${DOMAIN}/logout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt_token
            }
            });
            if (response.ok) {
            return [true, false];
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
            return [false, `Server Error ${JSON.stringify(response)} ${response.status} ${response.statusText}`];
        } catch (error) {
            console.error('Logout failed:', error);
            return [false, `Server Error: ${error}`];
        }
    }

    checkLogin = async (jwt_token) => {
        if (!jwt_token || jwt_token === null || jwt_token === undefined || jwt_token === '') {
            return [false, 'You are not logged in.'];
        }
        try {
            const response = await fetch(`${DOMAIN}/current_user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt_token
            }
            });
            if (response.ok) {
            const data = await response.json();
            console.log('Check login successful:', data);
            return [data, false];
            }
            console.log('Check login failed:', response);
            if (response.status === 401) {
            return [false, 'You are not logged in.'];
            }
            if (response.status === 404) {
            return [false, 'User not found.'];
            }
        } catch (error) {
            console.error('Check login failed:', error);
            return [false, `Server Error: ${error}`];
        }
    }

    Delete = async (jwt_token) => {
        try {
            const response = await fetch(`${DOMAIN}/signup`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt_token
            }
            });
            if (response.ok) {
            return [true, false];
            }
            console.log('Delete account failed:', response);
            if (response.status === 401) {
            return [false, 'You are not logged in.'];
            }
            if (response.status === 404) {
            return [false, 'User not found.'];
            }
        } catch (error) {
            console.error('Delete account failed:', error);
            return [false, `Server Error: ${error}`];
        }
    }

}