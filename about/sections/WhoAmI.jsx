import SideLabel from '../components/SideLabel.jsx'
import portraitImg from '../../textures/azuka-portrait.png'
import utcBadgeImg from '../../textures/utc-badge.png'

export default function WhoAmI() {
  return (
    <section className="about-section who-am-i">
      <SideLabel text="Who am I?" />

      <div className="who-card">
        <div className="who-card-inner">
          <div className="who-col who-col-bio">
            <h2 className="who-heading">
              Hi, i'm Azuka —{' '}
              <br />
              or{' '}
              <span className="about-brand-mark">&gt;ngoclin.h_</span>
            </h2>
            <p className="who-body">
              Born in Vietnam, currently learning at UTC
              (Trường Đại học Giao thông Vận tải), where I pretend
              to be a normal student by day and break JavaScript by night.
            </p>
          </div>

          <div className="who-divider" aria-hidden="true" />

          <div className="who-col who-col-portrait">
            <div className="portrait-box" aria-label="Portrait placeholder">
              <img
                src={portraitImg}
                alt="Azuka portrait"
                className="portrait-img"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              <div className="portrait-placeholder-label">portrait coming soon</div>
            </div>
            <div className="utc-badge-box">
              <img
                src={utcBadgeImg}
                alt="UTC badge"
                className="utc-badge-img"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
