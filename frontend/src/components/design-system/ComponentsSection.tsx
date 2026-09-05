import { ArrowUpRight } from './ArrowUpRight'
import { SectionLabel } from './SectionLabel'

export function ComponentsSection() {
  return (
    <section className="showcase-section components-section" id="buttons">
      <SectionLabel>04 / Components</SectionLabel>
      <div className="component-grid">
        <div className="component-block"><p className="type-kicker">Buttons</p><div className="button-row"><button className="button button-primary">Start writing <ArrowUpRight /></button><button className="button button-secondary">Explore stories</button><button className="icon-button" aria-label="Save story">♡</button></div></div>
        <div className="component-block form-demo" id="forms"><p className="type-kicker">Text input</p><label htmlFor="email">Your email address</label><div className="input-wrap"><input id="email" type="email" placeholder="reader@example.com" /><span>→</span></div></div>
      </div>
    </section>
  )
}
