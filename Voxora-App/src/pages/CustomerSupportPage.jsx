import { useEffect, useState } from 'react'
import { customerCareTips, supportStats, supportTickets as defaultTickets } from '../data/mockData'

const STORAGE_KEY = 'voxora-customer-support-tickets'

const serviceChannels = [
  { name: 'Phone support', status: 'Live', badge: 'green' },
  { name: 'Live chat', status: 'Busy', badge: 'amber' },
  { name: 'Email follow-up', status: 'Healthy', badge: 'blue' },
  { name: 'WhatsApp', status: 'Ready', badge: 'green' },
]

const customerInsights = [
  { title: 'Billing issues', count: '24', note: 'Follow-up due today' },
  { title: 'Onboarding help', count: '18', note: '3 new requests' },
  { title: 'Technical bugs', count: '9', note: '1 escalated' },
]

function CustomerSupportPage() {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return defaultTickets
      }
    }

    return defaultTickets
  })

  const [selectedTicket, setSelectedTicket] = useState(null)

  const visibleTickets = tickets.slice(0, 2)
  const visibleInsights = customerInsights.slice(0, 2)
  const visibleCareTips = customerCareTips.slice(0, 1)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
  }, [tickets])

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Delete this ticket from support queue?')
    if (!confirmDelete) return

    setTickets((prev) => {
      const updated = prev.filter((ticket) => ticket.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const handleExportSupport = () => {
    const headers = ['Ticket ID', 'Customer', 'Priority', 'Status', 'Owner', 'Issue']
    const rows = tickets.map((ticket) => [
      ticket.id,
      ticket.customer,
      ticket.priority,
      ticket.status,
      ticket.owner,
      ticket.issue,
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'voxora-support-tickets.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Customer care</p>
          <h1>Customer support</h1>
        </div>
        <div className="page-header-actions">
          <button type="button" className="secondary-btn export-btn" onClick={handleExportSupport}>Export report</button>
        </div>
      </div>

      <div className="support-hero">
        <div className="panel support-hero-panel">
          <div className="support-hero-top">
            <div>
              <p className="eyebrow dark">Support overview</p>
              <h2>Service health is excellent</h2>
            </div>
            <span className="support-highlight-badge">96% satisfaction</span>
          </div>

          <div className="support-metrics">
            {supportStats.map((stat) => (
              <div className="support-metric" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.detail}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="panel support-channel-panel">
          <div className="panel-header">
            <h3>Service channels</h3>
          </div>

          <div className="channel-list">
            {serviceChannels.map((channel) => (
              <div key={channel.name} className="channel-item">
                <div>
                  <strong>{channel.name}</strong>
                  <small>{channel.status}</small>
                </div>
                <span className={`channel-status ${channel.badge}`}>{channel.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTicket && (
        <div className="modal-backdrop" onClick={() => setSelectedTicket(null)}>
          <div className="modal-panel panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h3>{selectedTicket.customer}</h3>
              <button className="secondary-btn" onClick={() => setSelectedTicket(null)}>Close</button>
            </div>

            <div className="detail-grid">
              <div className="mini-detail">
                <span>Ticket</span>
                <strong>{selectedTicket.id}</strong>
              </div>
              <div className="mini-detail">
                <span>Priority</span>
                <strong>{selectedTicket.priority}</strong>
              </div>
              <div className="mini-detail">
                <span>Owner</span>
                <strong>{selectedTicket.owner}</strong>
              </div>
              <div className="mini-detail">
                <span>Status</span>
                <strong>{selectedTicket.status}</strong>
              </div>
            </div>

            <div className="support-detail-box">
              <h4>Issue summary</h4>
              <p>{selectedTicket.issue}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid-two support-layout">
        <div className="panel">
          <div className="panel-header">
            <h3>Support queue</h3>
            <button className="secondary-btn" onClick={() => window.alert('View all action triggered')}>View all</button>
          </div>

          {visibleTickets.length === 0 ? (
            <div className="empty-state">
              <h4>No support tickets</h4>
              <p>All tickets are cleared from the queue.</p>
            </div>
          ) : (
            <div className="ticket-list compact-ticket-list">
              {visibleTickets.map((ticket) => (
                <div key={ticket.id} className="ticket-card compact-ticket-card">
                  <div className="ticket-meta">
                    <div>
                      <strong>{ticket.customer}</strong>
                      <small>{ticket.id}</small>
                    </div>
                    <span className={`badge ${ticket.priority === 'High' ? 'badge-warm' : ticket.priority === 'Low' ? 'badge-neutral' : 'badge-success'}`}>
                      {ticket.priority}
                    </span>
                  </div>

                  <p>{ticket.issue}</p>

                  <div className="ticket-bottom">
                    <span>{ticket.owner}</span>
                    <span className="status-pill">{ticket.status}</span>
                  </div>

                  <div className="table-actions support-actions">
                    <button className="action-btn view-btn" onClick={() => setSelectedTicket(ticket)} title="View ticket">👁️</button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(ticket.id)} title="Delete ticket">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="support-side-stack">
          <div className="panel">
            <div className="panel-header">
              <h3>Customer insights</h3>
            </div>

            <div className="insight-list compact-insight-list">
              {visibleInsights.map((item) => (
                <div key={item.title} className="insight-item compact-insight-item">
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.note}</small>
                  </div>
                  <span>{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>Agent guidance</h3>
            </div>

            <div className="care-list compact-care-list">
              {visibleCareTips.map((tip, index) => (
                <div className="care-item compact-care-item" key={tip}>
                  <span className="dot green"></span>
                  <div>
                    <strong>Step {index + 1}</strong>
                    <p>{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerSupportPage
