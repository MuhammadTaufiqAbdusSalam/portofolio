import { useState, useEffect } from 'react'

const typingTexts = [
  'Full Stack Developer',
  'Laravel Enthusiast',
  'GIS & Data Visualizer',
  'AI Integration Expert',
  'Problem Solver',
]

function useTyping() {
  const [text, setText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = typingTexts[textIndex]
    let delay = isDeleting ? 60 : 100

    if (!isDeleting && charIndex === current.length) {
      delay = 2000
    } else if (isDeleting && charIndex === 0) {
      delay = 400
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, charIndex + 1))
        setCharIndex(c => c + 1)
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setText(current.substring(0, charIndex - 1))
        setCharIndex(c => c - 1)
        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setTextIndex(i => (i + 1) % typingTexts.length)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, textIndex])

  return text
}

const floatingDots = [
  { top: '20%', right: '10%',  size: 10, delay: '0s',  opacity: 0.5 },
  { top: '60%', right: '5%',  size: 7,  delay: '1s',  opacity: 0.3 },
  { bottom: '25%', left: '8%', size: 14, delay: '2s',  opacity: 0.25 },
  { top: '40%', left: '5%',   size: 7,  delay: '3s',  opacity: 0.4 },
  { top: '75%', left: '20%',  size: 5,  delay: '1.5s',opacity: 0.3 },
  { top: '15%', left: '30%',  size: 6,  delay: '2.5s',opacity: 0.35 },
]

export default function Hero() {
  const typedText = useTyping()

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 40%, rgba(212,160,23,0.12) 0%, transparent 65%),
                     radial-gradient(ellipse at 20% 80%, rgba(255,154,0,0.06) 0%, transparent 50%),
                     radial-gradient(ellipse at 80% 10%, rgba(212,160,23,0.06) 0%, transparent 50%),
                     #0a0a0f`,
      }}
    >
      {/* Deco circles */}
      <div className="deco-circle" style={{ width: 700, height: 700, top: -250, right: -250 }} />
      <div className="deco-circle" style={{ width: 500, height: 500, bottom: -150, left: -150 }} />

      {/* Floating dots */}
      {floatingDots.map((d, i) => (
        <div key={i} className="absolute rounded-full animate-float" style={{
          ...d, width: d.size, height: d.size,
          background: '#f5c842', animationDelay: d.delay,
        }} />
      ))}

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        {/* All content centered */}
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          {/* <div className="badge mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse inline-block"></span>
            Available for work
          </div> */}

          {/* Subtitle */}
          <p className="text-gold-400 font-semibold tracking-widest text-sm uppercase mb-5">
            Hello, I'm
          </p>

          {/* Main Title */}
          <h1 className="text-5xl lg:text-8xl font-display font-bold leading-tight mb-6">
            <span className="text-gold-gradient">Muhammad Taufiq Abdus Salam</span>
          </h1>

          {/* Typing animation */}
          <div className="text-xl lg:text-2xl text-gray-300 mb-6 flex items-center justify-center h-9">
            <span>{typedText}</span>
            <span className="typing-cursor"></span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl">
            Passionate Full Stack Developer yang berfokus membangun aplikasi web modern,
            scalable, dan user-friendly dengan teknologi terkini.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button onClick={() => scrollTo('projects')} className="btn-gold">
              <i className="fas fa-briefcase mr-2"></i>View My Work
            </button>
            <button onClick={() => scrollTo('contact')} className="btn-outline">
              <i className="fas fa-envelope mr-2"></i>Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center">
            {[
              { href: 'https://github.com/MuhammadTaufiqAbdusSalam', icon: 'fab fa-github', label: 'GitHub' },
              { href: 'https://linkedin.com/in/muhammad-taufiq-319340361/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
              // { href: 'https://instagram.com/', icon: 'fab fa-instagram', label: 'Instagram' },
              { href: 'mailto:muhammadtaufiqabdussalam12@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="social-link" aria-label={s.label}>
                <i className={s.icon}></i>
              </a>
            ))}
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-8 mt-14 pt-10 w-full"
            style={{ borderTop: '1px solid rgba(212,160,23,0.15)' }}>
            {[
              // { icon: 'fas fa-code', value: '2+ Years', label: 'Experience' },
              // { icon: 'fas fa-check-circle', value: '10+ Projects', label: 'Completed' },
              // { icon: 'fas fa-users', value: '5+ Clients', label: 'Happy Clients' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}>
                  <i className={`${stat.icon} text-gold-400 text-sm`}></i>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 animate-pulse" style={{ background: 'linear-gradient(to bottom, #d4a017, transparent)' }} />
      </div> */}
    </section>
  )
}
