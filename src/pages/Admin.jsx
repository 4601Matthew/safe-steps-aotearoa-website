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

  const handleApprove = async (userId, role) => {
    try {
      await adminAPI.approveUser(userId, role)
      setMessage('User approved successfully')
      setTimeout(() => setMessage(''), 3000)
      loadUsers()
    } catch (error) {
      console.error('Error approving user:', error)
      setMessage('Failed to approve user: ' + (error.message || 'Unknown error'))
      setTimeout(() => setMessage(''), 5000)
    }
  }

  const handleReject = async (userId) => {
    if (!window.confirm('Are you sure you want to reject this application?')) {
      return
    }
    try {
      await adminAPI.rejectUser(userId)
      setMessage('User rejected successfully')
      setTimeout(() => setMessage(''), 3000)
      loadUsers()
    } catch (error) {
      console.error('Error rejecting user:', error)
      setMessage('Failed to reject user: ' + (error.message || 'Unknown error'))
      setTimeout(() => setMessage(''), 5000)
    }
  }

  const handleDelete = async (userId) => {
    const user = users.find(u => u.id === userId)
    if (!window.confirm(`Are you sure you want to delete ${user?.name || 'this user'}? This action cannot be undone.`)) {
      return
    }
    try {
      await adminAPI.deleteUser(userId)
      setMessage('User deleted successfully')
      setTimeout(() => setMessage(''), 3000)
      loadUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      setMessage('Failed to delete user: ' + (error.message || 'Unknown error'))
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
              className={`admin-tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Applications
              {users.filter(u => u.status === 'pending').length > 0 && (
                <span className="tab-badge">{users.filter(u => u.status === 'pending').length}</span>
              )}
            </button>
            <button
              className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </div>

          <div className="admin-tab-content">
            {activeTab === 'pending' && (
              <PendingApplicationsTab 
                users={users.filter(u => u.status === 'pending')} 
                onApprove={handleApprove}
                onReject={handleReject}
                message={message}
                loading={loading}
                onReload={loadUsers}
              />
            )}
            {activeTab === 'users' && (
              <UsersTab 
                users={users.filter(u => u.status !== 'pending')} 
                onRoleChange={handleRoleChange}
                onDelete={handleDelete}
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

function PendingApplicationsTab({ users, onApprove, onReject, message, loading, onReload }) {
  const [expandedUser, setExpandedUser] = useState(null)
  const [selectedRole, setSelectedRole] = useState({})

  const availableRoles = ['contractor', 'healthcare', 'volunteer', 'administrator', 'developer', 'admin']
  const roleLabels = {
    contractor: 'Contractor',
    healthcare: 'Healthcare Professional',
    volunteer: 'Volunteer',
    administrator: 'Administrator',
    developer: 'Developer',
    admin: 'Admin',
  }

  const handleUserClick = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId)
  }

  const handleApproveClick = (userId) => {
    const role = selectedRole[userId] || users.find(u => u.id === userId)?.requestedRole
    if (!role) {
      alert('Please select a role for this user')
      return
    }
    onApprove(userId, role)
  }

  if (users.length === 0) {
    return (
      <div className="pending-tab">
        <div className="tab-header">
          <h2>Pending Applications</h2>
          <p className="tab-description">
            No pending applications at this time.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pending-tab">
      <div className="tab-header">
        <h2>Pending Applications</h2>
        <p className="tab-description">
          Review and approve or reject new user applications. Click on an application to view details.
        </p>
      </div>

      {message && (
        <div className={`admin-message ${message.includes('Failed') ? 'error' : 'info'}`}>
          {message}
        </div>
      )}

      <div className="users-list">
        {users.map((u) => (
          <div key={u.id} className={`user-item ${expandedUser === u.id ? 'expanded' : ''}`}>
            <div className="user-item-header" onClick={() => handleUserClick(u.id)}>
              <div className="user-item-main">
                <div className="user-item-name">{u.name || 'N/A'}</div>
                <div className="user-item-email">{u.email}</div>
                <div className="user-item-role">
                  <span className="role-badge pending">Pending - {roleLabels[u.requestedRole] || u.requestedRole}</span>
                </div>
              </div>
              <div className="user-item-arrow">
                {expandedUser === u.id ? '▲' : '▼'}
              </div>
            </div>
            
            {expandedUser === u.id && (
              <div className="user-item-details">
                <div className="user-detail-section">
                  <h3>Application Information</h3>
                  <div className="user-detail-grid">
                    <div className="user-detail-item">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{u.name || 'Not set'}</span>
                    </div>
                    <div className="user-detail-item">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{u.email}</span>
                    </div>
                    <div className="user-detail-item">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">{u.phone || 'Not provided'}</span>
                    </div>
                    <div className="user-detail-item">
                      <span className="detail-label">Requested Role:</span>
                      <span className="detail-value">{roleLabels[u.requestedRole] || u.requestedRole}</span>
                    </div>
                    <div className="user-detail-item">
                      <span className="detail-label">Applied:</span>
                      <span className="detail-value">{new Date(u.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {u.requestedRole === 'contractor' && (
                  <div className="user-detail-section">
                    <h3>Contractor Details</h3>
                    <div className="user-detail-grid">
                      <div className="user-detail-item">
                        <span className="detail-label">Business Name:</span>
                        <span className="detail-value">{u.businessName || 'Not provided'}</span>
                      </div>
                      <div className="user-detail-item">
                        <span className="detail-label">License Number:</span>
                        <span className="detail-value">{u.licenseNumber || 'Not provided'}</span>
                      </div>
                      <div className="user-detail-item full-width">
                        <span className="detail-label">Specialties:</span>
                        <span className="detail-value">{u.specialties || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {u.requestedRole === 'healthcare' && (
                  <div className="user-detail-section">
                    <h3>Healthcare Professional Details</h3>
                    <div className="user-detail-grid">
                      <div className="user-detail-item">
                        <span className="detail-label">Organization:</span>
                        <span className="detail-value">{u.organization || 'Not provided'}</span>
                      </div>
                      <div className="user-detail-item">
                        <span className="detail-label">Position:</span>
                        <span className="detail-value">{u.position || 'Not provided'}</span>
                      </div>
                      <div className="user-detail-item">
                        <span className="detail-label">Registration Number:</span>
                        <span className="detail-value">{u.registrationNumber || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {u.requestedRole === 'volunteer' && (
                  <div className="user-detail-section">
                    <h3>Volunteer Details</h3>
                    <div className="user-detail-grid">
                      <div className="user-detail-item full-width">
                        <span className="detail-label">Availability:</span>
                        <span className="detail-value">{u.availability || 'Not provided'}</span>
                      </div>
                      <div className="user-detail-item full-width">
                        <span className="detail-label">Skills:</span>
                        <span className="detail-value">{u.skills || 'Not provided'}</span>
                      </div>
                      <div className="user-detail-item full-width">
                        <span className="detail-label">Motivation:</span>
                        <span className="detail-value">{u.motivation || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="user-detail-section">
                  <h3>Assign Role & Approve</h3>
                  <div className="role-selection">
                    {availableRoles.map(role => (
                      <label key={role} className="role-radio">
                        <input
                          type="radio"
                          name={`approve-role-${u.id}`}
                          checked={selectedRole[u.id] === role}
                          onChange={() => setSelectedRole({ ...selectedRole, [u.id]: role })}
                        />
                        <span>{roleLabels[role]}</span>
                      </label>
                    ))}
                  </div>
                  <div className="approval-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleApproveClick(u.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => onReject(u.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function UsersTab({ users, onRoleChange, onDelete, message, loading, onReload }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedUser, setExpandedUser] = useState(null)
  
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

  // Get role labels (for display names)
  const roleLabels = (() => {
    const stored = localStorage.getItem('roleLabels')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error('Error parsing stored role labels:', e)
      }
    }
    return {}
  })()

  const getRoleLabel = (roleId) => {
    return roleLabels[roleId] || (roleId ? roleId.charAt(0).toUpperCase() + roleId.slice(1) : 'None')
  }

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase()
    return (
      (user.name || '').toLowerCase().includes(query) ||
      (user.email || '').toLowerCase().includes(query) ||
      (user.roles?.[0] || '').toLowerCase().includes(query) ||
      getRoleLabel(user.roles?.[0]).toLowerCase().includes(query)
    )
  })

  const handleUserClick = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId)
  }

  return (
    <div className="users-tab">
      <div className="tab-header">
        <h2>User Management</h2>
        <p className="tab-description">
          Click on a user to view and edit their details. Each user can have one access level.
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

      <div className="users-search">
        <input
          type="text"
          placeholder="Search users by name, email, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="users-list">
        {filteredUsers.length === 0 ? (
          <div className="users-empty">
            <p>{searchQuery ? 'No users found matching your search' : 'No users found'}</p>
          </div>
        ) : (
          filteredUsers.map((u) => (
            <div key={u.id} className={`user-item ${expandedUser === u.id ? 'expanded' : ''}`}>
              <div className="user-item-header" onClick={() => handleUserClick(u.id)}>
                <div className="user-item-main">
                  <div className="user-item-name">{u.name || 'N/A'}</div>
                  <div className="user-item-email">{u.email}</div>
                </div>
                <div className="user-item-role">
                  {u.roles?.length > 0 ? (
                    <span className="role-badge">{getRoleLabel(u.roles[0])}</span>
                  ) : (
                    <span className="no-roles">No access level</span>
                  )}
                </div>
                <div className="user-item-arrow">
                  {expandedUser === u.id ? '▲' : '▼'}
                </div>
              </div>
              
              {expandedUser === u.id && (
                <div className="user-item-details">
                  <div className="user-detail-section">
                    <h3>User Information</h3>
                    <div className="user-detail-grid">
                      <div className="user-detail-item">
                        <span className="detail-label">Name:</span>
                        <span className="detail-value">{u.name || 'Not set'}</span>
                      </div>
                      <div className="user-detail-item">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{u.email}</span>
                      </div>
                      <div className="user-detail-item">
                        <span className="detail-label">Provider:</span>
                        <span className={`provider-badge ${u.provider}`}>
                          {u.provider === 'google' ? 'Google' : 'Local'}
                        </span>
                      </div>
                      <div className="user-detail-item">
                        <span className="detail-label">User ID:</span>
                        <span className="detail-value">{u.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="user-detail-section">
                    <h3>Access Level</h3>
                    <div className="role-selection">
                      {availableRoles.map(role => (
                        <label key={role} className="role-radio">
                          <input
                            type="radio"
                            name={`role-${u.id}`}
                            checked={u.roles?.[0] === role}
                            onChange={() => onRoleChange(u.id, role)}
                          />
                          <span>{getRoleLabel(role)}</span>
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

                  <div className="user-detail-section">
                    <h3>Danger Zone</h3>
                    <button
                      className="btn btn-secondary"
                      style={{ backgroundColor: '#dc3545', color: 'white' }}
                      onClick={() => onDelete(u.id)}
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Admin
