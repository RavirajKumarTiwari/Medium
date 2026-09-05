import { ArrowUpRight } from './ArrowUpRight'

const sections = ['Overview', 'Colors', 'Typography', 'Buttons', 'Forms', 'Cards']

type DesignSystemSidebarProps = {
  activeSection: string
  onSelect: (section: string) => void
}

export function DesignSystemSidebar({ activeSection, onSelect }: DesignSystemSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-intro">
        <span className="eyebrow">Foundations</span>
        <h1>Design<br /><em>system</em></h1>
        <p>A thoughtful set of tools for crafting calm, clear digital stories.</p>
      </div>
      <nav aria-label="Design system sections">
        {sections.map((section, index) => (
          <button className={`nav-item ${activeSection === section ? 'active' : ''}`} key={section} onClick={() => onSelect(section)}>
            <span className="nav-number">{String(index + 1).padStart(2, '0')}</span>
            <span>{section}</span>
            {activeSection === section && <ArrowUpRight />}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span>Built for</span><strong>Daily Post Editorial</strong><span className="footer-dot" /><span>2024</span>
      </div>
    </aside>
  )
}
