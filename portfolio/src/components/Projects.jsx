import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: 'Job Market Intelligence',
    description:
      'Full-stack analytics platform that ingests and analyzes 100k+ real job listings to surface skill demand trends, salary insights, and hiring patterns across the tech industry.',
    tags: ['Python', 'Flask', 'MySQL', 'Streamlit'],
    href: 'https://github.com/zpoettker/job-market-intelligence',
  },
  {
    title: 'Trading Journal',
    description:
      'A personal trade-logging app for tracking entries, exits, and performance over time. Built to sharpen discipline and identify patterns in trading decisions.',
    tags: ['JavaScript', 'HTML/CSS'],
    href: 'https://github.com/zpoettker/Trading-JOURNAL',
  },
  {
    title: 'Stock Analysis App',
    description:
      'A browser-based tool for forming market hypotheses and structuring trade plans. Visualizes price data and helps build conviction before entering a position.',
    tags: ['HTML', 'JavaScript', 'CSS'],
    href: 'https://github.com/zpoettker/Stock-Analysis',
  },
  {
    title: 'Castle Crashers CYOA',
    description:
      'An interactive choose-your-own-adventure game set in a fantasy world. Players navigate branching story paths with meaningful choices that lead to different outcomes.',
    tags: ['JavaScript', 'HTML/CSS'],
    href: 'https://github.com/zpoettker/Castle-Crashers-CYOA',
  },
]

function useStaggeredFadeIn(threshold = 0.1) {
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

function ProjectCard({ project, index, visible }) {
  return (
    <div
      className="flex flex-col rounded-2xl p-7 gap-5 transition-all duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #2a2a2a',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s, box-shadow 0.2s ease, border-color 0.2s ease`,
        boxShadow: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255, 229, 0, 0.3)'
        e.currentTarget.style.boxShadow = '0 0 24px rgba(255, 229, 0, 0.06)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#2a2a2a'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Card top */}
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
          style={{ backgroundColor: 'rgba(255, 229, 0, 0.1)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffe500" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z" />
          </svg>
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} on GitHub`}
          className="text-gray-600 hover:text-gray-300 transition-colors duration-150 flex-shrink-0 mt-0.5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-white font-semibold text-lg leading-snug">{project.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="text-xs font-mono px-2.5 py-1 rounded-md"
            style={{ backgroundColor: '#242424', color: '#ffe500', border: '1px solid rgba(255,229,0,0.2)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm font-semibold self-start px-5 py-2.5 rounded-lg transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 mt-auto"
        style={{ backgroundColor: '#ffe500', color: '#161616' }}
      >
        View Project
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  )
}

export default function Projects() {
  const [sectionRef, visible] = useStaggeredFadeIn(0.08)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-10 md:px-24 py-24"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-5xl w-full flex flex-col gap-14">

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
            What I've built
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Projects</h2>
          <div className="h-px w-16 mt-1" style={{ backgroundColor: '#ffe500' }} />
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} visible={visible} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div
          className="flex justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.6s ease ${projects.length * 0.12 + 0.1}s`,
          }}
        >
          <a
            href="https://github.com/zpoettker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
            style={{ border: '1.5px solid #ffe500', color: '#ffe500', backgroundColor: 'transparent' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            See more on GitHub
          </a>
        </div>

      </div>
    </section>
  )
}