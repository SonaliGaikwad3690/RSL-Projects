import { NavLink, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Customers', path: '/customers', icon: '👥' },
  { label: 'Call History', path: '/call-history', icon: '📞' },
  { label: 'Live Call', path: '/live-call', icon: '🎧' },
  { label: 'Automated Calling', path: '/automated-calling', icon: '🤖' },
  { label: 'Human Assistance', path: '/human-assistance', icon: '🧑‍💼' },
  { label: 'Customer Support', path: '/customer-support', icon: '💬' },
  { label: 'Admin', path: '/admin', icon: '⚙️' },
]

function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <div className="brand-wrap">
        <div className="brand-mark">V</div>
        <div>
          <h2>Voxora</h2>
          <small>AI calling suite</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-card">
        <p>Today</p>
        <strong>74% target reached</strong>
      </div>

      <button type="button" className="sidebar-cta" onClick={() => navigate('/signin')}>
        <span aria-hidden="true" className="sidebar-cta-arrow">←</span>
        Sign Up
      </button>
    </aside>
  )
}

export default Sidebar
