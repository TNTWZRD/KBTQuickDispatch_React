
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './utilities/AuthContext';

function App() {
  const { isAuthenticated, user, loading } = useAuth();

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
          <div>
            <h1 className="text-3xl font-bold underline mb-4">
              Welcome back, {user?.name || user?.username}!
            </h1>
            <p className="text-lg text-gray-600">
              You are successfully logged in to QuickDispatch.
            </p>
            {/* Add your authenticated user content here */}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold underline mb-4">
              Welcome to QuickDispatch
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Please log in or register to get started.
            </p>
            {/* Add your public/landing page content here */}
          </div>
        )}
      </div>

      <Footer />

    </>
  )
}

export default App
