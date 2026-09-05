import { useState, type FormEvent } from 'react'
import './auth.css'
import { authenticate } from '../../lib/api'

type AuthMode = 'signin' | 'signup'

type AuthPageProps = { initialMode?: AuthMode }

export function AuthPage({ initialMode = 'signin' }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')
    if (typeof email !== 'string' || typeof password !== 'string' || (mode === 'signup' && typeof name !== 'string')) {
      setError('Please complete all required fields.')
      setIsSubmitting(false)
      return
    }
    const payload = mode === 'signup' ? { email, password, name } : { email, password }
    try {
      const { jwt } = await authenticate(mode, payload)
      localStorage.setItem('daily-post-jwt', jwt)
      window.location.assign('/dashboard')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to connect. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <a className="auth-brand" href="/" aria-label="Daily Post home">
          <span className="auth-brand-mark">D</span>
          <span>Daily Post</span>
        </a>
        <div className="auth-quote">
          <span className="auth-kicker">A home for thoughtful stories</span>
          <h1>Make room<br />for <em>what matters.</em></h1>
          <p>Write clearly. Read deeply. Join a community of people sharing ideas worth keeping.</p>
        </div>
        <div className="auth-panel-footer"><span>© 2024 Daily Post</span><span>Independent publishing, with intention.</span></div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="auth-form-heading">
            <span className="auth-kicker">{mode === 'signin' ? 'Welcome back' : 'Start your story'}</span>
            <h2>{mode === 'signin' ? 'Sign in to Daily Post' : 'Create your account'}</h2>
            <p>{mode === 'signin' ? 'Continue where you left off.' : 'A place for your ideas to take shape.'}</p>
          </div>
          <div className="auth-tabs" role="tablist" aria-label="Authentication">
            <button className={mode === 'signin' ? 'selected' : ''} onClick={() => setMode('signin')} role="tab" aria-selected={mode === 'signin'}>Sign in</button>
            <button className={mode === 'signup' ? 'selected' : ''} onClick={() => setMode('signup')} role="tab" aria-selected={mode === 'signup'}>Create account</button>
          </div>
          <div className="auth-changing" key={mode}>
            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === 'signup' && <label>Full name<input type="text" name="name" autoComplete="name" placeholder="Alex Reader" required /></label>}
              <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
              <label>Password <span className="label-hint">{mode === 'signup' && '8 characters minimum'}</span><input type="password" name="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} placeholder="Enter your password" minLength={8} required /></label>
              {mode === 'signin' && <a className="forgot-link" href="#forgot-password">Forgot password?</a>}
              {error && <p className="auth-error" role="alert">{error}</p>}
              <button className="auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Working...' : mode === 'signin' ? 'Sign in' : 'Create account'} <span>↗</span></button>
            </form>
            <p className="auth-terms">{mode === 'signup' ? <>By creating an account, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</> : <>New to Daily Post? <button onClick={() => setMode('signup')}>Create an account</button></>}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
