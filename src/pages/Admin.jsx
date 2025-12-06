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
              Assign access levels to users. Each user can have one access level. 
              Higher levels include all permissions from lower levels.
            </p>

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
                            onChange={() => handleRoleChange(u.id, 'developer')}
                          />
                          <span>Developer</span>
                        </label>
                        <label className="role-radio">
                          <input
                            type="radio"
                            name={`role-${u.id}`}
                            checked={u.roles?.[0] === 'administrator'}
                            onChange={() => handleRoleChange(u.id, 'administrator')}
                          />
                          <span>Administrator</span>
                        </label>
                        <label className="role-radio">
                          <input
                            type="radio"
                            name={`role-${u.id}`}
                            checked={u.roles?.[0] === 'healthcare'}
                            onChange={() => handleRoleChange(u.id, 'healthcare')}
                          />
                          <span>Healthcare</span>
                        </label>
                        <label className="role-radio">
                          <input
                            type="radio"
                            name={`role-${u.id}`}
                            checked={u.roles?.[0] === 'contractor'}
                            onChange={() => handleRoleChange(u.id, 'contractor')}
                          />
                          <span>Contractor</span>
                        </label>
                        <label className="role-radio">
                          <input
                            type="radio"
                            name={`role-${u.id}`}
                            checked={u.roles?.[0] === 'volunteer'}
                            onChange={() => handleRoleChange(u.id, 'volunteer')}
                          />
                          <span>Volunteer</span>
                        </label>
                        <label className="role-radio">
                          <input
                            type="radio"
                            name={`role-${u.id}`}
                            checked={!u.roles || u.roles.length === 0}
                            onChange={() => handleRoleChange(u.id, null)}
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
        </div>
      </div>
    </div>
  )
}

export default Admin

