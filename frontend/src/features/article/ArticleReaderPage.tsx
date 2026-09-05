import { useEffect, useState, type FormEvent } from 'react'
import { getPost, type Post } from '../../lib/api'
import './article.css'

type ArticleReaderPageProps = { id: string }

export function ArticleReaderPage({ id }: ArticleReaderPageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [claps, setClaps] = useState(12)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [response, setResponse] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('daily-post-jwt')
    if (!token) {
      window.location.replace('/signin')
      return
    }

    getPost(token, id)
      .then((loadedPost) => {
        if (!loadedPost) setError('This story could not be found.')
        else setPost(loadedPost)
      })
      .catch((requestError: unknown) => {
        const message = requestError instanceof Error ? requestError.message : 'Unable to load this story.'
        if (message.includes('session has expired')) {
          localStorage.removeItem('daily-post-jwt')
          window.location.replace('/signin')
          return
        }
        setError(message)
      })
      .finally(() => setLoading(false))
  }, [id])

  function shareStory() {
    void navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  function submitResponse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setResponse('')
  }

  return (
    <main className="article-page">
      <header className="article-header">
        <a className="article-brand" href="/"><span>D</span> Daily Post</a>
        <nav><a href="/dashboard">Your stories</a><a className="article-avatar" href="#profile">AR</a></nav>
      </header>
      {loading && <div className="article-state"><span className="article-loader" /><p>Loading story...</p></div>}
      {!loading && error && <div className="article-state"><h1>We couldn&apos;t find that story.</h1><p>{error}</p><a href="/dashboard">Back to your stories ↗</a></div>}
      {!loading && !error && post && (
        <article className="article-reader">
          <a className="article-back" href="/dashboard">← Back to your stories</a>
          <header className="article-title-block">
            <span className="article-kicker">{post.published ? 'Published story' : 'Draft'}</span>
            <h1>{post.title}</h1>
            <p className="article-dek">A thoughtful note from the Daily Post community.</p>
            <div className="article-meta"><span className="article-author">AR</span><span>Daily Post author</span><i /><span>5 min read</span></div>
          </header>
          <div className="article-body">{post.content.split(/\n{2,}/).map((paragraph, index) => <p key={`${post.id}-${index}`}>{paragraph}</p>)}</div>
          <div className="article-engagement" aria-label="Story engagement">
            <button className={claps > 12 ? 'engagement-active' : ''} onClick={() => setClaps((value) => value + 1)} aria-label="Clap for this story">👏 <span>{claps}</span></button>
            <button className={saved ? 'engagement-active' : ''} onClick={() => setSaved((value) => !value)} aria-label={saved ? 'Remove bookmark' : 'Bookmark story'}>{saved ? '🔖' : '♡'}</button>
            <button onClick={shareStory} aria-label="Copy story link">{copied ? 'Copied' : '↗ Share'}</button>
          </div>
          <section className="article-response">
            <div><span className="article-kicker">Join the conversation</span><h2>What did this story make you think about?</h2></div>
            <form onSubmit={submitResponse}><textarea value={response} onChange={(event) => setResponse(event.target.value)} placeholder="Share a thoughtful response..." aria-label="Your response" /><button type="submit" disabled={!response.trim()}>Respond <span>↗</span></button></form>
          </section>
          <div className="article-actions"><a href={`/edit/${post.id}`}>Edit story <span>↗</span></a><a href="/dashboard">More from your stories <span>→</span></a></div>
        </article>
      )}
    </main>
  )
}
