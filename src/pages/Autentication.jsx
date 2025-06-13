import { Link } from 'react-router-dom';
import { registerApi, loginApi } from '../apis/authentication';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { validateEmail, validatePassword, validateUsername, validatePhoneNumber } from '../utilities/validations';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PropTypes from 'prop-types';

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
    const [cookies, setCookie] = useCookies([]);
    
    useEffect(() => {
    if (cookies.jwt) {
        DEBUG && console.log('User is already logged in, redirecting to home page');
            navigate('/'); // Redirect to home page if user is already logged in
            return null; // Prevent rendering the authentication page
        }
    }, [cookies.jwt, navigate]);

    
    const [errors, setErrors] = useState(intialErrorsState);
    
    const [login, setLogin] = useState('');
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
        setLogin(e.target.value)
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
            if (!validateEmail(login) && !validateUsername(login)) {
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
        let error, success = null
        if (!validateForm()) {
            console.log('Form is invalid, cannot submit');
            return;
        }

        if (pageType === PageType.LOGIN) {
            [success, error] = await loginApi({
                user: {
                    login, 
                    password
                }});
        }
        if (pageType === PageType.REGISTER) {
            [success, error] = await registerApi({
                user: {
                    username, 
                    email, 
                    name, 
                    phone_number: phoneNumber, 
                    password
                }});
        }
        if (error) {
            console.log(error);
            setErrors(prevErrors => ({...prevErrors, api: error}));
        }
        if (success) {
            const message = success.message || 'Operation successful';
            const user = success.data.user || {};
            const roles = success.data.roles || [];
            const authToken = success.auth || '';
            DEBUG && console.log(`Success: ${message},\n User: ${JSON.stringify(user)},\n Roles: ${roles},\n Auth Token: ${authToken}`);
            setCookie('jwt', authToken);
            setCookie('user_name', user.name || user.username || '');
            navigate('/'); // Redirect to home page after successful login/registration
        }
    }

  return (
    <>
    <Navbar />
    <div className="bg-white">
        <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
            
            {errors.api && <p className='text-sm text-red-600 border border-red rounded p-2' name="apiError">{errors.api}</p>}
            
            <h3 className="text-2xl font-bold">
                {(pageType === PageType.LOGIN ) ? 'Login to your account' : 'Register for a new account'}
            </h3>
            <span className="mt-4 text-sm text-gray-600">
                { pageType === PageType.LOGIN && <p>Dont have an account? <Link to='/register' className='text-black-600 underline'>Register </Link> </p>}
                { pageType === PageType.REGISTER && <p>Already Have an Account? <Link to='/login' className='text-black-600 underline'>Login</Link> </p>}
            </span>


            <form onSubmit={handleSubmit} className="mt-10 max-w-96 flex flex-col gap-8">
            {(pageType === PageType.LOGIN) ? 
                <div className="flex flex-col">
                    <input 
                        name="login"
                        type='text'
                        placeholder="Username/Email"
                        className='py-2 border border-grey-500 rounded px-3'
                        onChange={handleLoginChange}
                        value={login} // Ensure controlled input
                    />
                    {errors.login && <label className='text-sm text-red-600' name="loginError">{errors.login}</label>}
                </div>
                :
                <>
                    <div className="flex flex-col">
                        <input
                            name="username"
                            type='text'
                            placeholder="Username"
                            className='py-2 border border-grey-500 rounded px-3'
                            onChange={handleUsernameChange}
                            value={username} // Ensure controlled input
                        />
                        {errors.username && <label className='text-sm text-red-600' name="usernameError">{errors.username}</label>}
                    </div>
                    <div className="flex flex-col">
                        <input
                            name="email"
                            type='email'
                            placeholder="Email"
                            className='py-2 border border-grey-500 rounded px-3'
                            onChange={handleEmailChange}
                            value={email} // Ensure controlled input
                        />
                        <label className='text-sm text-red-600' name="emailError">{errors.email}</label>
                    </div>
                    <div className="flex flex-col">
                        <input
                            name="name"
                            type='text'
                            placeholder="Name"
                            className='py-2 border border-grey-500 rounded px-3'
                            onChange={handleNameChange}
                            value={name} // Ensure controlled input
                        />
                        <label className='text-sm text-red-600' name="nameError">{errors.name}</label>
                    </div>
                    <div className="flex flex-col">
                        <input
                            name="phonenumber"
                            type='phone'
                            placeholder="(000) 555-5555"
                            className='py-2 border border-grey-500 rounded px-3'
                            onChange={handlePhoneNumberChange}
                            value={phoneNumber} // Ensure controlled input
                        />
                        <label className='text-sm text-red-600' name="phoneNumberError">{errors.phoneNumber}</label>
                    </div>
                </>
                }
                <div className="flex flex-col">
                    <input
                        name="password"
                        type='password'
                        placeholder="urPa$$w0rd"
                        className='py-2 border border-grey-500 rounded px-3'
                        onChange={handlePasswordChange}
                        value={password} // Ensure controlled input
                    />
                    <label className='text-sm text-red-600' name="passwordError">{errors.password}</label>
                </div>

                <button 
                    type='submit'
                    className='bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700'>
                    {(pageType === PageType.LOGIN) ? 'Login' : 'Register'}
                </button>

            </form>
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