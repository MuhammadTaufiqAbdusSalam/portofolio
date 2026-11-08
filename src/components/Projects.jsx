import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import wastelog from '../assets/wastelog.png'
import wastelog1 from '../assets/wastelog1.png'
import wastelog2 from '../assets/wastelog3.png'
import wastelog3 from '../assets/wastelog5.jpg'
import wastelog4 from '../assets/wastelog6.jpg'
import wastelog5 from '../assets/wastelog7.jpg'
import pemetaan2 from '../assets/pemetaan2.jpg'
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
    images: [wastelog, wastelog1, wastelog2, wastelog3, wastelog4, wastelog5], // ← ganti dengan foto-foto berbeda
    desc: 'Mengembangkan aplikasi web WasteLog untuk mengelola proses operasional limbah B3, mulai dari pencatatan limbah masuk, pengolahan menggunakan insinerator, hingga pengiriman residu. Membangun fitur manajemen data berbasis multi-role authentication, CRUD, import/export Excel dan PDF, serta dashboard interaktif untuk visualisasi statistik dan monitoring data. Mengimplementasikan algoritma FIFO untuk pengelolaan stok residu dan perhitungan otomatis hasil pembakaran.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Import/Export Excel', 'FIFO', 'CRUD', 'Chart', 'Dashboard Analytics'],
  },
  {
    id: 'pemetaan',
    title: 'Dashboard Pemetaan Smart',
    category: 'data',
    categoryLabel: 'Data / GIS',
    images: [pemetaan1, pemetaan2], // ← ganti dengan foto-foto berbeda
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

// ── Lightbox (tampilan foto diperbesar) ───────────────────────────────
// Dirender lewat portal ke <body> supaya tidak terjebak di dalam card
// (card memakai backdrop-filter & transform yang membatasi posisi "fixed").
function Lightbox({ images, index, title, onClose, onChange }) {
  const total = images.length

  const go = useCallback(
    dir => onChange((index + dir + total) % total),
    [index, total, onChange]
  )

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && total > 1) go(-1)
      else if (e.key === 'ArrowRight' && total > 1) go(1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [go, onClose, total])

  const roundBtn = {
    position: 'absolute', width: 44, height: 44, borderRadius: '50%',
    border: '1px solid rgba(212,160,23,0.4)', cursor: 'pointer',
    background: 'rgba(10,10,15,0.8)', color: '#f5c842',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background 0.2s ease',
  }
  const hoverOn = e => (e.currentTarget.style.background = 'rgba(212,160,23,0.8)')
  const hoverOff = e => (e.currentTarget.style.background = 'rgba(10,10,15,0.8)')

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} - foto diperbesar`}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(5,5,10,0.92)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '64px 16px',
      }}
    >
      {/* Tombol tutup */}
      <button
        onClick={e => { e.stopPropagation(); onClose() }}
        aria-label="Tutup"
        style={{ ...roundBtn, top: 16, right: 16 }}
        onMouseEnter={hoverOn} onMouseLeave={hoverOff}
      >
        <i className="fas fa-times"></i>
      </button>

      {/* Foto */}
      <img
        src={images[index]}
        alt={`${title} - foto ${index + 1}`}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
          borderRadius: 12, border: '1px solid rgba(212,160,23,0.25)',
          boxShadow: '0 0 60px rgba(212,160,23,0.15)',
        }}
      />

      {/* Prev / Next */}
      {total > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); go(-1) }}
            aria-label="Foto sebelumnya"
            style={{ ...roundBtn, left: 12, top: '50%', transform: 'translateY(-50%)' }}
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={e => { e.stopPropagation(); go(1) }}
            aria-label="Foto berikutnya"
            style={{ ...roundBtn, right: 12, top: '50%', transform: 'translateY(-50%)' }}
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </>
      )}

      {/* Keterangan */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(10,10,15,0.8)', border: '1px solid rgba(212,160,23,0.3)',
          borderRadius: 20, padding: '4px 16px', fontSize: '0.8rem',
          color: '#f5c842', fontWeight: 600, whiteSpace: 'nowrap',
          maxWidth: 'calc(100% - 32px)', overflow: 'hidden', textOverflow: 'ellipsis',
        }}
      >
        {title}{total > 1 ? ` · ${index + 1} / ${total}` : ''}
      </div>
    </div>,
    document.body
  )
}

// ── Image Slider Component ────────────────────────────────────────────
function ImageSlider({ images, title }) {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const movedRef = useRef(false) // true jika pengguna menggeser (bukan sekadar klik/tap)
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

  const closeLightbox = useCallback(() => setLightbox(false), [])

  // ── Touch / Mouse drag ─────────────────────────────
  const onDragStart = (clientX) => {
    setDragging(true)
    setStartX(clientX)
    setDragDelta(0)
    movedRef.current = false
  }

  const onDragMove = (clientX) => {
    if (!dragging) return
    const delta = clientX - startX
    if (Math.abs(delta) > 5) movedRef.current = true
    setDragDelta(delta)
  }

  const onDragEnd = () => {
    if (!dragging) return
    setDragging(false)
    if (dragDelta < -50) next()
    else if (dragDelta > 50) prev()
    setDragDelta(0)
  }

  // Klik/tap tanpa menggeser = buka foto diperbesar
  const onSliderClick = () => {
    if (movedRef.current) return
    setLightbox(true)
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
      style={{ position: 'relative', height: 220, overflow: 'hidden', cursor: dragging ? 'grabbing' : 'zoom-in', userSelect: 'none' }}
      onClick={onSliderClick}
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

      {/* Petunjuk bisa diperbesar */}
      <div style={{
        position: 'absolute', bottom: 10, right: 10, zIndex: 10, pointerEvents: 'none',
        width: 28, height: 28, borderRadius: '50%',
        background: 'rgba(10,10,15,0.75)', border: '1px solid rgba(212,160,23,0.3)',
        color: '#f5c842', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <i className="fas fa-expand" style={{ fontSize: 11 }}></i>
      </div>

      {/* Prev / Next buttons — tampil hanya jika > 1 foto */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Foto sebelumnya"
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
            aria-label="Foto berikutnya"
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
                aria-label={`Ke foto ${i + 1}`}
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

      {/* Foto diperbesar */}
      {lightbox && (
        <Lightbox
          images={images}
          index={current}
          title={title}
          onClose={closeLightbox}
          onChange={setCurrent}
        />
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
        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 20, pointerEvents: 'none' }}>
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
        <div ref={ref3} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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