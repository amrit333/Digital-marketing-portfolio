import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '#about',     label: 'About'     },
  { href: '#skills',    label: 'Skills'    },
  { href: '#services',  label: 'Services'  },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#process',   label: 'Process'   },
  { href: '#contact',   label: 'Contact'   },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [hidden, setHidden]         = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setHidden(y > lastY.current && y > 150)
      lastY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClass = ['navbar', scrolled ? 'scrolled' : '', hidden ? 'hidden' : ''].filter(Boolean).join(' ')

  return (
    <>
      <nav className={navClass} role="navigation" aria-label="Main navigation">
        <div className="container navbar-inner">
          {/* Logo */}
          <a href="#hero" className="navbar-logo">
            <div className="logo-icon">A</div>
            <span>AMRIT</span>
          </a>

          {/* Desktop nav */}
          <ul className="navbar-nav" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="https://wa.me/918544926441"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary navbar-cta"
            style={{ display: 'none' }}
          >
            Let's Talk
          </a>
          <a
            href="https://wa.me/918544926441"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary navbar-cta"
            style={{ fontSize: 13 }}
          >
            <i className="fa-brands fa-whatsapp" />
            Let's Talk
          </a>

          {/* Mobile toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 80,
              left: 0,
              right: 0,
              background: 'rgba(5, 7, 9, 0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--border-subtle)',
              zIndex: 999,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '16px 20px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 18,
                  borderRadius: 12,
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="https://wa.me/918544926441"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="btn btn-primary"
              style={{ marginTop: 16, justifyContent: 'center' }}
            >
              <i className="fa-brands fa-whatsapp" />
              Let's Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
