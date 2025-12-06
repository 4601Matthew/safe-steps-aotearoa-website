import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { userAPI, adminAPI } from '../utils/api'
import './Profile.css'

const ROLE_LABELS = {
  'developer': 'Developer',
  'administrator': 'Administrator',
  'healthcare': 'Healthcare Practitioner',
  'contractor': 'Contractor',
  'volunteer': 'Volunteer',
}

function Profile() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // Load user data
    setFormData({
      name: user.name || '',
      email: user.email || '',
    })
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // Update profile (this would need a new API endpoint)
      // For now, we'll just update the local state
      const updatedUser = { ...user, ...formData }
      login(updatedUser, localStorage.getItem('token'))
      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage(error.message || 'Failed to update profile')
      setTimeout(() => setMessage(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  const currentRole = user.roles?.[0] || null
  const roleLabel = currentRole ? ROLE_LABELS[currentRole] || currentRole : 'No access level'

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <p>Manage your account information</p>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Account Information</h2>
            {message && (
              <div className={`profile-message ${message.includes('Failed') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}

            <form className="profile-form" onSubmit={handleSubmit}>
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
                  disabled={loading}
                />
              </div>

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
                  disabled={loading}
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label>Access Level</label>
                <div className="role-display">
                  <span className="role-badge-large">{roleLabel}</span>
                  <p className="role-hint">Change your access level from the Dashboard</p>
                </div>
              </div>

              <div className="form-group">
                <label>Login Method</label>
                <div className="provider-display">
                  <span className={`provider-badge ${user.provider || 'local'}`}>
                    {user.provider === 'google' ? 'Google' : 'Email/Password'}
                  </span>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          <div className="profile-section">
            <h2>Account Security</h2>
            <div className="security-options">
              <div className="security-item">
                <div>
                  <h3>Change Password</h3>
                  <p>Update your password to keep your account secure</p>
                </div>
                <button className="btn btn-secondary">Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

