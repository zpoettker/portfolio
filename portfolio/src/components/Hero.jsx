import { useEffect, useState, useCallback } from 'react'
import headshotImg from '../assets/headshot.webp'

const LABEL_A = "Hello,"
const LABEL_B = " I'm"
const NAME = "Zach Poettker"
const TYPE_SPEED = 80
const PRE_DELAY = 700     // blink before typing starts
const COMMA_PAUSE = 420   // pause after "Hello,"
const HOLD_DELAY = 0    // blink after name finishes
const CURSOR_FADE = 250   // cursor fade duration
const REDO_DELAY = 500    // redo button appears after content fades in

// phases: pre | label-a | pause | label-b | name | hold | fade | done
function initialState() {
  return {
    phase: 'pre',
    labelText: '',
    nameText: '',
    cursorOpacity: 1,
    contentVisible: false,
    redoVisible: false,
    skipTransition: true,
  }
}

export default function Hero() {
  const [state, setState] = useState(initialState)
  const { phase, labelText, nameText, cursorOpacity, contentVisible, redoVisible, skipTransition } = state

  const set = (patch) => setState(prev => ({ ...prev, ...patch }))

  const reset = useCallback(() => setState(initialState()), [])

  // Pre — blink cursor before typing
  useEffect(() => {
    if (phase !== 'pre') return
    const t = setTimeout(() => set({ phase: 'label-a' }), PRE_DELAY)
    return () => clearTimeout(t)
  }, [phase])

  // Type "Hello,"
  useEffect(() => {
    if (phase !== 'label-a') return
    if (labelText.length < LABEL_A.length) {
      const t = setTimeout(() => set({ labelText: LABEL_A.slice(0, labelText.length + 1) }), TYPE_SPEED)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => set({ phase: 'pause' }), 0)
    return () => clearTimeout(t)
  }, [phase, labelText])

  // Pause after "Hello,"
  useEffect(() => {
    if (phase !== 'pause') return
    const t = setTimeout(() => set({ phase: 'label-b' }), COMMA_PAUSE)
    return () => clearTimeout(t)
  }, [phase])

  // Type " I'm"
  useEffect(() => {
    if (phase !== 'label-b') return
    const full = LABEL_A + LABEL_B
    if (labelText.length < full.length) {
      const t = setTimeout(() => set({ labelText: full.slice(0, labelText.length + 1) }), TYPE_SPEED)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => set({ phase: 'name' }), 0)
    return () => clearTimeout(t)
  }, [phase, labelText])

  // Type name
  useEffect(() => {
    if (phase !== 'name') return
    if (nameText.length < NAME.length) {
      const t = setTimeout(() => set({ nameText: NAME.slice(0, nameText.length + 1) }), TYPE_SPEED)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => set({ phase: 'hold' }), 0)
    return () => clearTimeout(t)
  }, [phase, nameText])

  // Hold, then fade cursor, then show content
  useEffect(() => {
    if (phase !== 'hold') return
    const t = setTimeout(() => {
      set({ phase: 'fade', cursorOpacity: 0 })
      setTimeout(() => {
        set({ phase: 'done', contentVisible: true, skipTransition: false })
      }, CURSOR_FADE)
    }, HOLD_DELAY)
    return () => clearTimeout(t)
  }, [phase])

  // Fix: REDO_DELAY should be ms not seconds
  useEffect(() => {
    if (!contentVisible) return
    const t = setTimeout(() => set({ redoVisible: true }), REDO_DELAY)
    return () => clearTimeout(t)
  }, [contentVisible])

  const showCursor = phase !== 'done'
  const cursorOnLabel = phase === 'label-a' || phase === 'pause' || phase === 'label-b'
  const cursorOnName = phase === 'name' || phase === 'hold' || phase === 'fade'
  const cursorBlinking = phase === 'pre' || phase === 'pause' || phase === 'hold'

  const cursor = (width, height, marginLeft) => (
    <span
      style={{
        display: 'inline-block',
        width,
        height,
        backgroundColor: '#ffe500',
        marginLeft,
        verticalAlign: 'middle',
        animation: cursorBlinking ? 'blink 0.7s step-end infinite' : 'none',
        opacity: cursorOpacity,
        transition: `opacity ${CURSOR_FADE}ms ease`,
      }}
    />
  )

  return (
    <section className="min-h-screen flex items-center justify-center px-10 md:px-24 relative" style={{ backgroundColor: '#161616' }}>
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* Left — Headshot */}
        <div className="flex justify-center md:justify-end">
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              width: '460px',
              height: '560px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
            }}
          >
            <img
              src={headshotImg}
              alt="Zach Poettker"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right — Text */}
        <div className="flex flex-col items-start text-left gap-6">

          {/* Label line */}
          <p className="font-mono text-base tracking-widest uppercase" style={{ color: '#ffe500' }}>
            {labelText || ' '}
            {showCursor && cursorOnLabel && cursor('2px', '1em', '2px')}
            {showCursor && phase === 'pre' && cursor('2px', '1em', '0px')}
          </p>

          {/* Name line */}
          <h1 className="text-6xl sm:text-7xl font-bold text-white leading-tight">
            {nameText || ' '}
            {showCursor && cursorOnName && cursor('3px', '0.85em', '4px')}
          </h1>

          {/* Subtitle, description, buttons — fade in when done */}
          <div
            className="flex flex-col gap-6"
            style={{ opacity: contentVisible ? 1 : 0, transition: skipTransition ? 'none' : 'opacity 2.5s ease' }}
          >
            <h2 className="text-3xl font-semibold text-gray-300">
              Motivated Software Engineer
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              CS student at SIUE building clean, purposeful software. Expected graduation 2027.
            </p>

            <div className="flex gap-5 flex-wrap items-center">
              <a
                href="#projects"
                className="px-8 py-4 text-base font-semibold rounded-lg transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                style={{ backgroundColor: '#ffe500', color: '#161616' }}
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-4 text-base font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: '1.5px solid #ffe500', color: '#ffe500', backgroundColor: 'transparent' }}
              >
                Get In Touch
              </a>
            </div>

            {/* Redo button */}
            <div style={{ opacity: redoVisible ? 1 : 0, transition: 'opacity 0.4s ease' }}>
              <button
                onClick={reset}
                aria-label="Replay animation"
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:brightness-125 hover:-translate-y-0.5"
                style={{ backgroundColor: '#2a2a2a', color: '#6b7280', border: '1px solid #333' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs animate-bounce">
        <span>Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}