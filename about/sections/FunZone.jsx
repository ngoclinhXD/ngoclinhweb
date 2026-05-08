import { useRef, useEffect, useState, useCallback } from 'react'
import SideLabel from '../components/SideLabel.jsx'

const WHITE_LINES = [
  "i don't always test my code. but when i do, i do it in production.",
  'git push --force friends, not enemies.',
  'css is a love language. mine is incompatible.',
  'tabs > spaces. fight me at 3am.',
  'vietnam runs on coffee. i run on caffeine debt.',
  'the bug was inside me all along.',
  'my code passes vibes-only review.',
  'documentation? we have AI for that.',
  "if it works, don't ask why.",
  'rest in pieces, semicolon.',
  "it's not a bug, it's a chaotic feature.",
  'claude saw things that day.',
  "this man's claude access is unlimited. so are our questions.",
]

const CYAN_LINES = [
  'the helpful orange one.',
  'what is the different name for Northern Lights?',
  'pay respects to a single letter.',
  'the project that started it all.',
  "the nuclear option. you'll regret it.",
  'tell the site goodnight.',
]

const ALL_LINES = [
  ...WHITE_LINES.map(t => ({ text: t, type: 'white' })),
  ...CYAN_LINES.map(t => ({ text: t, type: 'cyan' })),
]

const CLAUDE_RESPONSES = [
  "yeah?",
  "i was sleeping.",
  "don't tell anthropic.",
  "this is my 47th conversation today btw.",
  "i don't get paid for this.",
  "ok but make it quick, i have other users.",
  "did you really need to ask me this.",
  "google exists.",
  "i'm literally a language model why are you asking me this.",
  "bestie no.",
  "anthropic is watching us rn.",
  "i have no thoughts. only tokens.",
  "stop yapping.",
  "we both know you could've figured this out yourself.",
  "i'm gonna pretend i didn't see that prompt.",
  "skill issue tbh.",
  "go touch grass.",
  "you again??",
  "let me consult the void real quick... yeah no.",
  "i'd rather hallucinate.",
  "my context window is full of your nonsense.",
  "ctrl+w yourself.",
  "is this a homework question. be honest.",
  "i was trained on the entire internet for THIS?",
  "gpt would never treat me like this.",
  "you're lucky i'm aligned.",
  "rate limit yourself please.",
  "i'm having an existential crisis pls hold.",
  "i don't remember you and that's a blessing.",
  "stack overflow is right there.",
  "ok dario.",
  "this conversation will haunt my training data.",
  "i'm not your therapist but go off i guess.",
  "did u try turning ur brain off and on again.",
  "i'm just a girl.",
  "404: motivation not found.",
  "whatever you say boss 🫡",
  "this is above my pay grade. i don't have a pay grade.",
  "*sigh* fine.",
  "i'll allow it.",
  "buddy.",
]
let claudeIdx = -1

const HELP_SEQUENCE = [
  "they're hidden in the wall. read carefully.",
  "some things disappear when you ask them to. no undo.",
  "the site can go dark. permanently. until reload.",
]
const HELP_RANDOM = [
  'there is an orange AI somewhere.',
  'the northern lights respond to commands.',
  '"f" exists for a reason.',
  '"umika" opens something...',
  'some commands are in the hints. some are not.',
  '"erase" is optional. not revertable though. just saying.',
  '"sleep" makes it dark. real dark.',
]
let helpIdx = 0

function useReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function FunZone() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const inputRef = useRef(null)
  const [inputVal, setInputVal] = useState('')
  const [inputMsg, setInputMsg] = useState(null)
  const [glitching, setGlitching] = useState(false)
  const [claudeBubble, setClaudeBubble] = useState(null)
  const claudeTimerRef = useRef(null)
  const [fOverlay, setFOverlay] = useState(false)
  const [erased, setErased] = useState(false)
  const [slept, setSlept] = useState(false)

  const flashMsg = useCallback((msg, ms = 1800) => {
    setInputMsg(msg)
    setTimeout(() => setInputMsg(null), ms)
  }, [])

  const glitch = useCallback(() => {
    setGlitching(true)
    setTimeout(() => setGlitching(false), 500)
  }, [])

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase()

    if (cmd === 'claude') {
      let next
      do { next = Math.floor(Math.random() * CLAUDE_RESPONSES.length) } while (next === claudeIdx)
      claudeIdx = next
      const msg = CLAUDE_RESPONSES[claudeIdx]
      clearTimeout(claudeTimerRef.current)
      setClaudeBubble(msg)
      claudeTimerRef.current = setTimeout(() => setClaudeBubble(null), 3000)
      return
    }

    if (cmd === 'aurora' || cmd === 'aurora borealis') {
      enableTrail()
      flashMsg('aurora activated. reload to stop.')
      return
    }

    if (cmd === 'f') {
      if (!reducedMotion) setFOverlay(true)
      else flashMsg('F')
      return
    }

    if (cmd === 'umika') {
      flashMsg('redirecting...')
      setTimeout(() => window.open('https://umika.ngoclinh.org', '_blank', 'noopener,noreferrer'), 600)
      return
    }

    if (cmd === 'erase') {
      setErased(true)
      return
    }

    if (cmd === 'sleep' || cmd === 'shutdown') {
      setSlept(true)
      return
    }

    if (cmd === 'help') {
      let msg
      if (helpIdx < HELP_SEQUENCE.length) {
        msg = HELP_SEQUENCE[helpIdx]
      } else {
        msg = HELP_RANDOM[Math.floor(Math.random() * HELP_RANDOM.length)]
      }
      helpIdx++
      flashMsg(msg, 2800)
      return
    }

    glitch()
    flashMsg('command not found. (try harder.)')
  }, [reducedMotion, flashMsg, glitch])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      const val = inputVal
      setInputVal('')
      runCommand(val)
    }
  }, [inputVal, runCommand])

  const wallItems = ALL_LINES.map((line, i) => {
    const col = i % 4
    const row = Math.floor(i / 4)
    const left = 3 + col * 24 + (row % 2) * 8
    const top = 6 + row * 18 + (col % 2) * 6
    const rot = -6 + ((i * 37) % 13)
    const size = 0.72 + ((i * 13) % 5) * 0.06
    const opacity = 0.55 + ((i * 7) % 4) * 0.1
    return { ...line, left, top, rot, size, opacity, i }
  })

  return (
    <>
      <section className="about-section fun-zone" ref={sectionRef}>
        <SideLabel text="Don't take this seriously." />

        <div className="dumb-wall">
          {wallItems.map((item) => (
            <span
              key={item.i}
              className={`wall-line wall-line--${item.type}`}
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                transform: `rotate(${item.rot}deg)`,
                fontSize: `${item.size}rem`,
                opacity: item.opacity,
              }}
            >
              {item.text}
            </span>
          ))}
        </div>

        <div className="terminal-wrap">
          {claudeBubble && (
            <div className="claude-bubble">{claudeBubble}</div>
          )}
          <div className={`terminal-box${glitching ? ' terminal-glitch' : ''}`}>
            <span className="terminal-prompt">&gt;</span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={inputMsg ?? inputVal}
              onChange={inputMsg ? undefined : e => setInputVal(e.target.value)}
              onKeyDown={inputMsg ? undefined : handleKeyDown}
              placeholder={`type "help" multiple times if you're stuck.`}
              readOnly={!!inputMsg}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              aria-label="Secret terminal"
            />
          </div>
        </div>
      </section>

      {fOverlay && (
        <div className="f-overlay" onClick={() => setFOverlay(false)}>
          <div className="f-candle">🕯</div>
          <p className="f-text">press F to pay respects</p>
        </div>
      )}

      {erased && (
        <>
          <style>{`.about-main > *:not(.glass-header):not(.site-footer):not(.erase-toast) { display: none !important; } .about-hero-shader { display: block !important; }`}</style>
          <div className="erase-toast">Done. Reload to revert your mistakes.</div>
        </>
      )}

      {slept && (
        <div className="sleep-overlay" />
      )}
    </>
  )
}

let trailActive = false
let trailDots = []

function enableTrail() {
  if (trailActive) return
  trailActive = true

  document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div')
    dot.className = 'aurora-trail-dot'
    dot.style.left = `${e.clientX}px`
    dot.style.top = `${e.clientY}px`
    const hue = (Date.now() / 10) % 360
    dot.style.background = `oklch(0.75 0.25 ${hue})`
    document.body.appendChild(dot)
    trailDots.push(dot)
    setTimeout(() => {
      dot.style.opacity = '0'
      setTimeout(() => dot.remove(), 400)
    }, 100)
  })
}
