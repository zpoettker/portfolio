import { useEffect, useRef, useState } from 'react'

import iconJS from '../assets/icons/1.png'
import iconHTML from '../assets/icons/2.png'
import iconCSS from '../assets/icons/3.png'
import iconReact from '../assets/icons/4.png'
import iconSQL from '../assets/icons/5.png'
import iconCpp from '../assets/icons/6.png'
import iconMySQL from '../assets/icons/7.png'
import iconExcel from '../assets/icons/8.png'
import iconPython from '../assets/icons/9.png'
import iconNode from '../assets/icons/10.png'
import iconRuby from '../assets/icons/11.png'
import iconGitHub from '../assets/icons/13.png'
import iconWord from '../assets/icons/14.png'
import iconTypeScript from '../assets/icons/15.png'
import iconTailwind from '../assets/icons/16.png'

const TECHNOLOGIES = [
  { name: 'JavaScript', icon: iconJS },
  { name: 'Python', icon: iconPython },
  { name: 'C/C++', icon: iconCpp },
  { name: 'SQL', icon: iconSQL },
  { name: 'TypeScript', icon: iconTypeScript },
  { name: 'HTML', icon: iconHTML },
  { name: 'CSS', icon: iconCSS },
  { name: 'React', icon: iconReact },
  { name: 'Node.js', icon: iconNode },
  { name: 'MySQL', icon: iconMySQL },
  { name: 'Streamlit', icon: iconRuby },
  { name: 'Tailwind CSS', icon: iconTailwind },
  { name: 'GitHub', icon: iconGitHub },
  { name: 'Word', icon: iconWord },
  { name: 'Excel', icon: iconExcel },
]

function useFadeIn(threshold = 0.15) {
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

export default function About() {
  const [sectionRef, sectionVisible] = useFadeIn(0.1)
  const [badgesRef, badgesVisible] = useFadeIn(0.15)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-10 md:px-24 py-24"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-4xl w-full flex flex-col gap-16">

        {/* Section header */}
        <div
          className="flex flex-col gap-3"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-mono text-sm tracking-widest uppercase" style={{ color: '#ffe500' }}>
            Get to know me
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            About Me
          </h2>
          <div className="h-px w-16 mt-1" style={{ backgroundColor: '#ffe500' }} />
        </div>

        {/* Description */}
        <div
          className="flex flex-col gap-5 max-w-2xl"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          }}
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a Computer Science student at Southern Illinois University Edwardsville,
            on track to graduate in 2027. I'm passionate about writing clean, purposeful
            software. I am excited to pursue a career in software engineering, working with 
            intelligent people to create useful technology for the marketplace.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            My background spans systems-level programming and modern web development.
            Whether I'm working close to the metal in C++ or building interfaces in React,
            I care about getting the details right. I'm always looking for new challenges,
            collaborative projects, and opportunities to keep growing as an engineer.
          </p>
        </div>

        {/* Technologies */}
        <div
          ref={badgesRef}
          className="flex flex-col gap-6"
          style={{
            opacity: badgesVisible ? 1 : 0,
            transform: badgesVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          <p className="font-mono text-sm tracking-widest uppercase" style={{ color: '#ffe500' }}>
            Technologies & Languages
          </p>

          <div className="flex flex-wrap gap-3">
            {TECHNOLOGIES.map(({ name, icon, icons }, i) => (
              <span
                key={name}
                className="flex items-center gap-4 px-6 py-4 rounded-xl font-mono text-base text-gray-200 cursor-default select-none"
                style={{
                  backgroundColor: '#1e1e1e',
                  border: '1px solid #2e2e2e',
                  opacity: badgesVisible ? 1 : 0,
                  transform: badgesVisible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.4s ease ${0.1 + i * 0.05}s, transform 0.4s ease ${0.1 + i * 0.05}s, border-color 0.2s, box-shadow 0.2s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#ffe500'
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(255,229,0,0.12)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#2e2e2e'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {icons
                  ? icons.map((src, j) => (
                      <img key={j} src={src} alt="" className="w-9 h-9 object-contain" />
                    ))
                  : icon && <img src={icon} alt={name} className="w-9 h-9 object-contain" />
                }
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}