import { useEffect, useState } from 'react'
import './App.css'
import { CardsSection } from './components/design-system/CardsSection'
import { ColorsSection } from './components/design-system/ColorsSection'
import { ComponentsSection } from './components/design-system/ComponentsSection'
import { DesignSystemHeader } from './components/design-system/DesignSystemHeader'
import { DesignSystemSidebar } from './components/design-system/DesignSystemSidebar'
import { OverviewSection } from './components/design-system/OverviewSection'
import { TypographySection } from './components/design-system/TypographySection'
import { AuthPage } from './features/auth/AuthPage'
import { LandingPage } from './features/home/LandingPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { ArticleReaderPage } from './features/article/ArticleReaderPage'
import { EditorPage } from './features/editor/EditorPage'
import { FeedPage } from './features/feed/FeedPage'
import { StudioPage } from './features/studio/StudioPage'

export default function App() {
  const [activeSection, setActiveSection] = useState('Overview')
  const path = window.location.pathname
  useEffect(() => {
    document.title = path === '/studio' ? 'Daily Post — Creator Studio' : path === '/feed' ? 'Daily Post — Home' : path === '/write' || path.startsWith('/edit/') ? 'Daily Post — Write' : path.startsWith('/article/') ? 'Daily Post — Article' : path === '/design-system' ? 'Daily Post — Design System' : path === '/dashboard' ? 'Daily Post — Your stories' : path === '/signup' ? 'Daily Post — Create account' : path === '/signin' ? 'Daily Post — Sign in' : 'Daily Post — Ideas worth sharing'
  }, [path])

  if (path === '/signin') return <AuthPage initialMode="signin" />
  if (path === '/signup') return <AuthPage initialMode="signup" />
  if (path === '/dashboard') return <DashboardPage />
  if (path === '/write') return <EditorPage />
  if (path === '/feed') return <FeedPage />
  if (path === '/studio') return <StudioPage />
  if (path.startsWith('/edit/')) return <EditorPage postId={decodeURIComponent(path.slice('/edit/'.length))} />
  if (path.startsWith('/article/')) return <ArticleReaderPage id={decodeURIComponent(path.slice('/article/'.length))} />
  if (path !== '/design-system') return <LandingPage />

  const handleSectionClick = (section: string) => {
    setActiveSection(section)
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app-shell">
      <DesignSystemHeader />
      <div className="layout">
        <DesignSystemSidebar activeSection={activeSection} onSelect={handleSectionClick} />
        <main className="content">
          <OverviewSection />
          <ColorsSection />
          <TypographySection />
          <ComponentsSection />
          <CardsSection />
          <footer className="content-footer"><span>Daily Post / Design system</span><span>Made with intention <b>✦</b></span></footer>
        </main>
      </div>
    </div>
  )
}
