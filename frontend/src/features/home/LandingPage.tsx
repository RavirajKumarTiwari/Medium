import { useEffect, useState } from 'react'
import { getPublicPosts, type Post } from '../../lib/api'
import './landing.css'

function excerpt(content: string) {
  const text = content.replace(/\s+/g, ' ').trim()
  return text.length > 120 ? `${text.slice(0, 120)}...` : text
}

export function LandingPage() {
  const [stories, setStories] = useState<Post[]>([])
  const [loadingStories, setLoadingStories] = useState(true)
  const [storiesError, setStoriesError] = useState('')

  useEffect(() => {
    getPublicPosts()
      .then(setStories)
      .catch((requestError: unknown) => setStoriesError(requestError instanceof Error ? requestError.message : 'Unable to load stories.'))
      .finally(() => setLoadingStories(false))
  }, [])

  return (
    <main className="landing-page">
      <header className="landing-header">
        <a className="landing-brand" href="/" aria-label="Daily Post home"><span>D</span> Daily Post</a>
        <nav aria-label="Primary navigation"><a href="#stories">Explore</a><a href="/signin">Sign in</a><a className="landing-header-cta" href="/signup">Get started <b>↗</b></a></nav>
      </header>
      <section className="landing-hero">
        <div className="landing-hero-copy"><span className="landing-kicker">An independent publishing platform</span><h1>Ideas worth<br /><em>sharing.</em></h1><p>A calmer place for thoughtful stories, honest perspectives, and the people who write them.</p><div className="landing-actions"><a className="landing-primary" href="/signup">Start writing <b>↗</b></a><a className="landing-secondary" href="#stories">Explore stories <span>↓</span></a></div></div>
        <div className="landing-hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-sun" /><span className="hero-art-label">Make room<br />for good ideas.</span></div>
      </section>
      <section className="landing-stories" id="stories"><div className="landing-section-heading"><div><span className="landing-kicker">A few places to begin</span><h2>Stories in <em>focus</em></h2></div><p>Discover thoughtful writing from a growing community of curious people.</p></div>{loadingStories && <p className="landing-stories-state">Loading published stories...</p>}{!loadingStories && storiesError && <p className="landing-stories-state" role="alert">{storiesError}</p>}{!loadingStories && !storiesError && stories.length === 0 && <p className="landing-stories-state">No published stories yet.</p>}{!loadingStories && !storiesError && stories.length > 0 && <div className="landing-story-grid">{stories.map((story) => <article className="landing-story" key={story.id}><a href={`/article/${story.id}`}><div className="landing-story-copy"><span>PUBLISHED STORY</span><h3>{story.title}</h3><p>{excerpt(story.content)} <i /> By {story.author?.name || story.author?.email || 'Daily Post author'}</p></div></a></article>)}</div>}</section>
      <section className="landing-invite"><span className="landing-kicker">Your turn</span><h2>There is room<br />for your <em>voice.</em></h2><a className="landing-primary" href="/signup">Write your first story <b>↗</b></a></section>
      <footer className="landing-footer"><span>Daily Post</span><span>Read deeply. Write clearly. <b>✦</b></span></footer>
    </main>
  )
}
