import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminStats } from '../data/mockData'

const defaultTeamAccess = [
  { user: 'admin@voxora.ai', role: 'Super Admin', status: 'Active', time: 'now' },
]

const defaultRecentActivity = []

function AdminPage() {
  const navigate = useNavigate()
  const savedUsers = JSON.parse(localStorage.getItem('voxora-custom-users') || '[]')
  const savedActivity = JSON.parse(localStorage.getItem('voxora-recent-activity') || '[]')

  const teamAccess = [...defaultTeamAccess, ...savedUsers].filter(
    (user, index, arr) => arr.findIndex((item) => item.user.toLowerCase() === user.user.toLowerCase()) === index,
  )

  const dedupedRecentActivity = [...defaultRecentActivity, ...savedActivity].reduce((acc, activity) => {
    const key = (activity?.user || '').toLowerCase()
    if (!key) return acc

    const current = acc.get(key)
    if (!current || new Date(activity.date).getTime() >= new Date(current.date).getTime()) {
      acc.set(key, activity)
    }

    return acc
  }, new Map())

  const recentActivity = Array.from(dedupedRecentActivity.values())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8)

  useEffect(() => {
    localStorage.setItem('voxora-recent-activity', JSON.stringify(recentActivity))
  }, [recentActivity])

  const showUserAccessEmpty = teamAccess.length === 0 && recentActivity.length > 0
  const showRecentActivityEmpty = recentActivity.length === 0 && teamAccess.length > 0
  const showSingleEmptyState = teamAccess.length === 0 && recentActivity.length === 0

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Control center</p>
          <h1>Admin</h1>
        </div>

        <div className="page-header-actions">
          <button className="primary-btn" onClick={() => window.alert('System config action triggered')}>System config</button>
        </div>
      </div>

      <div className="grid-two admin-main-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>User access</h3>
          </div>

          <div className="user-access-list">
            {showSingleEmptyState || showUserAccessEmpty ? (
              <div className="empty-state compact-empty">
                <h4>No active users</h4>
                <p>New user access will appear here once created.</p>
              </div>
            ) : (
              teamAccess.map((member) => (
                <div key={member.user} className="user-access-item">
                  <div className="user-meta">
                    <span className="user-avatar">{member.user.charAt(0)}</span>
                    <div>
                      <strong>{member.user}</strong>
                      <small>{member.role}</small>
                    </div>
                  </div>

                  <div className="user-status-block">
                    <span className={`presence-badge ${member.status === 'Active' ? 'active' : 'idle'}`}>
                      {member.status}
                    </span>
                    <small>{member.time}</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Recent activity</h3>
          </div>

          <div className="activity-table-wrap">
            {showSingleEmptyState || showRecentActivityEmpty ? (
              <div className="empty-state compact-empty">
                <h4>No recent activity</h4>
                <p>Recent sign-ins and actions will appear here.</p>
              </div>
            ) : (
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((activity) => (
                    <tr key={`${activity.user}-${activity.date}`}>
                      <td>{activity.user}</td>
                      <td>{activity.action}</td>
                      <td>{activity.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
