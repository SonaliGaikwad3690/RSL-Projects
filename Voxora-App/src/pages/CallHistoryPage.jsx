import { callHistory } from '../data/mockData'

const resultClassMap = {
  Connected: 'badge-success',
  Qualified: 'badge-success',
  'Follow-up': 'badge-warm',
  Escalated: 'badge-neutral',
  Queued: 'badge-neutral',
}

function CallHistoryPage() {
  const totalDuration = callHistory.reduce((sum, call) => {
    const [minutes, seconds] = call.duration.split(':').map(Number)
    return sum + minutes * 60 + seconds
  }, 0)

  const totalMinutes = Math.floor(totalDuration / 60)
  const summaryCards = [
    { label: 'Total calls', value: callHistory.length, note: '+12% this week' },
    { label: 'Connected', value: callHistory.filter((call) => call.result === 'Connected').length, note: 'Strong response' },
    { label: 'Avg. duration', value: `${Math.round(totalDuration / callHistory.length / 60)} min`, note: 'Per call' },
  ]

  const handleDownloadLog = () => {
    const headers = ['Call ID', 'Customer', 'Type', 'Result', 'Agent', 'Duration', 'Date']
    const rows = callHistory.map((call) => [
      call.id,
      call.customer,
      call.type,
      call.result,
      call.agent,
      call.duration,
      call.date,
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'voxora-call-history.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-content call-history-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Communication log</p>
          <h1>Call history</h1>
        </div>
        <button type="button" className="primary-btn" onClick={handleDownloadLog}>Download log</button>
      </div>

      <div className="stats-grid call-history-stats">
        {summaryCards.map((card) => (
          <div className="stat-card call-summary-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.note}</small>
          </div>
        ))}
      </div>

      <div className="panel call-history-panel">
        <div className="panel-header">
          <h3>Recent calls</h3>
          <button type="button" className="secondary-btn">Filter</button>
        </div>

        <div className="table-wrap call-history-table-wrap">
          <table className="call-history-table">
            <thead>
              <tr>
                <th>Call ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Result</th>
                <th>Agent</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {callHistory.map((call) => (
                <tr key={call.id}>
                  <td className="call-id-cell">{call.id}</td>
                  <td>
                    <div className="call-customer">
                      <span className="avatar small">{call.customer.charAt(0)}</span>
                      <div>
                        <strong>{call.customer}</strong>
                        <small>{call.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`call-type-pill ${call.type === 'Inbound' ? 'inbound' : 'outbound'}`}>
                      {call.type}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${resultClassMap[call.result] || 'badge-neutral'}`}>
                      {call.result}
                    </span>
                  </td>
                  <td>{call.agent}</td>
                  <td>{call.duration}</td>
                  <td>{call.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CallHistoryPage
