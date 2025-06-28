import './index.css'
import { CookiesProvider } from 'react-cookie'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.jsx'
import Authentication, { PageType } from './pages/Autentication.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Users from './pages/Users.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './utilities/AuthContext.jsx'
import Admin from './pages/Admin.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'

 const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Authentication pageType={PageType.LOGIN} />,
  },
  {
    path: '/register',
    element: <Authentication pageType={PageType.REGISTER} />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users-manage',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Users />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Admin />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/shifts',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <h1 className="text-3xl font-bold text-gray-900">My Shifts</h1>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-calls',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <h1 className="text-3xl font-bold text-gray-900">My Calls</h1>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/call-board',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <h1 className="text-3xl font-bold text-gray-900">Call Board</h1>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/drivers',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <h1 className="text-3xl font-bold text-gray-900">Drivers</h1>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/reports',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <h1 className="text-3xl font-bold text-gray-900">reports</h1>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
          <UserProfile />
      </ProtectedRoute>
    ),
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{path: '/'}}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>,
)
