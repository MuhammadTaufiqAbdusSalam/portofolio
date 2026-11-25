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
    title: 'Full-Stack Developer',
    org: 'Web-Based E-Learning Platform | Laravel, MySQL, Tailwind CSS, AJAX',
    period: 'November 2026',
    points: [
      'Mengembangkan platform pembelajaran video berbasis web menggunakan Laravel 10, MySQL, dan Tailwind CSS.',
      'Mengimplementasikan sistem autentikasi Role-Based Access Control (RBAC) untuk membedakan alur kerja Admin dan Mahasiswa secara aman melalui custom middleware.',
      'Membangun sistem manajemen konten (CRUD) Course dan Lesson dengan antarmuka modal berbasis AJAX/Fetch API untuk pengalaman pengguna yang cepat tanpa reload halaman.',
      'Merancang arsitektur penyimpanan dan streaming video privat (secure local storage) yang membatasi akses video hanya untuk pengguna terotentikasi.',
      'Menyediakan pemutar video interaktif dengan navigasi bab berurutan serta desain antarmuka yang sepenuhnya responsif di perangkat seluler dan desktop.',
    ],
  },
  {
    title: 'Full-Stack Developer',
    org: 'Dashboard Pemetaan Sebaran Harga Komoditas Bahan Pokok Jawa Timur | Skripsi',
    period: 'Februari 2026 - Juli 2026',
    desc: 'Mengembangkan dashboard pemetaan harga komoditas pangan berdasarkan data SISKAPERBAPO. Membangun proses web scraping menggunakan Python untuk mengambil dan menyimpan data harga komoditas ke PostgreSQL. Mengembangkan visualisasi peta interaktif menggunakan Leaflet.js untuk menampilkan persebaran harga komoditas di wilayah Jawa Timur, membuat grafik tren dan perbandingan harga menggunakan Chart.js, serta mengintegrasikan Gemini AI API untuk menghasilkan analisis stabilitas harga komoditas berdasarkan data statistik.',
  },
  {
    title: 'Full-Stack Developer',
    org: 'Frozeria — Sistem Informasi Manajemen Stok Frozen Food | Laravel, PHP, MySQL, Bootstrap 4, AJAX',
    period: 'Mei 2026',
    points: [
      'Mengembangkan aplikasi web inventaris untuk optimalisasi pencatatan dan monitoring stok produk frozen food secara real-time.',
      'Menerapkan arsitektur MVC Laravel dan relasi database (One-to-Many) untuk mengelola master data barang dan kategori secara terstruktur.',
      'Mengintegrasikan jQuery AJAX dan modal dinamis untuk operasi CRUD tanpa page reload, meningkatkan efisiensi navigasi pengguna.',
      'Membangun sistem deteksi stok kritis otomatis (low stock warning) berdasarkan ambang batas stok minimum untuk mencegah kehabisan barang.',
      'Mengimplementasikan sistem manajemen berkas untuk upload dan penghapusan otomatis gambar produk, serta DataTables untuk pencarian instan dan paginasi data.',
    ],
  },
  {
    title: 'Full Stack Developer',
    org: 'Magang / PT Putra Restu Ibu Abadi',
    period: 'Juli 2025 - Desember 2025',
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
    title: 'Full-Stack Developer',
    org: 'Web-Based Point of Sale (POS) & Inventory Management System | Laravel, MySQL',
    period: 'September 2024 - Oktober 2024',
    points: [
      'Mengembangkan sistem kasir dan manajemen inventaris berbasis web untuk mengotomatisasi pencatatan stok, transaksi kasir, dan laporan berkala.',
      'Mengimplementasikan arsitektur Role-Based Access Control (RBAC) 3 tingkat (Admin, Manager, Staff) serta RESTful API terotentikasi JWT.',
      'Mengoptimalkan user experience dengan CRUD berbasis AJAX modal, dialog interaktif SweetAlert2, dan pemrosesan tabel server-side menggunakan Yajra DataTables.',
      'Membangun fitur automasi pelaporan bisnis dengan kemampuan ekspor data ke PDF/Excel serta import batch data katalog barang via Excel spreadsheet.',
    ],
  },
  {
    title: 'Deployment & Frontend',
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
    <div
      className={`relative mb-10 reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="timeline-dot" style={{ top: 6 }} />
      <div className="glass-card p-6 ml-4">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="font-medium text-sm mt-0.5" style={{ color: '#f5c842' }}>{item.org}</p>
          </div>
          <span className="badge text-xs">{item.period}</span>
        </div>

        {item.points ? (
          <ul className="text-gray-400 text-sm space-y-2 mt-3">
            {item.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-gold-400 text-xs mt-1.5 flex-shrink-0">◆</span>
                <span className="leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm leading-relaxed mt-2">{item.desc}</p>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()

  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(212,160,23,0.04) 0%, transparent 60%), #0a0a0f',
      }}
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">

        <div ref={ref1} className={`text-center mb-16 reveal ${v1 ? 'visible' : ''}`}>
          <p className="text-gold-400 font-semibold tracking-widest text-sm uppercase mb-3">My Journey</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold section-title inline-block">Experience</h2>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Rekam jejak pengalaman profesional, proyek pengembangan perangkat lunak, dan dedikasi di bidang teknologi informasi.
          </p>
        </div>

        <div ref={ref2} className="relative pl-8 sm:pl-12">
          <div className="timeline-line" />
          {timeline.map((item, i) => (
            <TimelineItem key={`${item.title}-${i}`} item={item} index={i} visible={v2} />
          ))}
        </div>
      </div>
    </section>
  )
}
