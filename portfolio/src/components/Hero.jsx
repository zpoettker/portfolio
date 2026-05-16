export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Headshot — replace src with your photo in src/assets/ */}
      <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-teal-400 mb-8 shadow-lg shadow-teal-400/20">
        <img
          src="/headshot.webp"
          alt="Zach Poettker"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.classList.add('bg-gray-700', 'flex', 'items-center', 'justify-center')
            e.target.parentElement.innerHTML = '<span class="text-4xl text-gray-400">Z</span>'
          }}
        />
      </div>

      <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-3">
        Hello, I'm Zach.
      </p>

      <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4">
        Passionate{' '}
        <span className="text-teal-400">Software Engineer</span>
      </h1>

      <p className="text-gray-400 text-lg max-w-md mb-10">
        CS student at SIUE building clean, purposeful software.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="#projects"
          className="px-6 py-3 bg-teal-400 text-gray-900 font-semibold rounded-lg hover:bg-teal-300 transition-colors duration-200"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-teal-400 text-teal-400 font-semibold rounded-lg hover:bg-teal-400/10 transition-colors duration-200"
        >
          Get In Touch
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-gray-500 text-xs animate-bounce">
        <span>Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}