import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utilities/AuthContext";

const Navbar = () => {

    const navigate = useNavigate();
    const { isAuthenticated, user, logout, _deleteAccount } = useAuth();
    
    const handleLogout = async () => {
        try {
            await logout();
            console.log('Logout successful');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }


    return (
        <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-blue-200 shadow-md">
                <div className="flex justify-between items-center align-middle h-16">
                
                    <div className="logo font-bold text-2xl">
                        <Link to="/" className="flex items-center">
                            <img src="/logo.svg" alt="Logo" className="h-10 w-auto inline-block mr-2" />
                            Quick Dispatch
                        </Link>
                    </div>

                    <div className="flex space-x-4 ms-auto invisible lg:visible">
                        {isAuthenticated && <p className="px-2 py-1.5">{user?.name || user?.username || ''}</p>}
                    </div>

                    <div className="flex gap-2">

                        {/* Authenticated User */}
                        <span>
                            {isAuthenticated && <Link to="/dashboard"><button className="dashboard bg-green-300 hover:bg-green-500 rounded px-2 py-1.5">Dashboard</button></Link>}
                        </span>
                        <span>
                            {isAuthenticated && <button onClick={handleLogout} className="logout bg-yellow-300 hover:bg-yellow-500 rounded px-2 py-1.5">Logout</button> }
                        </span>

                        {/* Not Authenticated */}
                        <span>
                            {!isAuthenticated && <Link to="/login"><button className="login bg-green-300 hover:bg-green-500 rounded px-2 py-1.5">Login</button> </Link> }
                        </span>
                        <span>
                            {!isAuthenticated && <Link to="/register"><button className="register bg-yellow-300 hover:bg-yellow-500 rounded px-2 py-1.5">Register</button> </Link> }
                        </span>
                    </div>
                
                </div>
            </div>
        </>
    )

}

export default Navbar