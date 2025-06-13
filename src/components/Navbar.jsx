import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { logoutApi } from "../apis/authentication";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [cookies, removeCookie] = useCookies(['jwt']);
    const navigate = useNavigate();
    const loggedIn = (cookies.jwt)? true : false;

    const handleLogout = async () => {
        let logout = await logoutApi(cookies.jwt);
        if (!logout[0]) {
            console.error('Logout failed:', logout[1]);
            return;
        }
        console.log('Logout successful');
        removeCookie('jwt');
        removeCookie('user_name');
        navigate('/');
    }

    return (
        <>
            <div className="mx-auto mt-8 max-w-7xl px-2 sm:px-6 lg:px-8 bg-blue-200 shadow-md">
                <div className="flex justify-between items-center align-middle h-16">
                
                    <div className="logo font-bold text-2xl">
                        <Link to="/" className="flex items-center">
                            <img src="/logo.svg" alt="Logo" className="h-10 w-10 inline-block mr-2" />
                            Quick Dispatch
                        </Link>
                    </div>

                    <div className="flex space-x-4 ms-auto me-4">
                        <p className="">{cookies.user_name}</p>
                    </div>

                    <div className="">
                        {loggedIn && <button onClick={handleLogout} className="logout bg-red-300 hover:bg-red-500 rounded px-2 py-1.5">Logout</button> }
                        {!loggedIn && <Link to="/login"><button className="logout bg-green-300 hover:bg-green-500 rounded px-2 py-1.5">Login</button> </Link> }
                        {!loggedIn && <Link to="/register"><button className="logout bg-yellow-300 hover:bg-yellow-500 rounded px-2 py-1.5">Register</button> </Link> }
                    </div>
                
                </div>
            </div>
        </>
    )

}

export default Navbar