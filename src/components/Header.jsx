import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="Safe Steps Aotearoa Logo" className="logo" />
            <div className="logo-text">
              <h1 className="logo-title">Safe Steps Aotearoa</h1>
              <p className="logo-tagline">Small steps. Big difference.</p>
            </div>
          </Link>
          
          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
            <Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link>
            <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works')}`}>How It Works</Link>
            <Link to="/get-involved" className={`nav-link ${isActive('/get-involved')}`}>Get Involved</Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          </nav>

          <button className="mobile-menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

