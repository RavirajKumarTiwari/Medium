export function DesignSystemHeader() {
  return (
    <header className="topbar">
      <a className="brand" href="/design-system" aria-label="Daily Post home">
        <span className="brand-mark">D</span>
        <span>Daily Post</span>
      </a>
      <div className="topbar-meta">
        <span className="version-pill">V 1.0</span>
        <span className="divider" />
        <span className="saved-state"><i /> All changes saved</span>
        <button className="avatar" aria-label="Open account menu">AR</button>
      </div>
    </header>
  )
}
