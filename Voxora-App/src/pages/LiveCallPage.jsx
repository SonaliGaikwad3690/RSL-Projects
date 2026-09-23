import { liveCalls } from '../data/mockData'

function LiveCallPage() {
  const summaryCards = [
    { label: 'Active calls', value: '246', note: '12 in queue' },
    { label: 'Avg. response time', value: '00:42', note: 'Below target' },
    { label: 'Positive sentiment', value: '88%', note: '+6% this hour' },
  ]

  const activeCall = {
    customer: 'Sophia Tran',
    agent: 'Mason',
    intent: 'Account setup',
    queue: 'VIP',
    sentiment: 'Positive',
  }

  return (
    <div className="page-content live-call-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Real-time monitoring</p>
          <h1>Live call</h1>
        </div>
        <button type="button" className="primary-btn" onClick={() => window.alert('View dashboard action triggered')}>View dashboard</button>
      </div>

      <div className="stats-grid live-call-stats">
        {summaryCards.map((card) => (
          <div className="stat-card live-summary-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.note}</small>
          </div>
        ))}
      </div>

      <div className="grid-two live-call-layout">
        <div className="panel live-list-panel">
          <div className="panel-header">
            <h3>Live conversations</h3>
            <span className="live-badge">Live</span>
          </div>

          <div className="list-stack">
            {liveCalls.map((call) => (
              <div className="list-item live-call-item" key={`${call.customer}-${call.agent}`}>
                <div className="item-main">
                  <div className="avatar small">{call.customer.charAt(0)}</div>
                  <div>
                    <strong>{call.customer}</strong>
                    <small>{call.product}</small>
                  </div>
                </div>

                <div className="item-meta">
                  <span className="badge">{call.queue}</span>
                  <span>{call.duration}</span>
                  <span>{call.sentiment}</span>
                </div>

                <div className="agent-tag">{call.agent}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel live-monitor-panel">
          <div className="panel-header">
            <h3>Call monitor</h3>
            <span className="mini-live-mark">
              <span className="dot live"></span>
              Active
            </span>
          </div>

          <div className="monitor-box">
            <div className="signal-row">
              <span className="dot live"></span>
              <span>Live call in progress</span>
            </div>

            <div className="wave-bars">
              <span></span><span></span><span></span><span></span><span></span>
            </div>

            <div className="call-details">
              <p><strong>Customer:</strong> {activeCall.customer}</p>
              <p><strong>Agent:</strong> {activeCall.agent}</p>
              <p><strong>Intent:</strong> {activeCall.intent}</p>
              <p><strong>Queue:</strong> {activeCall.queue}</p>
              <p><strong>Sentiment:</strong> {activeCall.sentiment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveCallPage
