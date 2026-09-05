import { useEffect, useState } from 'react'
import { getPosts, type Post } from '../../lib/api'
import './studio.css'

function words(content: string) {
  return content.trim() ? content.trim().split(/\s+/).length : 0
}

export function StudioPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('daily-post-jwt')
    if (!token) {
      window.location.replace('/signin')
      return
    }
    getPosts(token).then(setPosts).catch((requestError: unknown) => {
      const message = requestError instanceof Error ? requestError.message : 'Unable to load your studio.'
      if (message.includes('session has expired')) {
        localStorage.removeItem('daily-post-jwt')
        window.location.replace('/signin')
        return
      }
      setError(message)
    }).finally(() => setLoading(false))
  }, [])

  const totalWords = posts.reduce((total, post) => total + words(post.content), 0)
  const drafts = posts.filter((post) => !post.published).length

  return (
    <main className="studio-page">
      <header className="studio-header">
        <a className="studio-brand" href="/"><span>D</span> Daily Post</a>
        <nav aria-label="Creator studio navigation"><a className="studio-active" href="/studio">Studio</a><a href="/feed">Read</a><a className="studio-avatar" href="/dashboard">AR</a></nav>
      </header>
      <div className="studio-layout">
        <aside className="studio-sidebar">
          <span className="studio-kicker">Creator studio</span>
          <h1>Make a little<br /><em>room.</em></h1>
          <p>Your quiet corner for shaping ideas, tracking your work, and sharing what matters.</p>
          <a className="studio-write" href="/write">New story <span>↗</span></a>
          <nav className="studio-menu" aria-label="Studio sections"><a className="studio-menu-active" href="#overview">Overview <b>01</b></a><a href="#stories">Your stories <b>{posts.length}</b></a><a href="#insights">Insights <b>↗</b></a></nav>
          <div className="studio-sidebar-footer">Daily Post<br />Independent publishing, with intention.</div>
        </aside>
        <section className="studio-main">
          <div className="studio-intro" id="overview"><div><span className="studio-kicker">Saturday, September 5, 2026</span><h2>Good to see you,<br /><em>Alex.</em></h2></div><span className="studio-note">Write what only<br />you can write.</span></div>
          <div className="studio-metrics" id="insights"><div><span>Stories</span><strong>{loading ? '—' : posts.length}</strong><small>Total stories</small></div><div><span>Words written</span><strong>{loading ? '—' : totalWords.toLocaleString()}</strong><small>Across all stories</small></div><div><span>In progress</span><strong>{loading ? '—' : drafts}</strong><small>Drafts to revisit</small></div></div>
          <div className="studio-section-heading" id="stories"><div><span className="studio-kicker">Your work</span><h3>Recent stories</h3></div><a href="/dashboard">View all ↗</a></div>
          {loading && <div className="studio-loading"><span /><span /><span /></div>}
          {!loading && error && <div className="studio-message" role="alert"><h3>Couldn&apos;t load your studio.</h3><p>{error}</p><button onClick={() => window.location.reload()}>Try again ↗</button></div>}
          {!loading && !error && posts.length === 0 && <div className="studio-empty"><span>✦</span><h3>Your desk is clear.</h3><p>Start with one idea and see where it takes you.</p><a href="/write">Write your first story ↗</a></div>}
          {!loading && !error && posts.length > 0 && <div className="studio-stories">{posts.slice(0, 5).map((post, index) => <article className="studio-story" key={post.id}><span className="studio-story-index">{String(index + 1).padStart(2, '0')}</span><div><span className="studio-status">{post.published ? 'Published' : 'Draft'}</span><h4>{post.title}</h4><p>{post.content.replace(/\s+/g, ' ').trim().slice(0, 105)}...</p><span className="studio-story-meta">{words(post.content)} words <i /> Updated recently</span></div><a className="studio-story-edit" href={`/edit/${post.id}`}>Edit ↗</a></article>)}</div>}
        </section>
      </div>
    </main>
  )
}
