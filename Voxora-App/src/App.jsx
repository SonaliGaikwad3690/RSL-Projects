
import { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import { callHistory, campaigns, customers, liveCalls } from './data/mockData'
import CustomerPage from './pages/CustomerPage'
import CallHistoryPage from './pages/CallHistoryPage'
import LiveCallPage from './pages/LiveCallPage'
import AutomatedCallingPage from './pages/AutomatedCallingPage'
import HumanAssistancePage from './pages/HumanAssistancePage'
import CustomerSupportPage from './pages/CustomerSupportPage'
import SignInPage from './pages/SignInPage'
import AdminPage from './pages/AdminPage'

function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const isSignInPage = location.pathname === '/signin'
  const currentUser = JSON.parse(localStorage.getItem('voxora-current-user') || 'null')
  const userName = currentUser?.user || 'Admin'
  const userRole = currentUser?.role || 'Ops lead'
  const [searchTerm, setSearchTerm] = useState('')

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return []

    const matches = []

    customers.forEach((customer) => {
      const haystack = `${customer.name} ${customer.company || ''} ${customer.segment} ${customer.status}`.toLowerCase()
      if (haystack.includes(query)) {
        matches.push({ id: customer.id, label: customer.name, type: 'Customer', path: '/customers' })
      }
    })

    callHistory.forEach((entry) => {
      const haystack = `${entry.customer} ${entry.type} ${entry.result} ${entry.agent}`.toLowerCase()
      if (haystack.includes(query)) {
        matches.push({ id: entry.id, label: entry.customer, type: 'Call', path: '/call-history' })
      }
    })

    liveCalls.forEach((entry) => {
      const haystack = `${entry.customer} ${entry.product} ${entry.queue} ${entry.agent}`.toLowerCase()
      if (haystack.includes(query)) {
        matches.push({ id: `${entry.customer}-${entry.agent}`, label: entry.customer, type: 'Live call', path: '/live-call' })
      }
    })

    campaigns.forEach((campaign) => {
      const haystack = `${campaign.name} ${campaign.status} ${campaign.scheduled}`.toLowerCase()
      if (haystack.includes(query)) {
        matches.push({ id: campaign.name, label: campaign.name, type: 'Report', path: '/automated-calling' })
      }
    })

    return matches.slice(0, 6)
  }, [searchTerm])

  if (isSignInPage) {
    return (
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    )
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-search-wrap">
            <div className="topbar-search">
              <span>⌕</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search customers, calls, reports..."
              />
            </div>

            {searchTerm.trim() && (
              <div className="search-results-panel">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      className="search-result-item"
                      onClick={() => {
                        setSearchTerm('')
                        navigate(result.path)
                      }}
                    >
                      <span className="search-result-tag">{result.type}</span>
                      <span>{result.label}</span>
                    </button>
                  ))
                ) : (
                  <div className="search-empty-state">No matching customer, call, or report found.</div>
                )}
              </div>
            )}
          </div>

          <div className="topbar-actions">
            <button className="icon-btn" aria-label="notifications">🔔</button>
            <button className="icon-btn" aria-label="messages">✉️</button>
            <div className="profile-pill">
              <div className="avatar small profile">{(userName || 'A').charAt(0).toUpperCase()}</div>
              <div>
                <strong>{userName}</strong>
                <small>{userRole}</small>
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/call-history" element={<CallHistoryPage />} />
          <Route path="/live-call" element={<LiveCallPage />} />
          <Route path="/automated-calling" element={<AutomatedCallingPage />} />
          <Route path="/human-assistance" element={<HumanAssistancePage />} />
          <Route path="/customer-support" element={<CustomerSupportPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/customers" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
