import { useEffect, useRef, useState } from 'react'

// Sign up at formspree.io, create a form, and replace YOUR_FORM_ID below
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykvkegw'

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

export default function Contact() {
  const [sectionRef, visible] = useFadeIn(0.08)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    backgroundColor: '#1a1a1a',
    border: '1px solid #2a2a2a',
    color: '#e5e5e5',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  function onFocus(e) {
    e.currentTarget.style.borderColor = 'rgba(255,229,0,0.5)'
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,229,0,0.07)'
  }
  function onBlur(e) {
    e.currentTarget.style.borderColor = '#2a2a2a'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-10 md:px-24 py-24"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-2xl w-full flex flex-col gap-12">

        {/* Section header */}
        <div
          className="flex flex-col gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="font-mono text-sm tracking-widest uppercase" style={{ color: '#ffe500' }}>
            Get in touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Contact</h2>
          <div className="h-px w-16 mt-1" style={{ backgroundColor: '#ffe500' }} />
          <p className="text-gray-400 text-base leading-relaxed mt-2">
            Have a question, opportunity, or just want to say hi? Send me a message and I'll get back to you.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
          }}
        >
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className="px-4 py-3 rounded-xl text-sm placeholder-gray-600"
                style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className="px-4 py-3 rounded-xl text-sm placeholder-gray-600"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-gray-400">Message</label>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="What's on your mind?"
              value={form.message}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="px-4 py-3 rounded-xl text-sm placeholder-gray-600 resize-none"
              style={inputStyle}
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-5 flex-wrap">
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ backgroundColor: '#ffe500', color: '#161616' }}
            >
              {status === 'sending' ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                  Sending…
                </>
              ) : status === 'success' ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Sent!
                </>
              ) : (
                <>
                  Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                </>
              )}
            </button>

            {status === 'error' && (
              <p className="text-sm font-mono" style={{ color: '#ff6b6b' }}>
                Something went wrong — try again or email me directly.
              </p>
            )}
          </div>
        </form>

        {/* Direct email link */}
        <div
          className="flex items-center gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.3s',
          }}
        >
          <div className="h-px flex-1" style={{ backgroundColor: '#2a2a2a' }} />
          <a
            href="mailto:poettkerzach@gmail.com"
            className="text-sm font-mono transition-colors duration-200 hover:underline"
            style={{ color: '#ffe500' }}
          >
            poettkerzach@gmail.com
          </a>
          <div className="h-px flex-1" style={{ backgroundColor: '#2a2a2a' }} />
        </div>

      </div>
    </section>
  )
}
