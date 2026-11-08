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

const timeline = [
  {
    title: 'Full Stack Developer',
    org: 'Magang / PT Putra Restu Ibu Abadi',
    period: 'Juli-2025 - Desember-2026',
    desc: 'Mengembangkan sistem informasi manajemen limbah B3 berbasis web untuk mengelola pencatatan, pengolahan, dan pengiriman residu. Mengimplementasikan fitur multi-role authentication, manajemen data, import/export laporan Excel dan PDF, dashboard analytics, serta algoritma FIFO untuk pengelolaan stok residu menggunakan Laravel, PHP, dan MySQL.',
  },
  {
    title: 'Full-Stack Developer',
    org: 'Website Penjualan Mini Gift',
    period: 'Mei 2025 - Juli 2025',
    desc: 'Mengembangkan website penjualan produk Mini Gift menggunakan framework Laravel. Membangun fitur pengelolaan produk dan alur pemesanan pelanggan.',
  },
  {
    title: 'Back-end & Front-end Developer',
    org: 'Sistem Informasi Pendataan Sertifikasi dan Pelatihan Dosen JTI Polinema',
    period: 'Agustus 2024 - Desember 2024',
    desc: 'Mengembangkan aplikasi berbasis web dan mobile untuk mengelola data sertifikasi dan pelatihan dosen. Menganalisis kebutuhan sistem melalui kolaborasi tim, merancang UI/UX untuk tampilan mobile dan web agar alur pengguna intuitif dan mudah diakses, membangun fitur pengelolaan data menggunakan Laravel dan Flutter, serta merancang dan mengelola database MySQL untuk penyimpanan data sistem.',
  },
  {
    title: 'Deployment',
    org: 'Survei Kepuasan Pelanggan Polinema',
    period: 'Februari 2024 - Juni 2024',
    desc: 'Menganalisis kebutuhan sistem melalui kolaborasi tim, merancang UI/UX menggunakan Figma, dan membangun antarmuka serta fungsionalitas survei menggunakan HTML, PHP, dan CSS. Merancang dan mengelola database MySQL untuk mendukung penyimpanan data sistem.',
  },
  {
    title: 'Sistem Informasi Bisnis',
    org: 'Politeknik Negeri Malang',
    period: '2022 - 2026',
    desc: 'Mengerjakan berbagai project akademis dan praktikum yang memperkuat fundamental programming dan problem-solving.',
  },
  
]

function TimelineItem({ item, index, visible }) {
  return (
    <div className={`relative mb-10 reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}>
      <div className="timeline-dot" style={{ top: 6 }} />
      <div className="glass-card p-6 ml-4">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="font-medium" style={{ color: '#f5c842' }}>{item.org}</p>
          </div>
          <span className="badge text-xs">{item.period}</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </div>
  )
}

export default function Experience() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()

  return (
    <section id="experience" className="py-24 relative"
      style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(212,160,23,0.04) 0%, transparent 60%), #0a0a0f' }}>
      <div className="max-w-4xl mx-auto px-6">

        <div ref={ref1} className={`text-center mb-16 reveal ${v1 ? 'visible' : ''}`}>
          <p className="text-gold-400 font-semibold tracking-widest text-sm uppercase mb-3">My Journey</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold section-title inline-block">Experience</h2>
        </div>

        <div ref={ref2} className="relative pl-12">
          <div className="timeline-line" />
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} visible={v2} />
          ))}
        </div>
      </div>
    </section>
  )
}
