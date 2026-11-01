import { useEffect, useRef, useState } from 'react'
import profileImg from '../assets/profile.jpeg'

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function useCounter(target, visible) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!visible) return
    let current = 0
    const inc = target / 50
    const timer = setInterval(() => {
      current += inc
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 40)
    return () => clearInterval(timer)
  }, [visible, target])
  return count
}

const stats = [
  // { label: 'Projects Completed', count: 10 },
  // { label: 'Years Experience', count: 2 },
  // { label: 'Certifications', count: 3 },
]

function StatCard({ label, count, visible }) {
  const n = useCounter(count, visible)
  return (
    <div className="glass-card p-6 text-center">
      <p className="stat-number">{n}+</p>
      <p className="text-gray-400 mt-2">{label}</p>
    </div>
  )
}

export default function About() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()
  const [ref3, v3] = useReveal()
  const [ref4, v4] = useReveal()

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div ref={ref1} className={`text-center mb-16 reveal ${v1 ? 'visible' : ''}`}>
          <p className="text-gold-400 font-semibold tracking-widest text-sm uppercase mb-3">Get To Know</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold section-title inline-block">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div ref={ref2} className={`reveal ${v2 ? 'visible' : ''} relative`}>
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(212,160,23,0.2), rgba(255,154,0,0.1))', border: '1px solid rgba(212,160,23,0.2)' }} />
              <img src={profileImg} alt="About Me" className="relative rounded-2xl w-full object-cover" style={{ height: 480 }} />
              <div className="glass-card absolute -bottom-6 -right-6 p-5 text-center">
                <p className="stat-number">2+</p>
                <p className="text-gray-400 text-sm mt-1">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={ref3} className={`reveal ${v3 ? 'visible' : ''}`}>
            <h3 className="text-3xl font-bold mb-6">
              Full Stack Developer & <span className="text-gold-gradient">Problem Solver</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Saya adalah seorang Full Stack Developer yang bersemangat dalam menciptakan solusi digital
              yang elegant dan fungsional. Dengan pengalaman dalam pengembangan web modern,
              saya selalu berusaha menghadirkan code yang bersih, maintainable, dan performant.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Dalam proses pengembangan, saya terbiasa mengerjakan berbagai aspek,
              mulai dari perancangan antarmuka frontend, pengembangan backend,
              integrasi API, hingga pengelolaan database. Saya juga tertarik
              mengeksplorasi teknologi AI untuk mengembangkan sistem yang lebih
              cerdas, adaptif, dan mampu menjawab kebutuhan pengguna.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { label: 'Name', value: 'Muhammad Taufiq Abdus Salam', className: 'text-white font-semibold' },
                { label: 'Email', value: 'muhammadtaufiqabdussalam12@gmail.com', className: 'text-white font-semibold' },
                { label: 'Location', value: 'Indonesia', className: 'text-white font-semibold' },
                // { label: 'Status', value: null, className: '' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-gray-500 text-sm mb-1">{item.label}</p>
                  {item.value
                    ? <p className={item.className}>{item.value}</p>
                    : <p className="text-green-400 font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
                        Available
                      </p>
                  }
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {['PHP / Laravel', 'JavaScript', 'MySQL','PostgreeSQL','Python', 'REST API', 'GIS / Leaflet', 'AI Integration'].map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>

            <a href="#" className="btn-gold">
              <i className="fas fa-download mr-2"></i>Download CV
            </a>
          </div>
        </div>

        {/* Stats */}
        <div ref={ref4} className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 reveal ${v4 ? 'visible' : ''}`}>
          {stats.map(s => <StatCard key={s.label} {...s} visible={v4} />)}
        </div>
      </div>
    </section>
  )
}
