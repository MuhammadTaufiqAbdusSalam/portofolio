import { useEffect, useRef, useState } from 'react'

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

const skills = [
  { name: 'PHP / Laravel' },
  { name: 'JavaScript / Alpine.js' },
  { name: 'MySQL / PostgreSQL'},
  { name: 'HTML / CSS / Tailwind'},
  { name: 'GIS / Leaflet.js'},
  { name: 'AI API Integration (Gemini)'},
]

const tools = [
  { emoji: '🐘', label: 'PHP' },
  { emoji: '⚡', label: 'Laravel' },
  { emoji: '🟨', label: 'JavaScript' },
  { emoji: '🗄️', label: 'MySQL' },
  { emoji: '🗺️', label: 'Leaflet.js' },
  { emoji: '🤖', label: 'Gemini AI' },
  { emoji: '🎨', label: 'Tailwind CSS' },
  { emoji: '📊', label: 'Excel / POI' },
  { emoji: '🐙', label: 'Git / GitHub' },
]

function SkillBar({ name, pct, visible, delay }) {
  return (
    <div className="skill-item">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="font-semibold" style={{ color: '#f5c842' }}>{pct}</span>
      </div>
      {/* <div className="w-full rounded-full" style={{ height: 6, background: '#2d2d3d' }}>
        <div
          className={`skill-bar-fill ${visible ? 'animated' : ''}`}
          style={{ width: `${pct}%`, transitionDelay: delay }}
        />
      </div> */}
    </div>
  )
}

export default function Skills() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()
  const [ref3, v3] = useReveal()

  return (
    <section id="skills" className="py-24 relative"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 70%), #0a0a0f' }}>
      <div className="max-w-7xl mx-auto px-6">

        <div ref={ref1} className={`text-center mb-16 reveal ${v1 ? 'visible' : ''}`}>
          <p className="text-gold-400 font-semibold tracking-widest text-sm uppercase mb-3">What I Know</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold section-title inline-block">My Skills</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Skill Bars */}
          <div ref={ref2} className={`reveal ${v2 ? 'visible' : ''}`}>
            <h3 className="text-xl font-semibold mb-8 text-gold-400">Technical Proficiency</h3>
            <div className="space-y-6">
              {skills.map((s, i) => (
                <SkillBar key={s.name} {...s} visible={v2} delay={`${i * 0.2}s`} />
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div ref={ref3} className={`reveal ${v3 ? 'visible' : ''}`}>
            <h3 className="text-xl font-semibold mb-8 text-gold-400">Tools & Technologies</h3>
            <div className="grid grid-cols-3 gap-4">
              {tools.map(t => (
                <div key={t.label} className="glass-card p-4 text-center group cursor-default">
                  <div className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">{t.emoji}</div>
                  <p className="text-sm text-gray-400 group-hover:text-gold-400 transition-colors">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
