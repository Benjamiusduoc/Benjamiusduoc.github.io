import { Outlet } from 'react-router'
import Navbar from './Navbar.jsx'
import Footer from '../core/footer.jsx'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
