import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const { type } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loginTypes = {
    contractor: {
      title: 'Contractor Login',
      icon: '🔧',
      description: 'Login for contractors and tradespeople',
      placeholder: 'Enter your contractor credentials',
    },
    healthcare: {
      title: 'Healthcare Login',
      icon: '🏥',
      description: 'Login for healthcare professionals and community workers',
      placeholder: 'Enter your healthcare provider credentials',
    },
    staff: {
      title: 'Staff Login',
      icon: '👥',
      description: 'Login for Safe Steps Aotearoa staff and administrators',
      placeholder: 'Enter your staff credentials',
    },
  }

  const loginType = loginTypes[type] || loginTypes.staff

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // TODO: Implement actual authentication
    // For now, this is just a placeholder
    setTimeout(() => {
      setLoading(false)
      // Simulate login - replace with actual auth logic
      console.log(`Login attempt for ${type}:`, formData)
      // navigate('/dashboard') // Redirect after successful login
      setError('Authentication not yet implemented. This is a placeholder.')
    }, 1000)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">{loginType.icon}</div>
          <h1>{loginType.title}</h1>
          <p>{loginType.description}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              {error}
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
              autoComplete="current-password"
            />
          </div>

          <div className="login-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-large login-submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Need help? <a href="/contact">Contact us</a>
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

