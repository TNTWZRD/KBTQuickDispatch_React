import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utilities/AuthContext";
import { useTheme } from "../utilities/theme";

const Navbar = () => {

    const navigate = useNavigate();
    const { isAuthenticated, user, logout, deleteAccount } = useAuth();
    const { theme, toggleTheme, isDark } = useTheme();
    
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
            <div className="mx-auto mt-8 max-w-7xl px-2 sm:px-6 lg:px-8 bg-primary-100 shadow-lg theme-card">
                <div className="flex justify-between items-center align-middle h-16">
                
                    <div className="logo font-bold text-2xl text-primary-700">
                        <Link to="/" className="flex items-center hover:text-primary-800 transition-colors">
                            <img src="/logo.svg" alt="Logo" className="h-10 w-10 inline-block mr-2" />
                            Quick Dispatch
                        </Link>
                    </div>

                    <div className="flex space-x-4 ms-auto me-4 items-center">
                        {isAuthenticated && (
                            <p className="text-gray-700 font-medium">{user?.name || user?.username || ''}</p>
                        )}
                        {isAuthenticated && (
                            <div className="flex space-x-4">
                                <Link to="/dashboard" className="theme-primary hover:text-primary-800 font-medium transition-colors">
                                    Dashboard
                                </Link>
                                <Link to="/profile" className="theme-primary hover:text-primary-800 font-medium transition-colors">
                                    Profile
                                </Link>
                            </div>
                        )}
                        
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="theme-btn theme-btn-ghost p-2 rounded-md"
                            title="Toggle theme"
                        >
                            {isDark() ? '☀️' : '🌙'}
                        </button>
                    </div>

                    <div className="flex space-x-2">
                        {isAuthenticated && (
                            <>
                                <button onClick={handleLogout} className="theme-btn theme-warning-bg hover:bg-warning-600 transition-colors">
                                    Logout
                                </button>
                                <button onClick={handleDeleteAccount} className="theme-btn theme-error-bg hover:bg-error-600 transition-colors">
                                    Delete Account
                                </button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <Link to="/login">
                                    <button className="theme-btn theme-success-bg hover:bg-success-600 transition-colors">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className="theme-btn theme-warning-bg hover:bg-warning-600 transition-colors">
                                        Register
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                
                </div>
            </div>
        </>
    )

}

export default Navbar