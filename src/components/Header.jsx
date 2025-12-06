import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from './LoginModal'
import './Header.css'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowUserMenu(false)
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

          {user ? (
            <div className="user-menu-container">
              <button 
                className="user-menu-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="user-avatar">
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} />
                  ) : (
                    <span>{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </span>
                <span className="user-name">{user.name || user.email}</span>
                <span className="user-menu-arrow">▼</span>
              </button>
              {showUserMenu && (
                <div className="user-menu-dropdown">
                  <div className="user-menu-header">
                    <p className="user-menu-email">{user.email}</p>
                    <p className="user-menu-roles">
                      {user.roles?.length > 0 
                        ? `Roles: ${user.roles.join(', ')}`
                        : 'No roles assigned'
                      }
                    </p>
                  </div>
                  <Link 
                    to="/dashboard" 
                    className="user-menu-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Dashboard
                  </Link>
                  {user.roles?.includes('admin') && (
                    <Link 
                      to="/admin" 
                      className="user-menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    className="user-menu-item user-menu-logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="btn btn-primary login-btn" 
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </button>
          )}

          <button className="mobile-menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </header>
  )
}

export default Header

