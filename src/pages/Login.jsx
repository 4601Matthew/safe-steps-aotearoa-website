import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '../contexts/AuthContext'
import { authAPI } from '../utils/api'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleLocalLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        // Sign up
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }

        const response = await authAPI.register(
          formData.email,
          formData.password,
          formData.name
        )

        login(response.user, response.token)
        navigate('/dashboard')
      } else {
        // Sign in
        const response = await authAPI.login(
          formData.email,
          formData.password
        )

        login(response.user, response.token)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true)
      setError('')

      const response = await authAPI.googleLogin(credentialResponse.credential)
      
      login(response.user, response.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Google authentication failed. Please try again.')
      console.error('Google login error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    setError('Google authentication failed. Please try again.')
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h1>{isSignUp ? 'Create Account' : 'Login'}</h1>
          <p>Access your Safe Steps Aotearoa account</p>
        </div>

        {/* Google Login - Only show if client ID is configured */}
        {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
          <div className="google-login-section">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="filled_blue"
              size="large"
              text={isSignUp ? 'signup_with' : 'signin_with'}
              shape="rectangular"
            />
            <div className="divider">
              <span>or</span>
            </div>
          </div>
        )}

        {/* Local Login Form */}
        <form className="login-form" onSubmit={handleLocalLogin}>
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              minLength={6}
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>
          )}

          {!isSignUp && (
            <div className="login-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary btn-large login-submit"
            disabled={loading}
          >
            {loading 
              ? (isSignUp ? 'Creating account...' : 'Logging in...') 
              : (isSignUp ? 'Create Account' : 'Login')
            }
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              type="button"
              className="link-button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                })
              }}
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
          <p>
            <a href="/">← Back to home</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
