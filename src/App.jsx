
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './utilities/AuthContext';
import { Link } from 'react-router-dom';

function App() {
  const { isAuthenticated, user, loading, userStatus } = useAuth();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-2xl font-semibold">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <> 

      <Navbar />

      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        {isAuthenticated ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold underline mb-4">
              Welcome back, {user?.name || user?.username}!, {userStatus === 'online' ? 'You are online' : 'You are offline'}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              You are successfully logged in to QuickDispatch.
            </p>
            <div className="space-x-4">
              <Link 
                to="/dashboard" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Go to Dashboard
              </Link>
              <Link 
                to="/profile" 
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold underline mb-4">
              Welcome to QuickDispatch
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Please log in or register to get started.
            </p>
            <div className="space-x-4">
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />

    </>
  )
}

export default App
