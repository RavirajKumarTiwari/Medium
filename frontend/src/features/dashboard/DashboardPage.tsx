import { useEffect, useState } from 'react'
import { getPosts, type Post } from '../../lib/api'
import './dashboard.css'

function excerpt(content: string) {
  return content.replace(/\s+/g, ' ').trim().slice(0, 132) + (content.length > 132 ? '...' : '')
}

export function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('daily-post-jwt')
    if (!token) {
      window.location.replace('/signin')
      return
    }

    getPosts(token)
      .then(setPosts)
      .catch((requestError: unknown) => {
        const message = requestError instanceof Error ? requestError.message : 'Unable to load your stories.'
        if (message.includes('session has expired')) {
          localStorage.removeItem('daily-post-jwt')
          window.location.replace('/signin')
          return
        }
        setError(message)
      })
      .finally(() => setLoading(false))
  }, [])

  function signOut() {
    localStorage.removeItem('daily-post-jwt')
    window.location.assign('/')
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <a className="dashboard-brand" href="/"><span>D</span> Daily Post</a>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <a className="dashboard-nav-active" href="/dashboard">My stories</a>
          <a href="#profile">AR</a>
          <button onClick={signOut}>Sign out</button>
        </nav>
      </header>
      <section className="dashboard-content">
        <div className="dashboard-title-row">
          <div><span className="dashboard-kicker">Author dashboard</span><h1>Your <em>stories.</em></h1><p>A home for the ideas you&apos;ve put into the world.</p></div>
          <a className="dashboard-write-button" href="/write">Write a story <span>↗</span></a>
        </div>
        <div className="dashboard-rule"><span>{loading ? 'Loading stories' : `${posts.length} ${posts.length === 1 ? 'story' : 'stories'}`}</span><span>All stories</span></div>
        {loading && <div className="dashboard-loading" aria-live="polite"><span /><span /><span /></div>}
        {!loading && error && <div className="dashboard-state dashboard-error" role="alert"><h2>Something went wrong.</h2><p>{error}</p><button onClick={() => window.location.reload()}>Try again ↗</button></div>}
        {!loading && !error && posts.length === 0 && <div className="dashboard-state"><div className="empty-mark">✦</div><h2>Your first story is waiting.</h2><p>Put an idea into words and make a little room for it here.</p><a className="dashboard-write-button" href="/write">Write your first story <span>↗</span></a></div>}
        {!loading && !error && posts.length > 0 && <div className="dashboard-story-list">{posts.map((post, index) => <article className="dashboard-story" key={post.id}><div className="dashboard-story-number">{String(index + 1).padStart(2, '0')}</div><div className="dashboard-story-main"><span className="dashboard-status">{post.published ? 'Published' : 'Draft'}</span><h2>{post.title}</h2><p>{excerpt(post.content)}</p><div className="dashboard-story-meta"><span>{post.published ? 'Published story' : 'Only you can see this'}</span><i /><a href={`/article/${post.id}`}>Read story ↗</a><a href={`/edit/${post.id}`}>Edit</a></div></div><div className="dashboard-story-art" aria-hidden="true">{index % 2 === 0 ? <>Field<br />notes</> : <>A slower<br />internet</>}</div></article>)}</div>}
      </section>
      <footer className="dashboard-footer"><span>Daily Post / Your stories</span><span>Keep making room <b>✦</b></span></footer>
    </main>
  )
}
