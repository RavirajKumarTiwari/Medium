import { useEffect, useState } from 'react'
import { getPublicPosts, type Post } from '../../lib/api'
import { useTheme } from '../../theme/ThemeContext'
import './feed.css'

export function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { theme, toggleTheme } = useTheme()
  const darkMode = theme === 'dark'

  useEffect(() => {
    getPublicPosts()
      .then(setPosts)
      .catch((requestError: unknown) => setError(requestError instanceof Error ? requestError.message : 'Unable to load the public feed.'))
      .finally(() => setLoading(false))
  }, [])

  const stories = posts.map((post, index) => ({
    category: post.published ? 'PUBLISHED STORY' : 'FROM YOUR DRAFTS',
    title: post.title,
    author: post.author?.name || post.author?.email || 'Daily Post author',
    time: '5 min read',
    art: ['feed-art-sunrise', 'feed-art-green', 'feed-art-clay'][index % 3],
    id: post.id,
  }))

  return (
    <main className={`feed-page ${darkMode ? 'feed-dark' : ''}`}>
      <header className="feed-header">
        <a className="feed-brand" href="/" aria-label="Daily Post home"><span>D</span> Daily Post</a>
        <nav aria-label="Feed navigation"><a className="feed-active" href="/feed">Home</a><a href="#topics">Topics</a><a href="/write" className="feed-write">Write <b>↗</b></a><button className="feed-theme-toggle" onClick={toggleTheme} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{darkMode ? '☼' : '◐'}</button><a className="feed-avatar" href="/dashboard">AR</a></nav>
      </header>
      <div className="feed-layout">
        <section className="feed-main">
          <div className="feed-welcome"><span className="feed-kicker">Good morning, reader</span><h1>Ideas for your <em>day.</em></h1><p>A considered collection of stories from people thinking out loud.</p></div>
          <div className="feed-tabs" role="tablist"><button className="feed-tab-selected" role="tab" aria-selected="true">For you</button><button role="tab" aria-selected="false">Following</button><button role="tab" aria-selected="false">Latest</button></div>
          {loading && <div className="feed-state">Loading published stories...</div>}
          {!loading && error && <div className="feed-state feed-error" role="alert">{error}</div>}
          {!loading && !error && stories.length === 0 && <div className="feed-state">No published stories yet. Be the first to share an idea.</div>}
          {!loading && !error && stories.length > 0 && <div className="feed-story-list">{stories.map((story, index) => <article className="feed-story" key={story.id}><div className={`feed-story-art ${story.art}`} aria-hidden="true"><span>{index === 0 ? <>Field<br />notes</> : index === 1 ? <>A slower<br />internet</> : <>Worth<br />keeping</>}</span></div><div className="feed-story-copy"><span className="feed-category">{story.category}</span><h2><a href={`/article/${story.id}`}>{story.title}</a></h2><p className="feed-excerpt">A small reflection on building a life and practice with more attention, patience, and room to think.</p><div className="feed-meta"><span>{story.author}</span><i /><span>{story.time}</span><button aria-label={`Save ${story.title}`}>♡</button></div></div></article>)}</div>}
        </section>
        <aside className="feed-sidebar">
          <section><span className="feed-kicker">Recommended topics</span><div className="topic-list" id="topics"><a href="#design">Design</a><a href="#creativity">Creativity</a><a href="#culture">Culture</a><a href="#technology">Technology</a><a href="#life">Life</a></div></section>
          <section className="feed-side-note"><span className="feed-kicker">A note from us</span><h2>Stay curious.<br /><em>Keep going.</em></h2><p>Daily Post is a calmer place for ideas to meet the people who need them.</p><a href="/">About Daily Post ↗</a></section>
          <p className="feed-side-footer">© 2024 Daily Post<br />Read deeply. Write clearly.</p>
        </aside>
      </div>
    </main>
  )
}
