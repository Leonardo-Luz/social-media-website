import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import App from './App.tsx'
import {
  Error,
  Home,
  Login,
  Register,
  Protected,
  Health,
  Profile,
  ProfileUpdate
} from './routes'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Health> <App /> </Health>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Protected> <Home /> </Protected>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/profile/update',
        element: <ProfileUpdate />
      },
      {
        path: '/profile/(id)?/:id?',
        element: <Profile />
      },
    ]
  }
])

createRoot(document.getElementById('root')!)
  .render(<RouterProvider router={router} />)
