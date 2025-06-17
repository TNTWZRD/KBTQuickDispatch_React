import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utilities/AuthContext";

const Navbar = () => {

    const navigate = useNavigate();
    const { isAuthenticated, user, logout, deleteAccount } = useAuth();
    
    const handleLogout = async () => {
        try {
            await logout();
            console.log('Logout successful');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    const handleDeleteAccount = async () => {
        try {
            const [success, error] = await deleteAccount();
            if (success) {
                console.log('Account deleted successfully');
                navigate('/');
            } else {
                console.error('Delete account failed:', error);
            }
        } catch (error) {
            console.error('Delete account failed:', error);
        }
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
                        <p className="">{user?.name || user?.username || ''}</p>
                    </div>

                    <div className="">
                        {isAuthenticated && <button onClick={handleLogout} className="logout bg-yellow-300 me-2 hover:bg-yellow-500 rounded px-2 py-1.5">Logout</button> }
                        {isAuthenticated && <button onClick={handleDeleteAccount} className="delete bg-red-300 hover:bg-red-500 rounded px-2 py-1.5">Delete Account</button> }
                        {!isAuthenticated && <Link to="/login"><button className="login bg-green-300 hover:bg-green-500 rounded px-2 py-1.5">Login</button> </Link> }
                        {!isAuthenticated && <Link to="/register"><button className="register bg-yellow-300 hover:bg-yellow-500 rounded px-2 py-1.5">Register</button> </Link> }
                    </div>
                
                </div>
            </div>
        </>
    )

}

export default Navbar