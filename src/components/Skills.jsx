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

// ── Data Keahlian Teknis (Kategori) ──────────────────────────────────
const technicalCategories = [
  {
    category: 'Bahasa Pemrograman',
    icon: 'fas fa-code',
    skills: [
      { name: 'PHP', icon: 'fab fa-php', level: 'Advanced' },
      { name: 'Python', icon: 'fab fa-python', level: 'Intermediate' },
      { name: 'Java', icon: 'fab fa-java', level: 'Intermediate' },
      { name: 'JavaScript', icon: 'fab fa-js', level: 'Intermediate' },
      { name: 'HTML', icon: 'fab fa-html5', level: 'Advanced' },
      { name: 'CSS', icon: 'fab fa-css3-alt', level: 'Advanced' },
    ],
  },
  {
    category: 'Framework & Styling',
    icon: 'fas fa-layer-group',
    skills: [
      { name: 'Laravel', icon: 'fab fa-laravel', level: 'Advanced' },
      { name: 'Tailwind CSS', icon: 'fas fa-wind', level: 'Advanced' },
      { name: 'Bootstrap', icon: 'fab fa-bootstrap', level: 'Intermediate' },
    ],
  },
  {
    category: 'Database & Arsitektur',
    icon: 'fas fa-database',
    skills: [
      { name: 'MySQL', icon: 'fas fa-database', level: 'Advanced' },
      { name: 'PostgreSQL', icon: 'fas fa-server', level: 'Intermediate' },
      { name: 'Database Design', icon: 'fas fa-sitemap', level: 'Advanced' },
    ],
  },
  {
    category: 'Integrasi & Pemrosesan Data',
    icon: 'fas fa-microchip',
    skills: [
      { name: 'REST API Integration', icon: 'fas fa-network-wired', level: 'Advanced' },
      { name: 'AI Integration', icon: 'fas fa-robot', level: 'Intermediate' },
      { name: 'Web Scraping', icon: 'fas fa-spider', level: 'Advanced' },
      { name: 'Data Processing', icon: 'fas fa-chart-line', level: 'Advanced' },
    ],
  },
]

// ── Data Soft Skills ──────────────────────────────────────────────────
const softSkills = [
  {
    title: 'Kerja Sama Tim',
    icon: 'fas fa-users-gear',
    desc: 'Mampu berkolaborasi secara produktif dalam tim multidisiplin, komunikatif, dan aktif berkontribusi demi mencapai target proyek bersama.',
  },
  {
    title: 'Disiplin',
    icon: 'fas fa-clipboard-check',
    desc: 'Menjunjung standar kualitas kode, konsisten terhadap alur kerja git/project management, serta memiliki dedikasi kerja yang tinggi.',
  },
  {
    title: 'Pemecahan Masalah',
    icon: 'fas fa-puzzle-piece',
    desc: 'Berpikir analitis dan solutif dalam menganalisis akar masalah, men-debug kendala teknis, serta merancang arsitektur sistem yang efisien.',
  },
  {
    title: 'Manajemen Waktu dan Tanggung Jawab',
    icon: 'fas fa-business-time',
    desc: 'Mampu mengelola prioritas tugas secara terstruktur, memenuhi tenggat waktu proyek, dan bertanggung jawab penuh terhadap setiap hasil kerja.',
  },
]

export default function Skills() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()
  const [ref3, v3] = useReveal()

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.05) 0%, transparent 70%), #0a0a0f',
      }}
    >
      <div className="deco-circle" style={{ width: 500, height: 500, top: -150, right: -150, opacity: 0.05 }} />
      <div className="deco-circle" style={{ width: 450, height: 450, bottom: -100, left: -100, opacity: 0.04 }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div ref={ref1} className={`text-center mb-16 reveal ${v1 ? 'visible' : ''}`}>
          <p className="text-gold-400 font-semibold tracking-widest text-sm uppercase mb-3">Capabilities & Expertise</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold section-title inline-block">Skills & Competencies</h2>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Kombinasi keahlian teknis dalam rekayasa perangkat lunak modern dan soft skills profesional untuk menghasilkan solusi digital yang berkualitas, andal, dan efisien.
          </p>
        </div>

        {/* ── 1. KEAHLIAN TEKNIS ────────────────────────────────────────── */}
        <div ref={ref2} className={`mb-20 reveal ${v2 ? 'visible' : ''}`}>
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}
            >
              <i className="fas fa-laptop-code text-gold-400 text-lg"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Keahlian Teknis</h3>
              <p className="text-gray-400 text-sm">Bahasa pemrograman, framework, database, dan teknologi integrasi</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalCategories.map((cat, i) => (
              <div
                key={cat.category}
                className="glass-card p-6 flex flex-col justify-between"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: '1px solid rgba(212,160,23,0.15)' }}>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-gold-400"
                      style={{ background: 'rgba(212,160,23,0.1)' }}
                    >
                      <i className={cat.icon}></i>
                    </div>
                    <h4 className="font-semibold text-white text-base">{cat.category}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map(s => (
                      <div
                        key={s.name}
                        className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300"
                        style={{
                          background: 'rgba(17, 17, 24, 0.85)',
                          border: '1px solid rgba(212,160,23,0.2)',
                        }}
                      >
                        <i className={`${s.icon} text-gold-400 group-hover:scale-110 transition-transform`}></i>
                        <span className="text-sm font-medium text-gray-200 group-hover:text-gold-300 transition-colors">
                          {s.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. SOFT SKILLS ───────────────────────────────────────────── */}
        <div ref={ref3} className={`reveal ${v3 ? 'visible' : ''}`}>
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}
            >
              <i className="fas fa-handshake-simple text-gold-400 text-lg"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Soft Skills</h3>
              <p className="text-gray-400 text-sm">Etos kerja, kemampuan interpersonal, dan pemecahan masalah</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkills.map((item, index) => (
              <div
                key={item.title}
                className="glass-card p-6 flex flex-col justify-between group hover:border-gold-400/50 transition-all duration-300"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}
                  >
                    <i className={`${item.icon} text-xl text-gold-400`}></i>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
