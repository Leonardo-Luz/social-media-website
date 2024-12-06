import { Outlet } from 'react-router-dom'
import { Nav } from './components/nav'
import { Footer } from './components/footer'
import { AuthProvider } from './context/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <Nav />

      <Outlet />

      <Footer />
    </AuthProvider>
  )
}

export default App
