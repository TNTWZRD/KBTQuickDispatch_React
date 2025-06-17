import './index.css'
import { CookiesProvider } from 'react-cookie'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.jsx'
import Authentication, { PageType } from './pages/Autentication.jsx'
import { AuthProvider } from './utilities/AuthContext.jsx'

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
