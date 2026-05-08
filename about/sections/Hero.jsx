import { GrainGradient } from '@paper-design/shaders-react'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Hero() {
  return (
    <section className="about-hero">
      <div className="about-hero-shader">
        <GrainGradient
          colorBack="#000000"
          colors={['#7300ff', '#eba8ff', '#00bfff', '#2b00ff']}
          softness={0.5}
          intensity={0.5}
          noise={0.25}
          shape="corners"
          speed={prefersReducedMotion ? 0 : 1}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="about-hero-content">
        <h1 className="about-hero-headline">
          Hello, it's{' '}
          <span className="about-brand-mark">&gt;ngoclin.h_</span>
        </h1>
        <p className="about-hero-tagline">
          <span className="tagline-bracket">[</span>
          {' '}Developer{' '}
          <span className="tagline-dot">•</span>
          {' '}Designer{' '}
          <span className="tagline-dot">•</span>
          {' '}Chaotically Creative{' '}
          <span className="tagline-bracket">]</span>
        </p>
      </div>

      <div className="about-scroll-cue" aria-hidden="true">
        <span className="scroll-chevron">»</span>
      </div>
    </section>
  )
}
