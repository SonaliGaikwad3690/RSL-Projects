import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const addRecentActivity = (user, action) => {
  const existing = JSON.parse(localStorage.getItem('voxora-recent-activity') || '[]')
  const nextEntry = {
    user,
    action,
    date: new Date().toLocaleString(),
  }

  const updated = [nextEntry, ...existing.filter((entry) => entry.user.toLowerCase() !== user.toLowerCase())]

  localStorage.setItem('voxora-recent-activity', JSON.stringify(updated.slice(0, 12)))
}

function SignInPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [resetMessage, setResetMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setResetMessage('')
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()

    const email = formData.email.trim()

    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Enter your email to reset the password.' }))
      setResetMessage('')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Enter a valid email address.' }))
      setResetMessage('')
      return
    }

    const users = JSON.parse(localStorage.getItem('voxora-custom-users') || '[]')
    const existingUser = users.find((user) => user.user.toLowerCase() === email.toLowerCase())

    if (!existingUser) {
      setErrors((prev) => ({ ...prev, email: 'No account found for this email. Please sign up first.' }))
      setResetMessage('')
      return
    }

    const newPassword = window.prompt('Create a new password (minimum 6 characters):')

    if (newPassword === null) {
      return
    }

    if (newPassword.trim().length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters.' }))
      setResetMessage('')
      return
    }

    const finalPassword = newPassword.trim()

    localStorage.setItem('voxora-custom-password', finalPassword)
    setFormData((prev) => ({ ...prev, password: finalPassword }))
    setErrors((prev) => ({ ...prev, email: '', password: '' }))
    setResetMessage(`New password saved for ${email}. You can sign in now.`)
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required.'
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    return nextErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const email = formData.email.trim()
    const password = formData.password.trim()
    const users = JSON.parse(localStorage.getItem('voxora-custom-users') || '[]')
    const nextUser = { user: email, role: 'Custom User', status: 'Active', time: 'just now' }

    const updatedUsers = [
      ...users.filter((user) => user.user.toLowerCase() !== email.toLowerCase()),
      nextUser,
    ]

    localStorage.setItem('voxora-custom-users', JSON.stringify(updatedUsers))
    localStorage.setItem('voxora-current-user', JSON.stringify(nextUser))
    addRecentActivity(email, 'Signed in to Voxora workspace')

    if (password) {
      localStorage.setItem('voxora-custom-password', password)
    }

    navigate('/customers')
  }

  const handleSignUp = () => {
    const email = formData.email.trim()
    const password = formData.password.trim()

    if (!email || !password) {
      setErrors({
        email: !email ? 'Email is required.' : '',
        password: !password ? 'Password is required.' : '',
      })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: 'Enter a valid email address.' })
      return
    }

    if (password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters.' })
      return
    }

    const users = JSON.parse(localStorage.getItem('voxora-custom-users') || '[]')
    const existingUser = users.find((user) => user.user.toLowerCase() === email.toLowerCase())

    if (existingUser) {
      addRecentActivity(email, 'Sign-up attempt blocked: account already exists')

      setErrors({ email: 'This user already exists. Please sign in instead.' })
      return
    }

    const newUser = { user: email, role: 'Custom User', status: 'Active', time: 'just now' }

    localStorage.setItem('voxora-custom-users', JSON.stringify([...users, newUser]))
    localStorage.setItem('voxora-current-user', JSON.stringify(newUser))
    localStorage.setItem('voxora-custom-password', password)
    addRecentActivity(email, 'Created a new Voxora account')

    navigate('/customers')
  }

  return (
    <div className="signin-page">
      <div className="signin-panel">
        <div className="signin-brand">
          <div className="brand-mark large">V</div>
          <div>
            <h2>Voxora</h2>
            <small>AI calling suite</small>
          </div>
        </div>

        <div className="signin-copy">
          <p className="eyebrow dark">Welcome back</p>
          <h1>Sign in to your workspace</h1>
        </div>

        <form className="signin-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Email address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.email && <small className="field-error">{errors.email}</small>}
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <small className="field-error">{errors.password}</small>}
          </label>

          <div className="form-row">
            <label className="remember-box">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
          </div>

          {resetMessage && <div className="reset-message">{resetMessage}</div>}

          <div className="signin-actions">
            <button type="submit" className="primary-btn signin-btn">Sign in</button>
            <button type="button" className="secondary-btn signup-btn" onClick={handleSignUp}>Sign up</button>
          </div>
        </form>

        <div className="signin-footer">
          <span>Need access?</span>
          <a href="#">Contact admin</a>
        </div>
      </div>

      <div className="signin-visual">
        <div className="visual-card stats-box">
          <span>Today's overview</span>
          <strong>74% target reached</strong>
          <div className="mini-bars">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>

        <div className="visual-card card-highlight">
          <p>Live queue</p>
          <strong>246 active calls</strong>
          <small>+18 in last hour</small>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
