import { campaigns } from '../data/mockData'

function AutomatedCallingPage() {
  const summaryCards = [
    { label: 'Campaigns active', value: '28', note: '+5 this week' },
    { label: 'Auto-connect rate', value: '82.6%', note: '+3.2%' },
    { label: 'Scheduled calls', value: '3,210', note: 'Tomorrow' },
  ]

  return (
    <div className="page-content automated-calling-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Workflow automation</p>
          <h1>Automated calling</h1>
        </div>
        <button type="button" className="primary-btn" onClick={() => window.alert('Create campaign action triggered')}>Create campaign</button>
      </div>

      <div className="stats-grid automated-stats">
        {summaryCards.map((card) => (
          <div className="stat-card automated-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.note}</small>
          </div>
        ))}
      </div>

      <div className="panel automated-panel">
        <div className="panel-header">
          <h3>Campaign overview</h3>
          <span className="live-badge automation-live">Running</span>
        </div>

        <div className="campaign-list">
          {campaigns.map((campaign) => (
            <div className="campaign-card" key={campaign.name}>
              <div className="campaign-top">
                <h4>{campaign.name}</h4>
                <span className={`badge ${campaign.status === 'Running' ? 'badge-success' : campaign.status === 'Queued' ? 'badge-neutral' : 'badge-warm'}`}>
                  {campaign.status}
                </span>
              </div>

              <div className="progress-block">
                <label>Reach</label>
                <div className="progress"><span style={{ width: campaign.reach }}></span></div>
                <strong>{campaign.reach}</strong>
              </div>

              <div className="progress-block">
                <label>Success</label>
                <div className="progress success"><span style={{ width: campaign.success }}></span></div>
                <strong>{campaign.success}</strong>
              </div>

              <div className="campaign-meta">
                <span>Schedule: {campaign.scheduled}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AutomatedCallingPage
