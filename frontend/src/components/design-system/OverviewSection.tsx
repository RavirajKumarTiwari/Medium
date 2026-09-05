import { SectionLabel } from './SectionLabel'

export function OverviewSection() {
  return (
    <section className="hero-section" id="overview">
      <SectionLabel>01 / Overview</SectionLabel>
      <div className="hero-copy">
        <div>
          <h2>Make space<br />for <em>good</em> ideas.</h2>
          <p className="lede">An editorial language built around the belief that the best interfaces are the ones that get out of the way.</p>
        </div>
        <div className="hero-note"><span className="note-line" /><p>Quiet by design.<br />Distinct by nature.</p></div>
      </div>
      <div className="principles">
        <article><span>01</span><h3>Clarity</h3><p>Every choice should help the reader move forward.</p></article>
        <article><span>02</span><h3>Warmth</h3><p>Human details turn a product into a place.</p></article>
        <article><span>03</span><h3>Restraint</h3><p>Leave room for the words, and the people behind them.</p></article>
      </div>
    </section>
  )
}
