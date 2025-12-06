import { useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginModal.css'

function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>Login</h2>
        <p className="login-modal-subtitle">Select your login type:</p>
        
        <div className="login-options">
          <Link to="/login/contractor" className="login-option" onClick={onClose}>
            <div className="login-option-icon">🔧</div>
            <div className="login-option-content">
              <h3>Contractor Login</h3>
              <p>For contractors and tradespeople working with Safe Steps Aotearoa</p>
            </div>
          </Link>
          
          <Link to="/login/healthcare" className="login-option" onClick={onClose}>
            <div className="login-option-icon">🏥</div>
            <div className="login-option-content">
              <h3>Healthcare Login</h3>
              <p>For healthcare professionals and community workers making referrals</p>
            </div>
          </Link>
          
          <Link to="/login/staff" className="login-option" onClick={onClose}>
            <div className="login-option-icon">👥</div>
            <div className="login-option-content">
              <h3>Staff Login</h3>
              <p>For Safe Steps Aotearoa staff and administrators</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginModal

