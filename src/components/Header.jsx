import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, hasAccess } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef(null)

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowUserMenu(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

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

          {user ? (
            <div className="user-menu-container" ref={menuRef}>
              <button 
                className="user-menu-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="user-info">
                  <span className="user-name">{user.name || user.email}</span>
                  <span className="user-role">
                    {user.roles?.[0] 
                      ? user.roles[0].charAt(0).toUpperCase() + user.roles[0].slice(1)
                      : 'No access level'
                    }
                  </span>
                </span>
                <span className="user-menu-arrow">{showUserMenu ? '▲' : '▼'}</span>
              </button>
              {showUserMenu && (
                <div className="user-menu-dropdown">
                  <Link 
                    to="/dashboard" 
                    className="user-menu-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <span className="menu-icon">📊</span>
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="user-menu-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <span className="menu-icon">👤</span>
                    Profile
                  </Link>
                  <div className="user-menu-divider"></div>
                  <div className="user-menu-section-title">Access Portals</div>
                  {hasAccess('contractor') && (
                    <Link 
                      to="/contractor" 
                      className="user-menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="menu-icon">🔧</span>
                      Contractor Portal
                    </Link>
                  )}
                  {hasAccess('healthcare') && (
                    <Link 
                      to="/healthcare" 
                      className="user-menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="menu-icon">🏥</span>
                      Healthcare Portal
                    </Link>
                  )}
                  {hasAccess('volunteer') && (
                    <Link 
                      to="/volunteer" 
                      className="user-menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="menu-icon">🤝</span>
                      Volunteer Portal
                    </Link>
                  )}
                  {(hasAccess('administrator') || hasAccess('developer')) && (
                    <Link 
                      to="/admin" 
                      className="user-menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="menu-icon">⚙️</span>
                      Admin Panel
                    </Link>
                  )}
                  {hasAccess('developer') && (
                    <Link 
                      to="/developer" 
                      className="user-menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="menu-icon">💻</span>
                      Developer Tools
                    </Link>
                  )}
                  <div className="user-menu-divider"></div>
                  <button 
                    className="user-menu-item user-menu-logout"
                    onClick={handleLogout}
                  >
                    <span className="menu-icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login"
              className="btn btn-primary login-btn"
            >
              Login
            </Link>
          )}

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

