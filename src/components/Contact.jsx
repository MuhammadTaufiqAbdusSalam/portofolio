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

const contactItems = [
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'muhammadtaufiqabdussalam12@email.com',
    href: 'mailto:muhammadtaufiqabdussalam12@email.com',
  },
  {
    icon: 'fab fa-whatsapp',
    label: 'WhatsApp',
    value: '+62 831-6644-1802',
    href: 'https://wa.me/6283166441802',
  },
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/Muhammad Taufiq',
    href: 'https://linkedin.com/in/muhammad-taufiq-319340361/',
  },
  {
    icon: 'fab fa-github',
    label: 'GitHub',
    value: 'github.com/MuhammadTaufiqAbdusSalam',
    href: 'https://github.com/MuhammadTaufiqAbdusSalam',
  },
]

function ContactCard({ item }) {
  return (
    <div className="glass-card p-6 flex items-center gap-5 group">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)' }}>
        <i className={`${item.icon} text-xl`} style={{ color: '#f5c842' }}></i>
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">{item.label}</p>
        <a href={item.href} target="_blank" rel="noreferrer"
          className="text-white font-semibold transition-colors hover:text-gold-400"
          style={{ textDecoration: 'none' }}>
          {item.value}
        </a>
      </div>
    </div>
  )
}

export default function Contact() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()
  const [ref3, v3] = useReveal()

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSuccess(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    }, 2000)
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    background: 'rgba(10,10,15,0.8)', border: '1px solid rgba(212,160,23,0.2)',
    color: '#e8e8f0', fontSize: '0.875rem', outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  const handleFocus = e => e.target.style.borderColor = 'rgba(212,160,23,0.6)'
  const handleBlur = e => e.target.style.borderColor = 'rgba(212,160,23,0.2)'

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="deco-circle" style={{ width: 500, height: 500, top: -100, right: -200, opacity: 0.08 }} />

      <div className="max-w-7xl mx-auto px-6">

        <div ref={ref1} className={`text-center mb-16 reveal ${v1 ? 'visible' : ''}`}>
          <p className="text-gold-400 font-semibold tracking-widest text-sm uppercase mb-3">Let's Talk</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold section-title inline-block">Get In Touch</h2>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Tertarik untuk bekerja sama? Saya selalu terbuka untuk diskusi project baru,
            peluang kolaborasi, atau sekadar ngobrol seputar teknologi.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div ref={ref2} className={`reveal ${v2 ? 'visible' : ''} space-y-6`}>
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
            {contactItems.map(item => <ContactCard key={item.label} item={item} />)}
          </div>

          {/* Form */}
          <div ref={ref3} className={`reveal ${v3 ? 'visible' : ''}`}>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2" htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name" name="name" type="text"
                      placeholder="Your Name" required value={form.name}
                      onChange={handleChange} style={inputStyle}
                      onFocus={handleFocus} onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2" htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email" name="email" type="email"
                      placeholder="your@email.com" required value={form.email}
                      onChange={handleChange} style={inputStyle}
                      onFocus={handleFocus} onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject" name="subject" type="text"
                    placeholder="Project Discussion" required value={form.subject}
                    onChange={handleChange} style={inputStyle}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message" name="message" rows={5}
                    placeholder="Tell me about your project..." required value={form.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </div>

                <button type="submit" disabled={sending} className="btn-gold w-full"
                  style={{ opacity: sending ? 0.7 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}>
                  {sending
                    ? <><i className="fas fa-spinner fa-spin mr-2"></i>Sending...</>
                    : <><i className="fas fa-paper-plane mr-2"></i>Send Message</>
                  }
                </button>

                {success && (
                  <div className="text-center py-3 rounded-xl text-green-400 font-medium"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
                    <i className="fas fa-check-circle mr-2"></i>
                    Message sent! I'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
