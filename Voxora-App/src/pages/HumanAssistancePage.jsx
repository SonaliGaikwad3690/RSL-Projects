import { agents } from '../data/mockData'

function HumanAssistancePage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Team operations</p>
          <h1>Human assistance</h1>
        </div>
        <button className="primary-btn" onClick={() => window.alert('Assign task action triggered')}>Assign task</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card accent">
          <span>Agents online</span>
          <strong>34</strong>
          <small>86% active</small>
        </div>
        <div className="stat-card">
          <span>Open escalations</span>
          <strong>12</strong>
          <small>4 high priority</small>
        </div>
        <div className="stat-card">
          <span>Avg. CSAT</span>
          <strong>4.8/5</strong>
          <small>+0.2 this month</small>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Operations desk</h3>
        </div>

        <div className="agent-grid">
          {agents.map((agent) => (
            <div className="agent-card" key={agent.name}>
              <div className="agent-row">
                <div className="avatar">{agent.name.charAt(0)}</div>
                <div>
                  <h4>{agent.name}</h4>
                  <small>{agent.role}</small>
                </div>
              </div>
              <div className="agent-metrics">
                <span className="status-pill">{agent.status}</span>
                <span>{agent.workload}</span>
                <span>Score {agent.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HumanAssistancePage
