import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      let current = 'home'
      sections.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = id
      })
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(10,10,15,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,160,23,0.2)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={e => handleNavClick(e, 'home')} className="text-xl font-display font-bold text-gold-gradient">
          Muhammad Taufiq Abdus Salam<span className="text-white">.</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={e => handleNavClick(e, link.id)}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          onClick={e => handleNavClick(e, 'contact')}
          className="hidden md:block btn-gold"
          style={{ padding: '10px 24px', fontSize: '0.85rem' }}
        >
          Hire Me
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pt-4 pb-6"
          style={{ background: '#111118', borderTop: '1px solid rgba(212,160,23,0.2)' }}>
          {links.map(link => (
            <a key={link.id} href={`#${link.id}`}
              onClick={e => handleNavClick(e, link.id)}
              className="nav-link block"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={e => handleNavClick(e, 'contact')}
            className="btn-gold text-center mt-2" style={{ padding: '10px 24px' }}>
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}
