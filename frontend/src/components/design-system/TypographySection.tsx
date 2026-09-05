import { SectionLabel } from './SectionLabel'

export function TypographySection() {
  return (
    <section className="showcase-section type-section" id="typography">
      <SectionLabel>03 / Typography</SectionLabel>
      <div className="type-grid">
        <div className="type-display"><p className="type-kicker">Display / Canela</p><h2>Thoughts<br /><em>worth</em> sharing.</h2><span className="type-size">88 / 0.96</span></div>
        <div className="type-body"><p className="type-kicker">Body / Inter</p><p>Good design is less about adding more and more about creating the conditions for what matters to be seen.</p><div className="type-meta"><span>18 / 1.6</span><span>Regular</span></div></div>
      </div>
    </section>
  )
}
