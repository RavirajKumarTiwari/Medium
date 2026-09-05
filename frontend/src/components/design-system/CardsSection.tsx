import { ArrowUpRight } from './ArrowUpRight'
import { SectionLabel } from './SectionLabel'

export function CardsSection() {
  return (
    <section className="showcase-section cards-section" id="cards">
      <SectionLabel>05 / Cards</SectionLabel>
      <div className="section-heading card-heading"><h2>Stories in <em>focus</em></h2><a href="#overview">View all <ArrowUpRight /></a></div>
      <div className="story-grid">
        <article className="story-card"><div className="story-art art-sunrise"><span>Field<br />notes</span></div><div className="story-details"><span className="story-tag">CREATIVE PRACTICE</span><h3>The quiet power of showing up</h3><p>By Alex Rivera <i /> 6 min read</p></div></article>
        <article className="story-card"><div className="story-art art-green"><span>A slower<br />internet</span></div><div className="story-details"><span className="story-tag">CULTURE &amp; TECH</span><h3>Notes from a less busy life</h3><p>By Maya Chen <i /> 4 min read</p></div></article>
      </div>
    </section>
  )
}
