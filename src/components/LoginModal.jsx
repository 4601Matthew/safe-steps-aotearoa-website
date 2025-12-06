import { useNavigate } from 'react-router-dom'
import './LoginModal.css'

function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleLoginClick = () => {
    navigate('/login')
    onClose()
  }

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>Login to Safe Steps Aotearoa</h2>
        <p className="login-modal-subtitle">Access your account to manage referrals, view assignments, and more.</p>
        
        <button 
          className="btn btn-primary btn-large login-modal-button"
          onClick={handleLoginClick}
        >
          Go to Login Page
        </button>
      </div>
    </div>
  )
}

export default LoginModal

