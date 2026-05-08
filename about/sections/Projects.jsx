import SideLabel from '../components/SideLabel.jsx'

export default function Projects() {
  return (
    <section className="about-section projects-section">
      <SideLabel text="What i make." />

      <div className="projects-grid">
        <a
          href="https://umika.ngoclinh.org"
          target="_blank"
          rel="noopener noreferrer"
          className="project-panel project-umika"
        >
          <div className="umika-content">
            <div className="umika-logo-wrap">
              <span className="umika-logo-text">UMIKA</span>
            </div>
            <p className="umika-tagline">
              the AI assistant i built so i'd stop googling things at 3am.
            </p>
            <span className="umika-cta">visit umika.ngoclinh.org →</span>
          </div>
          <img
            src="../textures/umi_happi.png"
            alt=""
            aria-hidden="true"
            className="umika-char"
          />
          <div className="umika-tags-overlay">
            <span className="project-tag project-tag--claude">Claude API</span>
            <span className="project-tag">Groq</span>
            <span className="project-tag">Cloudflare D1</span>
            <span className="project-tag">built solo</span>
          </div>
        </a>

        <div className="project-panel project-placeholder project-placeholder-a">
          <div className="placeholder-content">
            <span className="placeholder-glitch">loading_next_experiment...</span>
          </div>
        </div>

        <div className="project-panel project-placeholder project-placeholder-b">
          <div className="placeholder-content">
            <span className="placeholder-mark">?</span>
            <span className="placeholder-hint">coming soon</span>
          </div>
        </div>
      </div>
    </section>
  )
}
