import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { 
  Error, 
  Home, 
  Login, 
  Register 
} from './routes'
import { Protected } from './routes/Protected.route.tsx'
import { Health } from './routes/Health.route.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Health> <App/> </Health>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Protected> <Home/> </Protected>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
])

createRoot(document.getElementById('root')!)
  .render(<RouterProvider router={router} />)