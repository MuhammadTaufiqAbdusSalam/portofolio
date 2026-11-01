import { useEffect, useRef, useState, useCallback } from 'react'
import wastelog from '../assets/wastelog.png'
import wastelog1 from '../assets/wastelog4.png'
import wastelog2 from '../assets/wastelog3.png'
import pemetaan from '../assets/project_pemetaan.png'
import pemetaan1 from '../assets/pemetaan.png'

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

// ── Data Projects ────────────────────────────────────────────────────
// Untuk menambah foto: tambahkan path gambar ke array `images`
// Contoh: images: [foto1, foto2, foto3]
const projects = [
  {
    id: 'wastelog',
    title: 'WasteLog',
    category: 'web',
    categoryLabel: 'Web App',
    images: [wastelog, wastelog1, wastelog2], // ← ganti dengan foto-foto berbeda
    desc: 'Mengembangkan aplikasi web WasteLog untuk mengelola proses operasional limbah B3, mulai dari pencatatan limbah masuk, pengolahan menggunakan insinerator, hingga pengiriman residu. Membangun fitur manajemen data berbasis multi-role authentication, CRUD, import/export Excel dan PDF, serta dashboard interaktif untuk visualisasi statistik dan monitoring data. Mengimplementasikan algoritma FIFO untuk pengelolaan stok residu dan perhitungan otomatis hasil pembakaran.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Import/Export Excel', 'FIFO', 'CRUD', 'Chart', 'Dashboard Analytics'],
  },
  {
    id: 'pemetaan',
    title: 'Dashboard Pemetaan Smart',
    category: 'data',
    categoryLabel: 'Data / GIS',
    images: [pemetaan1, pemetaan1, pemetaan1], // ← ganti dengan foto-foto berbeda
    desc: 'Mengembangkan aplikasi dashboard pemetaan harga komoditas pangan di Jawa Timur dengan mengintegrasikan data hasil web scraping dari SISKAPERBAPO ke dalam PostgreSQL. Menampilkan persebaran harga melalui peta interaktif berbasis Leaflet.js, grafik tren dan perbandingan harga menggunakan Chart.js, serta analisis stabilitas harga berbasis statistik, rule-based decision, dan Google Gemini AI untuk menghasilkan narasi analisis otomatis.',
    tags: ['Laravel', 'Leaflet.js', 'PostgreSQL', 'Python', 'scraping', 'Gemini AI', 'GIS', 'Chart'],
  },
  {
    id: 'next',
    title: 'Next Project',
    category: 'web',
    categoryLabel: 'Web App',
    images: [], // kosong = tampil placeholder
    desc: 'Project baru sedang dalam pengembangan. Akan segera hadir dengan fitur-fitur inovatif dan teknologi terkini.',
    tags: ['TBD'],
  },
]

const filters = [
  { key: 'all', label: 'All Projects' },
  { key: 'web', label: 'Web App' },
  { key: 'data', label: 'Data / GIS' },
]

