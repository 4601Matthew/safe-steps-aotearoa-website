import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { adminAPI } from '../utils/api'
import './QuickRoleAssign.css'

// Role hierarchy (highest to lowest)
const ROLE_HIERARCHY = [
  { id: 'developer', label: 'Developer', icon: '💻', description: 'Full access including developer tools' },
  { id: 'administrator', label: 'Administrator', icon: '⚙️', description: 'Full admin access' },
  { id: 'healthcare', label: 'Healthcare Practitioner', icon: '🏥', description: 'Healthcare portal access' },
  { id: 'contractor', label: 'Contractor', icon: '🔧', description: 'Contractor portal access' },
  { id: 'volunteer', label: 'Volunteer', icon: '🤝', description: 'Volunteer portal access' },
]

function QuickRoleAssign() {
  const { user, login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  if (!user) return null

  const currentRole = user.roles?.[0] || null // Only one role allowed

  const handleRoleChange = async (roleId) => {
    if (currentRole === roleId) {
      // If clicking the same role, remove it
      roleId = null
    }

    setLoading(true)
    setMessage('')
    
    try {
      // Set single role (or empty array if removing)
      const newRoles = roleId ? [roleId] : []

      // Update roles via API
      await adminAPI.updateUserRoles(user.id, newRoles)
      
      // Update local user state
      const updatedUser = { ...user, roles: newRoles }
      login(updatedUser, localStorage.getItem('token'))
      
      setMessage(roleId ? `Role set to ${ROLE_HIERARCHY.find(r => r.id === roleId)?.label}` : 'Role removed')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error updating roles:', error)
      setMessage(error.message || 'Failed to update role')
      setTimeout(() => setMessage(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="quick-role-assign">
      <div className="quick-role-header">
        <h3>Access Level</h3>
        <p>Select your access level. Higher levels include all lower level permissions.</p>
      </div>

      {message && (
        <div className={`role-message ${message.includes('Failed') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="role-buttons">
        {ROLE_HIERARCHY.map((role) => {
          const isActive = currentRole === role.id
          return (
            <button
              key={role.id}
              className={`role-button ${isActive ? 'active' : ''}`}
              onClick={() => handleRoleChange(role.id)}
              disabled={loading}
              title={role.description}
            >
              <span className="role-icon">{role.icon}</span>
              <span className="role-label">{role.label}</span>
              {isActive && <span className="role-check">✓</span>}
            </button>
          )
        })}
      </div>

      <div className="current-role">
        <strong>Current access level:</strong>{' '}
        {currentRole ? (
          <span className="current-role-badge">
            {ROLE_HIERARCHY.find(r => r.id === currentRole)?.label || currentRole}
          </span>
        ) : (
          <span className="no-role">None assigned</span>
        )}
      </div>

      <div className="role-hierarchy-info">
        <p><strong>Access Hierarchy:</strong></p>
        <ul>
          <li><strong>Developer</strong> - Full access including developer tools</li>
          <li><strong>Administrator</strong> - Full admin access (no dev tools)</li>
          <li><strong>Healthcare Practitioner</strong> - Healthcare portal access</li>
          <li><strong>Contractor</strong> - Contractor portal access</li>
          <li><strong>Volunteer</strong> - Volunteer portal access</li>
        </ul>
      </div>
    </div>
  )
}

export default QuickRoleAssign
