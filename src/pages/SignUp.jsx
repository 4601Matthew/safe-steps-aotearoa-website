import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { authAPI } from '../utils/api'
import './SignUp.css'

function SignUp() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [selectedRole, setSelectedRole] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // Role-specific fields
    businessName: '', // Contractor
    licenseNumber: '', // Contractor
    specialties: '', // Contractor
    organization: '', // Healthcare
    position: '', // Healthcare
    registrationNumber: '', // Healthcare
    availability: '', // Volunteer
    skills: '', // Volunteer
    motivation: '', // Volunteer
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Redirect if already logged in
  if (authLoading || user) {
    return null
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!selectedRole) {
      setError('Please select a role type')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    // Role-specific validation
    if (selectedRole === 'contractor') {
      if (!formData.businessName || !formData.licenseNumber) {
        setError('Please fill in all required fields for contractors')
        return
      }
    } else if (selectedRole === 'healthcare') {
      if (!formData.organization || !formData.position) {
        setError('Please fill in all required fields for healthcare professionals')
        return
      }
    } else if (selectedRole === 'volunteer') {
      if (!formData.availability || !formData.motivation) {
        setError('Please fill in all required fields for volunteers')
        return
      }
    }

    setLoading(true)

    try {
      // Prepare registration data
      const registrationData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        requestedRole: selectedRole,
        status: 'pending',
        // Role-specific data
        ...(selectedRole === 'contractor' && {
          businessName: formData.businessName,
          licenseNumber: formData.licenseNumber,
          specialties: formData.specialties,
        }),
        ...(selectedRole === 'healthcare' && {
          organization: formData.organization,
          position: formData.position,
          registrationNumber: formData.registrationNumber,
        }),
        ...(selectedRole === 'volunteer' && {
          availability: formData.availability,
          skills: formData.skills,
          motivation: formData.motivation,
        }),
      }

      await authAPI.register(registrationData)
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-success">
            <div className="success-icon">✓</div>
            <h1>Application Submitted!</h1>
            <p>
              Thank you for your interest in joining Safe Steps Aotearoa. Your application has been submitted and is pending review.
            </p>
            <p>
              Our admin team will review your application and you'll receive an email once your account has been approved.
            </p>
            <Link to="/login" className="btn btn-primary">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Sign Up</h1>
          <p>Join Safe Steps Aotearoa and make a difference</p>
        </div>

        {!selectedRole ? (
          <div className="role-selection">
            <h2>Select Your Role</h2>
            <p className="role-description">Choose the role that best describes how you'd like to contribute:</p>
            <div className="role-cards">
              <div 
                className="role-card"
                onClick={() => handleRoleSelect('contractor')}
              >
                <div className="role-icon">🔧</div>
                <h3>Contractor</h3>
                <p>Provide professional services at discounted rates or donate time</p>
              </div>
              <div 
                className="role-card"
                onClick={() => handleRoleSelect('healthcare')}
              >
                <div className="role-icon">🏥</div>
                <h3>Healthcare Professional</h3>
                <p>Make referrals and track client progress</p>
              </div>
              <div 
                className="role-card"
                onClick={() => handleRoleSelect('volunteer')}
              >
                <div className="role-icon">🙋</div>
                <h3>Volunteer</h3>
                <p>Help with home safety assessments and practical support</p>
              </div>
            </div>
            <div className="signup-footer">
              <p>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </div>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <button
                type="button"
                className="back-button"
                onClick={() => setSelectedRole(null)}
              >
                ← Back
              </button>
              <h2>
                {selectedRole === 'contractor' && '🔧 Contractor Registration'}
                {selectedRole === 'healthcare' && '🏥 Healthcare Professional Registration'}
                {selectedRole === 'volunteer' && '🙋 Volunteer Registration'}
              </h2>
            </div>

            {error && (
              <div className="signup-error">
                {error}
              </div>
            )}

            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
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

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+64 21 123 4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {selectedRole === 'contractor' && (
              <div className="form-section">
                <h3>Contractor Information</h3>
                <div className="form-group">
                  <label htmlFor="businessName">Business Name *</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your business or company name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="licenseNumber">License/Registration Number *</label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="Your professional license or registration number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialties">Specialties/Services</label>
                  <textarea
                    id="specialties"
                    name="specialties"
                    value={formData.specialties}
                    onChange={handleChange}
                    placeholder="e.g., Pressure washing, lighting installation, pathway repairs..."
                    rows="3"
                  />
                </div>
              </div>
            )}

            {selectedRole === 'healthcare' && (
              <div className="form-section">
                <h3>Healthcare Professional Information</h3>
                <div className="form-group">
                  <label htmlFor="organization">Organization/Institution *</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="e.g., Waikato Hospital, GP Practice..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="position">Position/Title *</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g., Registered Nurse, Paramedic, GP..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="registrationNumber">Professional Registration Number</label>
                  <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Your professional registration number (if applicable)"
                  />
                </div>
              </div>
            )}

            {selectedRole === 'volunteer' && (
              <div className="form-section">
                <h3>Volunteer Information</h3>
                <div className="form-group">
                  <label htmlFor="availability">Availability *</label>
                  <textarea
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    placeholder="e.g., Weekends, weekday mornings, flexible..."
                    rows="2"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="skills">Relevant Skills</label>
                  <textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g., Gardening, basic repairs, first aid..."
                    rows="2"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="motivation">Why do you want to volunteer? *</label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Tell us about your motivation to help..."
                    rows="3"
                    required
                  />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary btn-large signup-submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>

            <div className="signup-footer">
              <p>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default SignUp