// ── Image Slider Component ────────────────────────────────────────────
function ImageSlider({ images, title }) {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const sliderRef = useRef(null)

  const total = images.length

  const prev = useCallback((e) => {
    e?.stopPropagation()
    setCurrent(c => (c - 1 + total) % total)
  }, [total])

  const next = useCallback((e) => {
    e?.stopPropagation()
    setCurrent(c => (c + 1) % total)
  }, [total])

  // ── Touch / Mouse drag ─────────────────────────────
  const onDragStart = (clientX) => {
    setDragging(true)
    setStartX(clientX)
    setDragDelta(0)
  }

  const onDragMove = (clientX) => {
    if (!dragging) return
    setDragDelta(clientX - startX)
  }

  const onDragEnd = () => {
    if (!dragging) return
    setDragging(false)
    if (dragDelta < -50) next()
    else if (dragDelta > 50) prev()
    setDragDelta(0)
  }

  // Mouse events
  const onMouseDown = e => onDragStart(e.clientX)
  const onMouseMove = e => onDragMove(e.clientX)
  const onMouseUp = () => onDragEnd()
  const onMouseLeave = () => { if (dragging) onDragEnd() }

  // Touch events
  const onTouchStart = e => onDragStart(e.touches[0].clientX)
  const onTouchMove = e => onDragMove(e.touches[0].clientX)
  const onTouchEnd = () => onDragEnd()

  if (total === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1a1a24, #22222f)', height: 220 }}>
        <div className="text-center p-6">
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-gray-500 text-sm">Coming Soon</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={sliderRef}
      style={{ position: 'relative', height: 220, overflow: 'hidden', cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides strip */}
      <div style={{
        display: 'flex',
        height: '100%',
        transform: `translateX(calc(-${current * 100}% + ${dragDelta}px))`,
        transition: dragging ? 'none' : 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
      }}>
        {images.map((img, i) => (
          <div key={i} style={{ minWidth: '100%', height: '100%', position: 'relative', flexShrink: 0 }}>
            <img
              src={img}
              alt={`${title} - foto ${i + 1}`}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
            />
            {/* Gradient overlay */}
            <div className="project-overlay" />
          </div>
        ))}
      </div>

      {/* Prev / Next buttons — tampil hanya jika > 1 foto */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(10,10,15,0.7)', backdropFilter: 'blur(4px)',
              color: '#f5c842', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease', zIndex: 10,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,160,23,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(10,10,15,0.7)'}
          >
            <i className="fas fa-chevron-left" style={{ fontSize: 12 }}></i>
          </button>

          <button
            onClick={next}
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(10,10,15,0.7)', backdropFilter: 'blur(4px)',
              color: '#f5c842', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease', zIndex: 10,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,160,23,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(10,10,15,0.7)'}
          >
            <i className="fas fa-chevron-right" style={{ fontSize: 12 }}></i>
          </button>

          {/* Dot indicators */}
          <div style={{
            position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 6, zIndex: 10,
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setCurrent(i) }}
                style={{
                  width: i === current ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  background: i === current ? '#f5c842' : 'rgba(255,255,255,0.35)',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Counter badge */}
          <div style={{
            position: 'absolute', top: 10, right: 10, zIndex: 10,
            background: 'rgba(10,10,15,0.75)', backdropFilter: 'blur(4px)',
            borderRadius: 20, padding: '2px 10px', fontSize: '0.7rem',
            color: '#f5c842', fontWeight: 600, border: '1px solid rgba(212,160,23,0.3)',
          }}>
            {current + 1} / {total}
          </div>
        </>
      )}
    </div>
  )
}

// ── Project Card ──────────────────────────────────────────────────────
function ProjectCard({ project, visible }) {
  return (
    <div className={`glass-card overflow-hidden reveal ${visible ? 'visible' : ''}`}>

      {/* Slider */}
      <div style={{ position: 'relative', borderRadius: '16px 16px 0 0', overflow: 'hidden' }}>
        <ImageSlider images={project.images} title={project.title} />
        {/* Category badge */}
        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 20 }}>
          <span className="badge text-xs">{project.categoryLabel}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded text-gray-400"
              style={{ background: '#2d2d3d' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()
  const [ref3, v3] = useReveal()

  const filtered = projects.filter(p => activeFilter === 'all' || p.category === activeFilter)

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">

        <div ref={ref1} className={`text-center mb-16 reveal ${v1 ? 'visible' : ''}`}>
          <p className="text-gold-400 font-semibold tracking-widest text-sm uppercase mb-3">My Work</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold section-title inline-block">Featured Projects</h2>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Berikut adalah beberapa project unggulan yang telah saya kerjakan.
          </p>
        </div>

        {/* Filter */}
        <div ref={ref2} className={`flex flex-wrap justify-center gap-3 mb-12 reveal ${v2 ? 'visible' : ''}`}>
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="badge px-6 py-2 cursor-pointer transition-all duration-300"
              style={activeFilter === f.key
                ? { background: 'rgba(212,160,23,0.4)', borderColor: '#d4a017' }
                : {}
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={ref3} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} visible={v3} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <a href="https://github.com/MuhammadTaufiqAbdusSalam" target="_blank" rel="noreferrer" className="btn-outline">
            <i className="fab fa-github mr-2"></i>View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
