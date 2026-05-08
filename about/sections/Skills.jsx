import SideLabel from '../components/SideLabel.jsx'

const buckets = [
  {
    label: 'things i actually know',
    chips: [
      'JavaScript', 'React', 'CSS', 'HTML', 'Python',
      'Node', 'Cloudflare Workers', 'Claude API', 'Groq API', 'Git',
      'C/C++', 'C#', 'Java', 'Kotlin', 'Swift', 'SQL',
    ],
    mod: 'bucket-know',
  },
  {
    label: "things i'm getting better at",
    chips: [
      'TypeScript', 'WebGL', 'shaders', 'Three.js', 'Vulkan',
      'Rust', 'OpenGL', 'motion design', 'illustration',
    ],
    mod: 'bucket-learning',
  },
  {
    label: "things i won't put on linkedin",
    chips: [
      'summoning Claude in 3 prompts',
      'professional 3am committer',
      'gradient enthusiast',
      'Vietnamese caffeine processing',
      'anime portrait → working site pipeline',
      'fluent in CSS (only when angry)',
      'Stack Overflow archaeologist',
      'vibe-driven debugging',
      'ships before reading the docs',
    ],
    mod: 'bucket-vibes',
  },
]

const BRAND_COLORS = {
  'JavaScript':         '#F7DF1E',
  'React':              '#61DAFB',
  'CSS':                '#2965F1',
  'HTML':               '#E34F26',
  'Python':             '#3776AB',
  'Node':               '#5FA04E',
  'Cloudflare Workers': '#F38020',
  'Claude API':         '#D97757',
  'Groq API':           '#F55036',
  'Git':                '#F05032',
  'C/C++':              '#00599C',
  'C#':                 '#512BD4',
  'Java':               '#ED8B00',
  'Kotlin':             '#7F52FF',
  'Swift':              '#F05138',
  'SQL':                '#336791',
  'TypeScript':         '#3178C6',
  'Rust':               '#CE412B',
  'OpenGL':             '#5586A4',
  'Three.js':           '#049EF4',
}

const ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4, -1, 3, -4, 2]

export default function Skills() {
  return (
    <section className="about-section skills-section">
      <SideLabel text="What can i do?" />

      <div className="skills-buckets">
        {buckets.map((bucket, bi) => (
          <div key={bi} className={`skill-bucket ${bucket.mod}`}>
            <h3 className="bucket-label">{bucket.label}</h3>
            <div className="chip-cloud">
              {bucket.chips.map((chip, ci) => {
                const rot = ROTATIONS[(bi * 4 + ci) % ROTATIONS.length]
                const isVulkan = chip === 'Vulkan'
                const brandColor = BRAND_COLORS[chip]
                return (
                  <span
                    key={ci}
                    className={`skill-chip${isVulkan ? ' chip-vulkan' : ''}`}
                    style={{ '--rot': `${rot}deg`, ...(brandColor && { '--chip-color': brandColor }) }}
                    data-text={chip}
                  >
                    {chip}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
