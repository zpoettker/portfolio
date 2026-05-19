import { useEffect, useRef, useState } from 'react'

// Drop resume-preview.png and resume.pdf into the public/ folder

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

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-3xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-4 -right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full text-gray-300 hover:text-white transition-colors duration-150"
          style={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-4 h-4">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <img
          src={src}
          alt="Resume"
          className="w-full h-full object-contain rounded-xl shadow-2xl"
          style={{ maxHeight: '88vh' }}
        />
      </div>
    </div>
  )
}

export default function Resume() {
  const [sectionRef, visible] = useFadeIn(0.1)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const resumeImg = '/Resume.png'

  return (
    <>
      {lightboxOpen && resumeImg && (
        <Lightbox src={resumeImg} onClose={() => setLightboxOpen(false)} />
      )}

      <section
        id="resume"
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center px-10 md:px-24 py-24"
        style={{ backgroundColor: '#161616' }}
      >
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left — Resume preview */}
          <div
            className="flex justify-center md:justify-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <button
              onClick={() => resumeImg && setLightboxOpen(true)}
              aria-label="Enlarge resume"
              className="group relative overflow-hidden rounded-xl focus:outline-none"
              style={{
                width: '460px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                cursor: resumeImg ? 'pointer' : 'default',
              }}
            >
              {resumeImg ? (
                <img
                  src={resumeImg}
                  alt="Resume preview"
                  className="w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                /* Placeholder shown until resume.png is added */
                <div
                  className="w-full rounded-xl flex flex-col items-center justify-center gap-3 text-gray-600"
                  style={{ height: '440px', backgroundColor: '#1e1e1e', border: '1px dashed #333' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <span className="text-sm font-mono">Add resume.png to src/assets/</span>
                </div>
              )}

              {/* Hover overlay */}
              {resumeImg && (
                <div
                  className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#ffe500', border: '1px solid #ffe500' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
                      <path d="M15 3h6v6M10 14 21 3M21 21H3V3" />
                    </svg>
                    Click to enlarge
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Right — Text & buttons */}
          <div
            className="flex flex-col items-start text-left gap-7"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}
          >
            <div className="flex flex-col gap-3">
              <p className="font-mono text-sm tracking-widest uppercase" style={{ color: '#ffe500' }}>
                My experience
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">Resume</h2>
              <div className="h-px w-16 mt-1" style={{ backgroundColor: '#ffe500' }} />
            </div>

            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              A snapshot of my education, experience, and skills. Click the preview to
              enlarge, or grab a copy below.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Download */}
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-3 px-6 py-3 font-semibold rounded-lg transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                style={{ backgroundColor: '#ffe500', color: '#161616' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>

              {/* Open PDF */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: '1.5px solid #ffe500', color: '#ffe500', backgroundColor: 'transparent' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Open PDF
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}