import './landing.css'

const stories = [
  { category: 'CREATIVE PRACTICE', title: 'The quiet power of showing up', author: 'Alex Rivera', time: '6 min read', color: 'sunrise' },
  { category: 'CULTURE & TECH', title: 'Notes from a less busy life', author: 'Maya Chen', time: '4 min read', color: 'green' },
  { category: 'IDEAS', title: 'What makes an idea worth sharing?', author: 'Jon Bell', time: '8 min read', color: 'clay' },
]

export function LandingPage() {
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
      <section className="landing-stories" id="stories"><div className="landing-section-heading"><div><span className="landing-kicker">A few places to begin</span><h2>Stories in <em>focus</em></h2></div><p>Discover thoughtful writing from a growing community of curious people.</p></div><div className="landing-story-grid">{stories.map((story) => <article className="landing-story" key={story.title}><div className={`landing-story-art ${story.color}`}><span>{story.category === 'IDEAS' ? 'Worth<br />keeping' : story.color === 'green' ? 'A slower<br />internet' : 'Field<br />notes'}</span></div><div className="landing-story-copy"><span>{story.category}</span><h3>{story.title}</h3><p>By {story.author} <i /> {story.time}</p></div></article>)}</div></section>
      <section className="landing-invite"><span className="landing-kicker">Your turn</span><h2>There is room<br />for your <em>voice.</em></h2><a className="landing-primary" href="/signup">Write your first story <b>↗</b></a></section>
      <footer className="landing-footer"><span>Daily Post</span><span>Read deeply. Write clearly. <b>✦</b></span></footer>
    </main>
  )
}
