import { SectionLabel } from './SectionLabel'

const swatches = [
  ['Paper', '#F7F5F0', 'swatch-paper'],
  ['Ink', '#22211F', 'swatch-ink'],
  ['Clay', '#B96045', 'swatch-clay'],
  ['Sage', '#AAB5A0', 'swatch-sage'],
  ['Stone', '#E4E1DA', 'swatch-stone'],
]

export function ColorsSection() {
  return (
    <section className="showcase-section" id="colors">
      <SectionLabel>02 / Colors</SectionLabel>
      <div className="section-heading"><h2>A softer <em>palette</em></h2><p>Grounded neutrals with a terracotta note for moments that matter.</p></div>
      <div className="swatches">
        {swatches.map(([name, value, className]) => <div className={`swatch ${className}`} key={name}><span>{name}</span><small>{value}</small></div>)}
      </div>
    </section>
  )
}
