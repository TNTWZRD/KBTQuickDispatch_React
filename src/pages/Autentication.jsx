import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { validateEmail, validatePassword, validateUsername, validatePhoneNumber } from '../utilities/validations';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PropTypes from 'prop-types';
import { useAuth } from '../utilities/AuthContext';

const DEBUG = true

const intialErrorsState = {
    login: '',
    username: '',
    email: '',
    name: '',
    phoneNumber: '',
    password: '',
    api: ''
};

const Authentication = ({pageType}) => {

    const navigate = useNavigate();
    const { isAuthenticated, login, register, loading } = useAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            DEBUG && console.log('User is already logged in, redirecting to home page');
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    
    const [errors, setErrors] = useState(intialErrorsState);
    
    const [loginField, setLoginField] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
      };
    
    const handleUsernameChange = (e) => { 
        setUsername(e.target.value)
     };
    
    const handleNameChange = (e) => { 
        setName(e.target.value)
     };
    
    const handlePhoneNumberChange = (e) => { 
        setPhoneNumber(e.target.value)
     };
    
    const handleLoginChange = (e) => { 
        setLoginField(e.target.value)
     };
    
    const handlePasswordChange = (e) => { 
        setPassword(e.target.value)
     };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {...intialErrorsState};
        if (pageType === PageType.REGISTER) {
            if (!validateUsername(username)) {
                newErrors.username = 'Username must be alphanumeric and can include underscores, 3-16 characters long';
                isValid = false;
            }
            if (!validateEmail(email)) {
                newErrors.email = 'Invalid email format';
                isValid = false;
            }
            if (name.trim() === '') {
                newErrors.name = 'Name cannot be empty';
                isValid = false;
            }
            if (!validatePhoneNumber(phoneNumber)) {
                newErrors.phoneNumber = 'Phone number must be in a valid format (e.g., (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890)';
                isValid = false;
            }
            if (!validatePassword(password)) {
                newErrors.password = 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character';
                isValid = false;
            }
        } else if (pageType === PageType.LOGIN) {
            if (!validateEmail(loginField) && !validateUsername(loginField)) {
                newErrors.login = 'Login must be a valid email or username';
                isValid = false;
            }
            if (!validatePassword(password)) {
                newErrors.password = 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character';
                isValid = false;
            }
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success, error = null
        
        if (!validateForm()) {
            console.log('Form is invalid, cannot submit');
            return;
        }

        try {
            if (pageType === PageType.LOGIN) {
                [success, error] = await login(loginField, password);
            } else if (pageType === PageType.REGISTER) {
                const userData = {user: {
                    username, 
                    email, 
                    name, 
                    phone_number: phoneNumber, 
                    password}
                };
                [success, error] = await register(userData);
            }
            
            if (error) {
                console.log(error);
                setErrors(prevErrors => ({...prevErrors, api: error}));
            }
            
            if (success) {
                DEBUG && console.log('Authentication successful');
                navigate('/'); // AuthContext will handle the redirect in useEffect
            }
        } catch (err) {
            console.error('Authentication error:', err);
            setErrors(prevErrors => ({...prevErrors, api: 'An unexpected error occurred'}));
        }
    }

  return (
    <>
    <Navbar />
    <div className="bg-dashboard-bg min-h-screen">
        <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-md mx-auto theme-card">
                <div className="theme-card-body">
                    
                    {errors.api && (
                        <div className='text-sm text-error-600 bg-error-50 border border-error-200 rounded-lg p-3 mb-4' name="apiError">
                            {errors.api}
                        </div>
                    )}
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {(pageType === PageType.LOGIN ) ? 'Login to your account' : 'Register for a new account'}
                    </h3>
                    <div className="mt-4 text-sm text-gray-600 mb-6">
                        { pageType === PageType.LOGIN && (
                            <p>Don't have an account? <Link to='/register' className='theme-primary hover:text-primary-700 font-medium'>Register</Link></p>
                        )}
                        { pageType === PageType.REGISTER && (
                            <p>Already have an account? <Link to='/login' className='theme-primary hover:text-primary-700 font-medium'>Login</Link></p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 theme-fade-in">
                    {(pageType === PageType.LOGIN) ? 
                        <div className="space-y-1">
                            <input 
                                name="login"
                                type='text'
                                placeholder="Username/Email"
                                className='theme-input'
                                onChange={handleLoginChange}
                                value={loginField}
                            />
                            {errors.login && <span className='text-sm theme-error' name="loginError">{errors.login}</span>}
                        </div>
                        :
                        <>
                            <div className="space-y-1">
                                <input
                                    name="username"
                                    type='text'
                                    placeholder="Username"
                                    className='theme-input'
                                    onChange={handleUsernameChange}
                                    value={username}
                                />
                                {errors.username && <span className='text-sm theme-error' name="usernameError">{errors.username}</span>}
                            </div>
                            <div className="space-y-1">
                                <input
                                    name="email"
                                    type='email'
                                    placeholder="Email"
                                    className='theme-input'
                                    onChange={handleEmailChange}
                                    value={email}
                                />
                                {errors.email && <span className='text-sm theme-error' name="emailError">{errors.email}</span>}
                            </div>
                            <div className="space-y-1">
                                <input
                                    name="name"
                                    type='text'
                                    placeholder="Name"
                                    className='theme-input'
                                    onChange={handleNameChange}
                                    value={name}
                                />
                                {errors.name && <span className='text-sm theme-error' name="nameError">{errors.name}</span>}
                            </div>
                            <div className="space-y-1">
                                <input
                                    name="phonenumber"
                                    type='phone'
                                    placeholder="(000) 555-5555"
                                    className='theme-input'
                                    onChange={handlePhoneNumberChange}
                                    value={phoneNumber}
                                />
                                {errors.phoneNumber && <span className='text-sm theme-error' name="phoneNumberError">{errors.phoneNumber}</span>}
                            </div>
                        </>
                        }
                        <div className="space-y-1">
                            <input
                                name="password"
                                type='password'
                                placeholder="Password"
                                className='theme-input'
                                onChange={handlePasswordChange}
                                value={password}
                            />
                            {errors.password && <span className='text-sm theme-error' name="passwordError">{errors.password}</span>}
                        </div>

                        <button 
                            type='submit'
                            disabled={loading}
                            className={`theme-btn w-full mt-6 ${loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'theme-btn-primary'}`}>
                            {loading 
                                ? 'Processing...' 
                                : (pageType === PageType.LOGIN) ? 'Login' : 'Register'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>
  );
}

// ENUM For Authentication Page Types
export const PageType = Object.freeze({
  LOGIN: 0,
  REGISTER: 1,
});

Authentication.propTypes = {
    pageType: PropTypes.oneOf(Object.values(PageType)).isRequired,
    };

export default Authentication;