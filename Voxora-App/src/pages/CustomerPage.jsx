import { useEffect, useState } from 'react'
import { customers as defaultCustomers } from '../data/mockData'

const STORAGE_KEY = 'voxora-customers'

const EMPTY_FORM = {
  name: '',
  company: '',
  email: '',
  phone: '',
  segment: 'Retail',
  status: 'New inquiry',
  owner: 'Nina',
}

function CustomerPage() {
  const [customerList, setCustomerList] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return defaultCustomers
      }
    }
    return defaultCustomers
  })

  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customerList))
  }, [customerList])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setShowForm(false)
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim()) return

    const customerPayload = {
      id: editingId || `C-${Date.now()}`,
      name: form.name.trim(),
      company: form.company.trim() || 'Not provided',
      email: form.email.trim() || 'Not provided',
      phone: form.phone.trim() || 'Not provided',
      segment: form.segment,
      status: form.status,
      owner: form.owner,
      lastTouch: editingId ? 'updated just now' : 'just now',
    }

    if (editingId) {
      setCustomerList((prev) =>
        prev.map((customer) => (customer.id === editingId ? { ...customer, ...customerPayload } : customer)),
      )
    } else {
      setCustomerList((prev) => [customerPayload, ...prev])
    }

    resetForm()
  }

  const toggleAddForm = () => {
    if (showForm) {
      resetForm()
      return
    }

    setSelectedCustomer(null)
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEditForm = (customer) => {
    setSelectedCustomer(null)
    setEditingId(customer.id)
    setForm({
      name: customer.name,
      company: customer.company || '',
      email: customer.email || '',
      phone: customer.phone || '',
      segment: customer.segment,
      status: customer.status,
      owner: customer.owner,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    const yes = window.confirm('Delete this customer?')
    if (!yes) return

    setCustomerList((prev) => prev.filter((customer) => customer.id !== id))

    if (selectedCustomer?.id === id) {
      setSelectedCustomer(null)
    }
  }

  const handleExportCustomers = () => {
    const headers = ['Name', 'Company', 'Email', 'Phone', 'Segment', 'Status', 'Owner', 'Last touch']
    const rows = customerList.map((customer) => [
      customer.name,
      customer.company || 'Not provided',
      customer.email || 'Not provided',
      customer.phone || 'Not provided',
      customer.segment,
      customer.status,
      customer.owner,
      customer.lastTouch || 'Not provided',
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'voxora-customers.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Customer management</p>
          <h1>Customers</h1>
        </div>
        <button className="primary-btn" onClick={toggleAddForm}>
          {showForm ? 'Close form' : '+ Add customer'}
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card accent">
          <span>Total customers</span>
          <strong>{customerList.length}</strong>
          <small>+12.4%</small>
        </div>
        <div className="stat-card">
          <span>Qualified this week</span>
          <strong>1,346</strong>
          <small>+8.1%</small>
        </div>
        <div className="stat-card">
          <span>Need follow-up</span>
          <strong>486</strong>
          <small>-3.3%</small>
        </div>
      </div>

      {(showForm || selectedCustomer) && (
        <div className="modal-backdrop" onClick={() => {
          setShowForm(false)
          setSelectedCustomer(null)
        }}>
          {showForm && (
            <div className="modal-panel panel add-customer-form-panel" onClick={(e) => e.stopPropagation()}>
              <div className="panel-header">
                <h3>{editingId ? 'Edit customer' : 'Add new customer'}</h3>
                <button type="button" className="secondary-btn" onClick={resetForm}>Cancel</button>
              </div>

              <form className="customer-form" onSubmit={handleSubmit}>
                <label>
                  <span>Customer name</span>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Enter customer name" />
                </label>

                <label>
                  <span>Company</span>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Company name" />
                </label>

                <label>
                  <span>Email</span>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="customer@email.com" />
                </label>

                <label>
                  <span>Phone</span>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                </label>

                <label>
                  <span>Segment</span>
                  <select name="segment" value={form.segment} onChange={handleChange}>
                    <option>Retail</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Hospitality</option>
                    <option>Education</option>
                  </select>
                </label>

                <label>
                  <span>Status</span>
                  <select name="status" value={form.status} onChange={handleChange}>
                    <option>New inquiry</option>
                    <option>Warm lead</option>
                    <option>Qualified</option>
                    <option>Follow-up</option>
                    <option>VIP</option>
                  </select>
                </label>

                <label>
                  <span>Owner</span>
                  <select name="owner" value={form.owner} onChange={handleChange}>
                    <option>Nina</option>
                    <option>Karan</option>
                    <option>Sara</option>
                    <option>Leah</option>
                    <option>Jane</option>
                  </select>
                </label>

                <button type="submit" className="primary-btn customer-submit-btn">
                  {editingId ? 'Update customer' : 'Save customer'}
                </button>
              </form>
            </div>
          )}

          {selectedCustomer && !showForm && (
            <div className="modal-panel details-sheet" onClick={(e) => e.stopPropagation()}>
              <div className="details-header">
                <div className="person-cell">
                  <div className="avatar profile">{selectedCustomer.name.charAt(0)}</div>
                  <div>
                    <strong>{selectedCustomer.name}</strong>
                    <small>{selectedCustomer.id}</small>
                  </div>
                </div>
                <button className="secondary-btn" onClick={() => setSelectedCustomer(null)}>Close</button>
              </div>

              <div className="detail-grid">
                <div className="mini-detail">
                  <span>Company</span>
                  <strong>{selectedCustomer.company || 'Not provided'}</strong>
                </div>
                <div className="mini-detail">
                  <span>Segment</span>
                  <strong>{selectedCustomer.segment}</strong>
                </div>
                <div className="mini-detail">
                  <span>Status</span>
                  <strong>{selectedCustomer.status}</strong>
                </div>
                <div className="mini-detail">
                  <span>Owner</span>
                  <strong>{selectedCustomer.owner}</strong>
                </div>
                <div className="mini-detail">
                  <span>Email</span>
                  <strong>{selectedCustomer.email || 'Not provided'}</strong>
                </div>
                <div className="mini-detail">
                  <span>Phone</span>
                  <strong>{selectedCustomer.phone || 'Not provided'}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="panel">
        <div className="panel-header">
          <h3>Customer list</h3>
          <button type="button" className="secondary-btn export-btn" onClick={handleExportCustomers}>Export</button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Segment</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Last touch</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customerList.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="person-cell">
                      <div className="avatar">{customer.name.charAt(0)}</div>
                      <div>
                        <strong>{customer.name}</strong>
                        <small>{customer.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>{customer.segment}</td>
                  <td><span className="badge badge-warm">{customer.status}</span></td>
                  <td>{customer.owner}</td>
                  <td>{customer.lastTouch}</td>
                  <td>
                    <div className="table-actions" aria-label="Customer actions">
                      <button className="action-btn view-btn" onClick={() => {
                        setShowForm(false)
                        setSelectedCustomer(customer)
                      }} title="View customer">👁️</button>
                      <button className="action-btn edit-btn" onClick={() => openEditForm(customer)} title="Edit customer">✏️</button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(customer.id)} title="Delete customer">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CustomerPage
