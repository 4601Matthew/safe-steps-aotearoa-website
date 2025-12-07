import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { adminAPI } from '../utils/api'
import './Admin.css'

function Admin() {
  const { user, hasAccess } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Allow admin, administrator, or developer to access admin panel
    if (!user || (!hasAccess('admin') && !hasAccess('administrator') && !hasAccess('developer'))) {
      navigate('/dashboard')
      return
    }

    // Load users - API will handle access control
    loadUsers()
  }, [user, hasAccess, navigate])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setMessage('')
      const allUsers = await adminAPI.getUsers()
      setUsers(allUsers)
    } catch (error) {
      console.error('Error loading users:', error)
      setMessage('Failed to load users: ' + (error.message || 'Unknown error'))
      setTimeout(() => setMessage(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId, role) => {
    try {
      const user = users.find(u => u.id === userId)
      if (!user) return

      // If clicking the same role, remove it. Otherwise, set the new role (single role only)
      const currentRole = user.roles?.[0]
      const newRoles = (currentRole === role) ? [] : [role]

      await adminAPI.updateUserRoles(userId, newRoles)
      loadUsers() // Reload users
    } catch (error) {
      console.error('Error updating roles:', error)
      setMessage('Failed to update user role: ' + (error.message || 'Unknown error'))
      setTimeout(() => setMessage(''), 5000)
    }
  }

  if (loading && users.length === 0) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="admin-box">
            <div className="admin-tab-content">
              <p>Loading users...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p>Manage users and system settings</p>
        </div>

        <div className="admin-box">
          <div className="admin-tabs">
            <button
              className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </div>

          <div className="admin-tab-content">
            {activeTab === 'users' && (
              <UsersTab 
                users={users} 
                onRoleChange={handleRoleChange} 
                message={message}
                loading={loading}
                onReload={loadUsers}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function UsersTab({ users, onRoleChange, message, loading, onReload }) {
  // Get available roles from localStorage (set by developers)
  const availableRoles = (() => {
    const stored = localStorage.getItem('roles')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error('Error parsing stored roles:', e)
      }
    }
    return ['developer', 'administrator', 'healthcare', 'contractor', 'volunteer', 'admin']
  })()

  return (
    <div className="users-tab">
      <div className="tab-header">
        <h2>User Management</h2>
        <p className="tab-description">
          Assign access levels to users. Each user can have one access level. 
          Higher levels include all permissions from lower levels.
        </p>
      </div>

      {message && (
        <div className={`admin-message ${message.includes('Failed') ? 'error' : 'info'}`}>
          {message}
          {message.includes('Failed') && (
            <button className="btn btn-secondary btn-small" onClick={onReload} style={{ marginLeft: '1rem' }}>
              Retry
            </button>
          )}
        </div>
      )}

      {loading && users.length > 0 && (
        <div className="admin-message info">
          Refreshing users...
        </div>
      )}

      <div className="users-table">
        <div className="table-header">
          <div className="table-cell">Name</div>
          <div className="table-cell">Email</div>
          <div className="table-cell">Provider</div>
          <div className="table-cell">Access Level</div>
          <div className="table-cell">Actions</div>
        </div>

        {users.length === 0 ? (
          <div className="table-empty">
            <p>No users found</p>
          </div>
        ) : (
          users.map((u) => (
            <div key={u.id} className="table-row">
              <div className="table-cell">
                {u.name || 'N/A'}
              </div>
              <div className="table-cell">
                {u.email}
              </div>
              <div className="table-cell">
                <span className={`provider-badge ${u.provider}`}>
                  {u.provider === 'google' ? 'Google' : 'Local'}
                </span>
              </div>
              <div className="table-cell">
                <div className="roles-list">
                  {u.roles?.length > 0 ? (
                    <span className="role-badge">{u.roles[0]}</span>
                  ) : (
                    <span className="no-roles">No access level</span>
                  )}
                </div>
              </div>
              <div className="table-cell">
                <div className="role-actions">
                  {availableRoles.map(role => (
                    <label key={role} className="role-radio">
                      <input
                        type="radio"
                        name={`role-${u.id}`}
                        checked={u.roles?.[0] === role}
                        onChange={() => onRoleChange(u.id, role)}
                      />
                      <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                    </label>
                  ))}
                  <label className="role-radio">
                    <input
                      type="radio"
                      name={`role-${u.id}`}
                      checked={!u.roles || u.roles.length === 0}
                      onChange={() => onRoleChange(u.id, null)}
                    />
                    <span>None</span>
                  </label>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Admin
