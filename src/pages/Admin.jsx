import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { adminAPI } from '../utils/api'
import './Admin.css'

function Admin() {
  const { user, hasAccess } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !hasAccess('admin')) {
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

  const handleRoleToggle = async (userId, role) => {
    try {
      const user = users.find(u => u.id === userId)
      if (!user) return

      const currentRoles = user.roles || []
      const newRoles = currentRoles.includes(role)
        ? currentRoles.filter(r => r !== role)
        : [...currentRoles, role]

      await adminAPI.updateUserRoles(userId, newRoles)
      loadUsers() // Reload users
    } catch (error) {
      console.error('Error updating roles:', error)
      alert('Failed to update user roles')
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p>Manage user access and roles</p>
        </div>

        <div className="admin-content">
          <div className="admin-section">
            <h2>User Management</h2>
            <p className="admin-description">
              Assign roles to users to grant them access to different portals. 
              Users can have multiple roles.
            </p>

            <div className="users-table">
              <div className="table-header">
                <div className="table-cell">Name</div>
                <div className="table-cell">Email</div>
                <div className="table-cell">Provider</div>
                <div className="table-cell">Roles</div>
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
                          u.roles.map(role => (
                            <span key={role} className="role-badge">{role}</span>
                          ))
                        ) : (
                          <span className="no-roles">No roles</span>
                        )}
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="role-actions">
                        <label className="role-checkbox">
                          <input
                            type="checkbox"
                            checked={u.roles?.includes('contractor') || false}
                            onChange={() => handleRoleToggle(u.id, 'contractor')}
                          />
                          <span>Contractor</span>
                        </label>
                        <label className="role-checkbox">
                          <input
                            type="checkbox"
                            checked={u.roles?.includes('healthcare') || false}
                            onChange={() => handleRoleToggle(u.id, 'healthcare')}
                          />
                          <span>Healthcare</span>
                        </label>
                        <label className="role-checkbox">
                          <input
                            type="checkbox"
                            checked={u.roles?.includes('staff') || false}
                            onChange={() => handleRoleToggle(u.id, 'staff')}
                          />
                          <span>Staff</span>
                        </label>
                        <label className="role-checkbox">
                          <input
                            type="checkbox"
                            checked={u.roles?.includes('admin') || false}
                            onChange={() => handleRoleToggle(u.id, 'admin')}
                          />
                          <span>Admin</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin

