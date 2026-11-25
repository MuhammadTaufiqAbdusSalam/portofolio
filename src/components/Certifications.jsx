import { useEffect, useRef, useState } from 'react'
import sertifikasiImg from '../assets/sertif.jpeg'

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

const certifications = [
  {
    title: 'Pemrograman Software Komputer',
    issuer: 'LSP POLINEMA | BNSP',
    year: '2026',
    image: sertifikasiImg,
  },
]

function CertificateCard({ item, index, visible }) {
  return (
    <div
      className={`glass-card overflow-hidden flex flex-col min-w-0 reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Bukti sertifikat */}
      {item.image ? (
        <a href={item.image} target="_blank" rel="noreferrer" className="block relative group overflow-hidden">
          <img
            src={item.image}
            alt={`Sertifikat ${item.title}`}
            loading="lazy"
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-sm font-semibold">
            <i className="fas fa-arrow-up-right-from-square text-gold-400"></i>
            <span>Lihat Sertifikat Penuh</span>
          </div>
        </a>
      ) : (
        <div
          className="w-full h-64 flex flex-col items-center justify-center gap-3 text-gray-500"
          style={{ background: 'rgba(10,10,15,0.6)', borderBottom: '1px solid rgba(212,160,23,0.15)' }}
        >
          <i className="fas fa-image text-4xl" style={{ color: 'rgba(245,200,66,0.4)' }}></i>
          <span className="text-sm">Bukti sertifikat segera ditambahkan</span>
        </div>
      )}

      <div className="p-6 flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}>
            <i className="fas fa-certificate text-xl" style={{ color: '#f5c842' }}></i>
          </div>
          <span className="badge text-xs">{item.year}</span>
        </div>
        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
        <p className="font-medium text-sm" style={{ color: '#f5c842' }}>{item.issuer}</p>
      </div>
    </div>
  )
}

export default function Certifications() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="deco-circle" style={{ width: 400, height: 400, bottom: -150, left: -150, opacity: 0.08 }} />

      <div className="max-w-5xl mx-auto px-6">

        <div ref={ref1} className={`text-center mb-16 reveal ${v1 ? 'visible' : ''}`}>
          <p className="text-gold-400 font-semibold tracking-widest text-sm uppercase mb-3">Credentials</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold section-title inline-block">Certifications</h2>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Sertifikasi kompetensi resmi sebagai bukti kualifikasi dan profesionalitas di bidang teknologi informasi.
          </p>
        </div>

        <div
          ref={ref2}
          className={certifications.length === 1 ? 'max-w-xl mx-auto' : 'grid grid-cols-1 md:grid-cols-2 gap-8'}
        >
          {certifications.map((item, i) => (
            <CertificateCard key={item.title} item={item} index={i} visible={v2} />
          ))}
        </div>
      </div>
    </section>
  )
}
