import { useEffect } from 'react'
import PillHeader from './components/PillHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Hero from './sections/Hero.jsx'
import WhoAmI from './sections/WhoAmI.jsx'
import Skills from './sections/Skills.jsx'
import Projects from './sections/Projects.jsx'
import FunZone from './sections/FunZone.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('.about-section:not(.about-hero)')
    if (!sections.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="about-page">
      <PillHeader />
      <main className="about-main">
        <Hero />
        <WhoAmI />
        <Skills />
        <Projects />
        <FunZone />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
