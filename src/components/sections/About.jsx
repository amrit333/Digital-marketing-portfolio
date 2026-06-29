import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import AboutCube3D from '../3d/AboutCube3D'

const INFO_ITEMS = [
  { icon: '🎓', label: 'Education', value: 'Digital Marketing & Analytics', color: '#4f8eff', bg: 'rgba(79,142,255,0.1)' },
  { icon: '📍', label: 'Location',  value: 'India — Available Worldwide',   color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { icon: '💼', label: 'Status',    value: 'Open to Full-Time & Freelance',  color: '#ec4899', bg: 'rgba(236,72,153,0.1)' },
  { icon: '⚡', label: 'Specialty', value: 'Instagram Automation & SEO',     color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const [selectedFace, setSelectedFace] = useState(null)

  return (
    <section id="about" className="about-section" style={{ background: '#030508', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        <motion.div
          ref={ref}
          className="about-grid"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', gap: 60, alignItems: 'center' }}
        >
          {/* ── LEFT: R3F 3D Cube Scene ── */}
          <motion.div variants={fadeUp} transition={{ duration: 0.8 }} style={{ position: 'relative', width: '100%', height: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: 380, position: 'relative', cursor: 'grab' }}>
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                <AboutCube3D onFaceClick={(face) => setSelectedFace(face)} />
              </Canvas>
            </div>
            
            <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 12 }}>
              Drag to rotate & inspect • Click a face to align
            </p>

            {/* Elegant face detail panel overlay */}
            <AnimatePresence>
              {selectedFace && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    bottom: -30,
                    width: '90%',
                    background: 'rgba(10, 15, 30, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(79, 142, 255, 0.25)',
                    borderRadius: 16,
                    padding: '16px 20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(79,142,255,0.1)',
                    zIndex: 10,
                    textAlign: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 20 }}>{selectedFace.icon}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#fff' }}>{selectedFace.label}</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#4f8eff', fontWeight: 600, marginBottom: 4 }}>{selectedFace.value}</div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{selectedFace.desc}</p>
                  <button 
                    onClick={() => setSelectedFace(null)}
                    style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12 }}
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Text + info items ── */}
          <div>
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="section-eyebrow"
            >
              01 — About Me
            </motion.span>

            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="section-title"
              style={{ marginTop: 16 }}
            >
              Turning Attention Into{' '}
              <span className="gradient-text">Revenue</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: 16,
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              I'm Amrit — a Digital Marketing Executive who blends AI-powered content
              engines, Meta automation, and data-driven SEO to help brands scale
              faster than manual methods ever could.
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: 16,
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              From zero-to-viral Instagram launches to 150+ organic leads with ₹0 ad
              spend — I use smart automation and creativity to deliver results that
              compound over time. Every strategy is built around your audience,
              your funnel, and your growth goals.
            </motion.p>

            <div className="about-info-list">
              {INFO_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="about-info-item"
                >
                  <div
                    className="about-info-icon"
                    style={{ background: item.bg, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
