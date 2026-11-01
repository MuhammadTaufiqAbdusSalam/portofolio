export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="py-10" style={{ borderTop: '1px solid rgba(212,160,23,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-display font-bold text-gold-gradient mb-1">M Taufiq.</p>
            <p className="text-gray-500 text-sm">Full Stack Developer</p>
          </div>

          {/* Nav Links */}
          <div className="flex gap-6 text-sm text-gray-500">
            {['home', 'about', 'projects', 'contact'].map(id => (
              <button key={id} onClick={() => scrollTo(id)}
                className="capitalize hover:text-gold-400 transition-colors bg-transparent border-none cursor-pointer"
                style={{ color: 'inherit' }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {[
              { href: 'https://github.com/MuhammadTaufiqAbdusSalam', icon: 'fab fa-github', label: 'GitHub' },
              { href: 'https://linkedin.com/in/muhammad-taufiq-319340361/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
              // { href: 'https://instagram.com/', icon: 'fab fa-instagram', label: 'Instagram' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="social-link" aria-label={s.label}>
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>© 2026 <span style={{ color: '#f5c842' }}>MuhammadTaufiqAbdusSalam</span>. Crafted with ❤️ & ☕</p>
        </div>
      </div>
    </footer>
  )
}
