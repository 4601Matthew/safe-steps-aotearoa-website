import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import QuickRoleAssign from '../components/QuickRoleAssign'
import './Dashboard.css'

function Dashboard() {
  const { user, hasAccess } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user.name || user.email}!</h1>
          <p>Your Safe Steps Aotearoa Dashboard</p>
        </div>

        <div className="dashboard-content">
          <QuickRoleAssign />
          
          <div className="dashboard-section">
            <h2>Your Access</h2>
            <div className="access-cards">
              {hasAccess('contractor') && (
                <div className="access-card">
                  <div className="access-icon">🔧</div>
                  <h3>Contractor Portal</h3>
                  <p>View assigned jobs and manage your work</p>
                  <button className="btn btn-primary">Go to Contractor Portal</button>
                </div>
              )}

              {hasAccess('healthcare') && (
                <div className="access-card">
                  <div className="access-icon">🏥</div>
                  <h3>Healthcare Portal</h3>
                  <p>Make referrals and track client progress</p>
                  <button className="btn btn-primary">Go to Healthcare Portal</button>
                </div>
              )}

              {hasAccess('volunteer') && (
                <div className="access-card">
                  <div className="access-icon">🤝</div>
                  <h3>Volunteer Portal</h3>
                  <p>View volunteer opportunities and track your contributions</p>
                  <button className="btn btn-primary">Go to Volunteer Portal</button>
                </div>
              )}

              {hasAccess('administrator') && (
                <div className="access-card admin-card">
                  <div className="access-icon">⚙️</div>
                  <h3>Admin Panel</h3>
                  <p>Manage users, roles, and system settings</p>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin')}
                  >
                    Go to Admin Panel
                  </button>
                </div>
              )}

              {hasAccess('developer') && (
                <div className="access-card developer-card">
                  <div className="access-icon">💻</div>
                  <h3>Developer Tools</h3>
                  <p>Developer console and advanced system tools</p>
                  <button className="btn btn-secondary">Developer Console</button>
                </div>
              )}

              {!hasAccess('contractor') && !hasAccess('healthcare') && !hasAccess('volunteer') && !hasAccess('administrator') && !hasAccess('developer') && (
                <div className="access-card no-access">
                  <div className="access-icon">⏳</div>
                  <h3>No Access Assigned</h3>
                  <p>Please select an access level above to get started.</p>
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Your Information</h2>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{user.name || 'Not set'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Login Method:</span>
                <span className="info-value">{user.provider === 'google' ? 'Google' : 'Email/Password'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Roles:</span>
                <span className="info-value">
                  {user.roles?.length > 0 ? user.roles.join(', ') : 'None assigned'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

