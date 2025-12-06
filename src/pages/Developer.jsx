import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { adminAPI } from '../utils/api'
import './Developer.css'

function Developer() {
  const { user, hasAccess } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('roles')
  const [roles, setRoles] = useState(() => {
    const stored = localStorage.getItem('roles')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error('Error parsing stored roles:', e)
      }
    }
    return ['developer', 'administrator', 'healthcare', 'contractor', 'volunteer', 'admin']
  })
  const [roleHierarchy, setRoleHierarchy] = useState(() => {
    const stored = localStorage.getItem('roleHierarchy')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error('Error parsing stored role hierarchy:', e)
      }
    }
    return {
      'developer': ['developer', 'administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
      'administrator': ['administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
      'healthcare': ['healthcare'],
      'contractor': ['contractor'],
      'volunteer': ['volunteer'],
      'admin': ['administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
    }
  })
  const [newRoleName, setNewRoleName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user || !hasAccess('developer')) {
      navigate('/dashboard')
      return
    }
  }, [user, hasAccess, navigate])

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

  const handleAddRole = () => {
    if (!newRoleName.trim()) {
      setMessage('Please enter a role name')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    const roleId = newRoleName.trim().toLowerCase().replace(/\s+/g, '-')
    
    if (roles.includes(roleId)) {
      setMessage('Role already exists')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    const newRoles = [...roles, roleId]
    const newHierarchy = { ...roleHierarchy }
    newHierarchy[roleId] = [roleId] // New role has access to itself by default

    setRoles(newRoles)
    setRoleHierarchy(newHierarchy)
    setNewRoleName('')
    setMessage('Role added! Click Save to persist changes.')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDeleteRole = async (roleToDelete) => {
    if (!confirm(`Delete role "${roleToDelete}"? This will remove this role from all users who have it. This cannot be undone.`)) {
      return
    }

    try {
      // Remove role from all users via API
      const users = await adminAPI.getUsers()
      for (const user of users) {
        if (user.roles?.includes(roleToDelete)) {
          const newRoles = user.roles.filter(r => r !== roleToDelete)
          await adminAPI.updateUserRoles(user.id, newRoles.length > 0 ? newRoles : [])
        }
      }

      // Remove from local state
      const newRoles = roles.filter(r => r !== roleToDelete)
      const newHierarchy = { ...roleHierarchy }
      delete newHierarchy[roleToDelete]
      
      // Remove from all other roles' access lists
      Object.keys(newHierarchy).forEach(role => {
        newHierarchy[role] = newHierarchy[role].filter(r => r !== roleToDelete)
      })

      setRoles(newRoles)
      setRoleHierarchy(newHierarchy)
      setMessage(`Role "${roleToDelete}" deleted and removed from all users`)
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      console.error('Error deleting role:', error)
      setMessage('Failed to delete role: ' + (error.message || 'Unknown error'))
      setTimeout(() => setMessage(''), 5000)
    }
  }

  const handleSave = () => {
    localStorage.setItem('roles', JSON.stringify(roles))
    localStorage.setItem('roleHierarchy', JSON.stringify(roleHierarchy))
    setMessage('Changes saved! Refresh the page for changes to take effect.')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleReset = () => {
    if (confirm('Reset to default roles and hierarchy? This cannot be undone.')) {
      const defaultRoles = ['developer', 'administrator', 'healthcare', 'contractor', 'volunteer', 'admin']
      const defaultHierarchy = {
        'developer': ['developer', 'administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
        'administrator': ['administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
        'healthcare': ['healthcare'],
        'contractor': ['contractor'],
        'volunteer': ['volunteer'],
        'admin': ['administrator', 'healthcare', 'contractor', 'volunteer', 'admin'],
      }
      setRoles(defaultRoles)
      setRoleHierarchy(defaultHierarchy)
      localStorage.setItem('roles', JSON.stringify(defaultRoles))
      localStorage.setItem('roleHierarchy', JSON.stringify(defaultHierarchy))
      setMessage('Reset to default')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  if (!user || !hasAccess('developer')) {
    return null
  }

  return (
    <div className="developer-page">
      <div className="container">
        <div className="developer-header">
          <h1>Developer Tools</h1>
          <p>Manage roles and role hierarchy</p>
        </div>

        <div className="developer-box">
          <div className="developer-tabs">
            <button
              className={`developer-tab ${activeTab === 'roles' ? 'active' : ''}`}
              onClick={() => setActiveTab('roles')}
            >
              Role Management
            </button>
            <button
              className={`developer-tab ${activeTab === 'hierarchy' ? 'active' : ''}`}
              onClick={() => setActiveTab('hierarchy')}
            >
              Role Hierarchy
            </button>
          </div>

          <div className="developer-tab-content">
            {activeTab === 'roles' && (
              <RolesTab
                roles={roles}
                newRoleName={newRoleName}
                setNewRoleName={setNewRoleName}
                onAddRole={handleAddRole}
                onDeleteRole={handleDeleteRole}
                onSave={handleSave}
                onReset={handleReset}
                message={message}
              />
            )}
            {activeTab === 'hierarchy' && (
              <HierarchyTab
                roles={roles}
                roleHierarchy={roleHierarchy}
                onToggleAccess={handleToggleAccess}
                onSave={handleSave}
                onReset={handleReset}
                message={message}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function RolesTab({ roles, newRoleName, setNewRoleName, onAddRole, onDeleteRole, onSave, onReset, message }) {
  return (
    <div className="roles-tab">
      <div className="tab-header">
        <h2>Role Management</h2>
        <p className="tab-description">
          Add new roles or delete existing ones. When a role is deleted, it will be removed from all users who have it.
        </p>
      </div>

      {message && (
        <div className={`developer-message ${message.includes('Failed') ? 'error' : message.includes('saved') ? 'success' : 'info'}`}>
          {message}
        </div>
      )}

      <div className="role-controls">
        <div className="add-role-section">
          <h3>Add New Role</h3>
          <div className="add-role-form">
            <input
              type="text"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="Enter role name (e.g., 'Manager')"
              onKeyPress={(e) => e.key === 'Enter' && onAddRole()}
            />
            <button className="btn btn-primary" onClick={onAddRole}>
              Add Role
            </button>
          </div>
          <small>Role ID will be auto-generated (lowercase, hyphenated)</small>
        </div>

        <div className="save-controls">
          <button className="btn btn-primary" onClick={onSave}>
            Save Changes
          </button>
          <button className="btn btn-secondary" onClick={onReset}>
            Reset to Default
          </button>
        </div>
      </div>

      <div className="roles-list-section">
        <h3>Existing Roles</h3>
        <div className="roles-grid">
          {roles.map(role => (
            <div key={role} className="role-item">
              <span className="role-name">{role}</span>
              <button
                className="btn btn-danger btn-small"
                onClick={() => onDeleteRole(role)}
                disabled={['developer', 'administrator'].includes(role)}
                title={['developer', 'administrator'].includes(role) ? 'Cannot delete core roles' : 'Delete role'}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {roles.length === 0 && (
          <p className="no-roles">No roles defined</p>
        )}
      </div>
    </div>
  )
}

function HierarchyTab({ roles, roleHierarchy, onToggleAccess, onSave, onReset, message }) {
  return (
    <div className="hierarchy-tab">
      <div className="tab-header">
        <h2>Role Hierarchy Management</h2>
        <p className="tab-description">
          Configure which roles have access to which permissions. 
          Check the boxes to grant a role access to specific permissions.
        </p>
      </div>

      {message && (
        <div className={`developer-message ${message.includes('saved') ? 'success' : 'info'}`}>
          {message}
        </div>
      )}

      <div className="hierarchy-controls">
        <button className="btn btn-primary" onClick={onSave}>
          Save Changes
        </button>
        <button className="btn btn-secondary" onClick={onReset}>
          Reset to Default
        </button>
      </div>

      <div className="hierarchy-table">
        <div className="hierarchy-header">
          <div className="hierarchy-cell role-column">Role</div>
          {roles.map(role => (
            <div key={role} className="hierarchy-cell">{role}</div>
          ))}
        </div>

        {roles.map(role => (
          <div key={role} className="hierarchy-row">
            <div className="hierarchy-cell role-column">
              <strong>{role}</strong>
            </div>
            {roles.map(accessRole => (
              <div key={accessRole} className="hierarchy-cell">
                <label className="hierarchy-checkbox">
                  <input
                    type="checkbox"
                    checked={roleHierarchy[role]?.includes(accessRole) || false}
                    onChange={() => onToggleAccess(role, accessRole)}
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

export default Developer

