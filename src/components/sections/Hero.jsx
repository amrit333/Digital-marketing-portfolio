import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import HeroScene from '../3d/HeroScene'

const ROLES = [
  'Digital Marketing Expert',
  'Social Media Strategist',
  'Automation Specialist',
  'Lead Generation Expert',
  'Performance Marketing Consultant',
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const nameRef  = useRef(null)

  // Cycle roles
  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 3200)
    return () => clearInterval(id)
  }, [])

  // GSAP entrance for name letters
  useEffect(() => {
    if (!nameRef.current) return
    const chars = nameRef.current.querySelectorAll('.char')
    gsap.fromTo(
      chars,
      { y: 90, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.07, duration: 1.1, ease: 'power4.out', delay: 1.0 }
    )
  }, [])

  // Track mouse for 3D scene
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <section id="hero" className="hero-section">
      {/* ── 3D Canvas background ── */}
      {!isMobile && (
        <div className="hero-canvas">
          <HeroScene mouseRef={mouseRef} />
        </div>
      )}

      {/* ── Gradient overlay so text is readable ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 20% 50%, transparent 40%, rgba(5,7,9,0.85) 80%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero Content ── */}
      <div className="container hero-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-content">
          {/* Available badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="badge-pulse" />
            Available for new projects
          </motion.div>

          {/* Greeting */}
          <motion.span
            className="hero-greeting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Hi, I'm
          </motion.span>

          {/* Name — GSAP letter stagger */}
          <div
            className="hero-title-wrap"
            style={{ overflow: 'hidden', perspective: '600px' }}
          >
            <div className="hero-name gradient-text" ref={nameRef}>
              {'AMRIT'.split('').map((c, i) => (
                <span
                  key={i}
                  className="char"
                  style={{ display: 'inline-block', opacity: 0 }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Cycling role text */}
          <div className="hero-role-wrapper">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                className="hero-role"
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                <span
                  style={{
                    background: 'var(--grad-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {ROLES[roleIdx]}
                </span>
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Digital Marketing Executive with 1.5+ years specialising in Instagram automation,
            organic growth, AI-powered content strategy, and multi-page social media management
            that delivers measurable results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <a href="#contact" className="btn-hero-primary">
              <i className="fa-solid fa-rocket" />
              Let's Work Together
              <i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} />
            </a>
            <a
              href="https://drive.google.com/file/d/10BDaCvF14NrWOMfHKzajatG_sb1K9WyR/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn-hero-secondary"
            >
              <i className="fa-solid fa-file-arrow-down" />
              Download CV
            </a>
          </motion.div>

          {/* Contact Pills */}
          <motion.div
            className="hero-contact-pills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <a href="https://wa.me/918544926441" target="_blank" rel="noreferrer" className="contact-pill">
              <span className="contact-pill-dot" style={{ background: '#25d366' }} />
              <i className="fa-brands fa-whatsapp" style={{ color: '#25d366' }} />
              +91 85449-26441
            </a>
            <a href="mailto:jot60103@gmail.com" className="contact-pill">
              <span className="contact-pill-dot" style={{ background: '#ec4899' }} />
              <i className="fa-solid fa-envelope" style={{ color: '#ec4899' }} />
              jot60103@gmail.com
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span>Scroll to explore</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  )
}
