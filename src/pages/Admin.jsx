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

  useEffect(() => {
    // Allow admin, administrator, or developer to access admin panel
    if (!user || (!hasAccess('admin') && !hasAccess('administrator') && !hasAccess('developer'))) {
      navigate('/dashboard')
      return
    }

    loadUsers()
  }, [user, hasAccess, navigate])

  const loadUsers = async () => {
    try {
      const allUsers = await adminAPI.getUsers()
      setUsers(allUsers)
    } catch (error) {
      console.error('Error loading users:', error)
      alert('Failed to load users')
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
      alert('Failed to update user role')
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="admin-box">
            <p>Loading...</p>
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
            {hasAccess('developer') && (
              <button
                className={`admin-tab ${activeTab === 'roles' ? 'active' : ''}`}
                onClick={() => setActiveTab('roles')}
              >
                Role Hierarchy
              </button>
            )}
          </div>

          <div className="admin-tab-content">
            {activeTab === 'users' && (
              <UsersTab users={users} onRoleChange={handleRoleChange} />
            )}
            {activeTab === 'roles' && hasAccess('developer') && (
              <RoleHierarchyTab />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function UsersTab({ users, onRoleChange }) {
  return (
    <div className="users-tab">
      <div className="tab-header">
        <h2>User Management</h2>
        <p className="tab-description">
          Assign access levels to users. Each user can have one access level. 
          Higher levels include all permissions from lower levels.
        </p>
      </div>

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
                  <label className="role-radio">
                    <input
                      type="radio"
                      name={`role-${u.id}`}
                      checked={u.roles?.[0] === 'developer'}
                      onChange={() => onRoleChange(u.id, 'developer')}
                    />
                    <span>Developer</span>
                  </label>
                  <label className="role-radio">
                    <input
                      type="radio"
                      name={`role-${u.id}`}
                      checked={u.roles?.[0] === 'administrator'}
                      onChange={() => onRoleChange(u.id, 'administrator')}
                    />
                    <span>Administrator</span>
                  </label>
                  <label className="role-radio">
                    <input
                      type="radio"
                      name={`role-${u.id}`}
                      checked={u.roles?.[0] === 'healthcare'}
                      onChange={() => onRoleChange(u.id, 'healthcare')}
                    />
                    <span>Healthcare</span>
                  </label>
                  <label className="role-radio">
                    <input
                      type="radio"
                      name={`role-${u.id}`}
                      checked={u.roles?.[0] === 'contractor'}
                      onChange={() => onRoleChange(u.id, 'contractor')}
                    />
                    <span>Contractor</span>
                  </label>
                  <label className="role-radio">
                    <input
                      type="radio"
                      name={`role-${u.id}`}
                      checked={u.roles?.[0] === 'volunteer'}
                      onChange={() => onRoleChange(u.id, 'volunteer')}
                    />
                    <span>Volunteer</span>
                  </label>
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

function RoleHierarchyTab() {
  const { hasAccess } = useAuth()
  const [roleHierarchy, setRoleHierarchy] = useState(() => {
    // Load from localStorage or use default
    const stored = localStorage.getItem('roleHierarchy')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error('Error parsing stored role hierarchy:', e)
      }
    }
    // Default hierarchy
    return {
      'developer': ['developer', 'administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
      'administrator': ['administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
      'healthcare': ['healthcare'],
      'contractor': ['contractor'],
      'volunteer': ['volunteer'],
      'admin': ['administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
    }
  })
  const [message, setMessage] = useState('')

  const allRoles = ['developer', 'administrator', 'healthcare', 'contractor', 'volunteer', 'admin']

  const handleToggleAccess = (role, accessRole) => {
    const newHierarchy = { ...roleHierarchy }
    if (!newHierarchy[role]) {
      newHierarchy[role] = []
    }
    
    if (newHierarchy[role].includes(accessRole)) {
      newHierarchy[role] = newHierarchy[role].filter(r => r !== accessRole)
    } else {
      newHierarchy[role] = [...newHierarchy[role], accessRole]
    }
    
    setRoleHierarchy(newHierarchy)
  }

  const handleSave = () => {
    localStorage.setItem('roleHierarchy', JSON.stringify(roleHierarchy))
    setMessage('Role hierarchy saved! Refresh the page for changes to take effect.')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleReset = () => {
    if (confirm('Reset to default role hierarchy? This cannot be undone.')) {
      const defaultHierarchy = {
        'developer': ['developer', 'administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
        'administrator': ['administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
        'healthcare': ['healthcare'],
        'contractor': ['contractor'],
        'volunteer': ['volunteer'],
        'admin': ['administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
      }
      setRoleHierarchy(defaultHierarchy)
      localStorage.setItem('roleHierarchy', JSON.stringify(defaultHierarchy))
      setMessage('Reset to default hierarchy')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  if (!hasAccess('developer')) {
    return <div>Developer access required</div>
  }

  return (
    <div className="role-hierarchy-tab">
      <div className="tab-header">
        <h2>Role Hierarchy Management</h2>
        <p className="tab-description">
          Configure which roles have access to which permissions. 
          Check the boxes to grant a role access to specific permissions.
        </p>
      </div>

      {message && (
        <div className={`hierarchy-message ${message.includes('saved') ? 'success' : 'info'}`}>
          {message}
        </div>
      )}

      <div className="hierarchy-controls">
        <button className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset to Default
        </button>
      </div>

      <div className="hierarchy-table">
        <div className="hierarchy-header">
          <div className="hierarchy-cell role-column">Role</div>
          {allRoles.map(role => (
            <div key={role} className="hierarchy-cell">{role}</div>
          ))}
        </div>

        {allRoles.map(role => (
          <div key={role} className="hierarchy-row">
            <div className="hierarchy-cell role-column">
              <strong>{role}</strong>
            </div>
            {allRoles.map(accessRole => (
              <div key={accessRole} className="hierarchy-cell">
                <label className="hierarchy-checkbox">
                  <input
                    type="checkbox"
                    checked={roleHierarchy[role]?.includes(accessRole) || false}
                    onChange={() => handleToggleAccess(role, accessRole)}
                    disabled={role === accessRole} // Always has access to itself
                  />
                  <span>{roleHierarchy[role]?.includes(accessRole) ? '✓' : ''}</span>
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hierarchy-info">
        <p><strong>How it works:</strong></p>
        <ul>
          <li>Each role can have access to multiple permissions</li>
          <li>When a user has a role, they automatically have access to all permissions checked for that role</li>
          <li>A role always has access to itself (cannot be unchecked)</li>
          <li>Changes are saved to localStorage and require a page refresh to take effect</li>
        </ul>
      </div>
    </div>
  )
}

export default Admin
