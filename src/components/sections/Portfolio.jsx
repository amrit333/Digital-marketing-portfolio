import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import gsap from 'gsap'
import CaseStudy3D from '../3d/CaseStudy3D'

const CATEGORIES = ['All', 'Instagram', 'YouTube', 'SEO', 'Automation']

const PROJECTS = [
  {
    id: 1,
    period: '2025 — Present',
    title: 'Instagram Launch & Automation',
    client: '@stitcherybypreet',
    clientUrl: 'https://www.instagram.com/stitcherybypreet/',
    industry: 'Handcrafted Fashion',
    platform: 'fa-instagram',
    metric: '85K+ Views',
    metricColor: '#e1306c',
    metricBg: 'rgba(225,48,108,0.12)',
    category: 'Instagram',
    tags: ['ManyChat', 'Reels', 'Automation'],
    challenge: 'Launching a brand new handcrafted fashion label from absolute zero, with no brand equity and initial budget limitations.',
    strategy: 'Built automated comment-to-DM funnels to handle sizing, price sheets, and order links instantly. Published highly structured viral reels leveraging sound tempos and custom brand aesthetic colors.',
    beforeAfter: { before: '0 Followers / 0 Views', after: '85,000+ Month 1 Views / 50K+ Organic Reach' },
    bullets: [
      'Launched content guidelines and calendars for handcrafted fashion aesthetic.',
      'Achieved 85,000+ views in Month 1 with ₹0 ad spends.',
      'Deployed comment-to-DM automated flows to capture queries instantly.'
    ]
  },
  {
    id: 2,
    period: 'Jan 2024 — Present',
    title: 'Organic Lead Generation',
    client: '@solitaireinfosystems',
    clientUrl: 'https://www.instagram.com/solitaireinfosystems/?hl=en',
    industry: 'IT & Software Academy',
    platform: 'fa-instagram',
    metric: '150+ Leads',
    metricColor: '#4f8eff',
    metricBg: 'rgba(79,142,255,0.12)',
    category: 'Automation',
    tags: ['Lead Gen', 'Organic', 'Funnel'],
    challenge: 'Generating premium B2B and B2C client inquiries for software training and consulting services without running paid ads.',
    strategy: 'Designed educational content carousels outlining tech solutions, with Call-To-Action (CTA) automated funnels routing comments directly to resource downloads.',
    beforeAfter: { before: 'Low Engagement / ₹0 conversion', after: '150+ Qualified Leads / 9.2K+ Followers' },
    bullets: [
      'Engineered Story → DM funnel prompting warm leads to request consulting schedules.',
      'Delivered 25+ highly conversion-ready inquiries per month at ₹0 ad spend.',
      'Boosted local brand authority with 120K+ monthly impressions.'
    ]
  },
  {
    id: 3,
    period: '2025 — Present',
    title: 'YouTube Channel Growth',
    client: '@techwealthcoach',
    clientUrl: 'https://www.youtube.com/@techwealthcoach',
    industry: 'Finance & AI Coaching',
    platform: 'fa-youtube',
    metric: '69K+ Impressions',
    metricColor: '#ff0000',
    metricBg: 'rgba(255,0,0,0.10)',
    category: 'YouTube',
    tags: ['YouTube SEO', 'Editing', 'Thumbnails'],
    challenge: 'Gaining viewership in the highly competitive finance and AI coach niches as a new channel creator.',
    strategy: 'Structured editing models focused heavily on the first 5-second retention hooks. Created contrast-rich custom thumbnails and applied metadata SEO tagging.',
    beforeAfter: { before: '0 subscribers / 0 hours', after: '69,800+ Impressions / 100+ Subscribers (28 Days)' },
    bullets: [
      'Authored high-retention video scripts focused on AI tool workflows.',
      'Boosted impressions to 69K+ in 28 days with zero outbound ads.',
      'Optimized titles, tags, and descriptive markers to rank on search indices.'
    ]
  },
  {
    id: 4,
    period: '2026 — Present',
    title: 'SEO & Authority Campaign',
    client: 'Daydream Epoxy',
    clientUrl: null,
    industry: 'Home Renovation & Craft',
    platform: 'fa-globe',
    metric: 'Crawl Audit',
    metricColor: '#8b5cf6',
    metricBg: 'rgba(139,92,246,0.12)',
    category: 'SEO',
    tags: ['Ahrefs', 'SEMrush', 'Backlinks'],
    challenge: 'Fixing website crawl issues and getting search engine ranking positions for competitive terms like floor installations.',
    strategy: 'Conducted a deep crawl audit to fix broken metadata hooks. Secured contextual backlinks and executed targeted competitor keyword gap analysis.',
    beforeAfter: { before: 'Unindexed Pages / Zero Rank', after: 'Fully Indexed Pages / Elevated Organic Traffic' },
    bullets: [
      'Resolved indexing issues and crawl blocks within Search Console.',
      'Built niche backlinks to bolster domain score authority.',
      'Ranked primary floor services in regional searches.'
    ]
  }
]

// Positions cards in a beautiful 3D arc
const SLAB_POSITIONS = [
  [-3.8, 0, -0.6],
  [-1.3, 0, 0],
  [1.3, 0, 0],
  [3.8, 0, -0.6]
]

const SLAB_ROTATIONS = [
  [0, 0.25, 0],
  [0, 0.08, 0],
  [0, -0.08, 0],
  [0, -0.25, 0]
]

function CameraController({ activeProject }) {
  const { camera } = useThree()

  useEffect(() => {
    if (activeProject) {
      const idx = PROJECTS.findIndex(p => p.id === activeProject.id)
      const targetPos = SLAB_POSITIONS[idx] || [0, 0, 0]
      // Zoom camera smoothly onto the card face
      gsap.to(camera.position, {
        x: targetPos[0],
        y: targetPos[1],
        z: 3.8,
        duration: 1.2,
        ease: 'power3.out'
      })
    } else {
      // Zoom out to main gallery scene overview
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 8.5,
        duration: 1.2,
        ease: 'power3.out'
      })
    }
  }, [activeProject, camera])

  return null
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="portfolio" className="portfolio-section" style={{ background: '#030508', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <span className="section-eyebrow">04 — Portfolio</span>
          <h2 className="section-title" style={{ marginTop: 14 }}>
            Live Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Real brands, real results. Zero ad spend. Every metric here is 100% organic.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(cat)
                setActiveProject(null) // Reset zoom
              }}
              style={{
                background: activeFilter === cat ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '10px 24px',
                borderRadius: '100px',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'var(--font-display, Inter)',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.3s'
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* 3D Canvas Showcase */}
        <div style={{ width: '100%', height: 480, position: 'relative', background: 'rgba(5, 7, 16, 0.3)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} gl={{ antialias: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            <Environment preset="city" />

            {PROJECTS.map((proj, idx) => {
              // Filters: Fade out items that do not match the selected category
              const isMatch = activeFilter === 'All' || proj.category === activeFilter
              if (!isMatch) return null

              return (
                <CaseStudy3D
                  key={proj.id}
                  project={proj}
                  position={SLAB_POSITIONS[idx]}
                  initialRotation={SLAB_ROTATIONS[idx]}
                  isFocused={activeProject?.id === proj.id}
                  onSelect={(p) => setActiveProject(activeProject?.id === p.id ? null : p)}
                  onHover={(p) => setHoveredProject(p)}
                />
              )
            })}

            <CameraController activeProject={activeProject} />
          </Canvas>

          {/* Simple controls info hint */}
          <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', pointerEvents: 'none', display: 'flex', gap: 12 }}>
            <span>Drag blocks to inspect in 3D</span>
            <span>•</span>
            <span>Click to zoom & show metrics</span>
          </div>
        </div>

        {/* Immersive detailed modal/overlay panel */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              style={{
                marginTop: 40,
                background: 'rgba(10, 12, 22, 0.65)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: `1px solid ${activeProject.metricColor}40`,
                borderRadius: 24,
                padding: '40px',
                boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 40px ${activeProject.metricColor}10`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 24 }}>
                <div>
                  <span style={{ fontSize: 13, textTransform: 'uppercase', color: activeProject.metricColor, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{activeProject.industry}</span>
                  <h3 style={{ fontFamily: 'var(--font-display, Inter)', fontSize: 32, fontWeight: 800, color: '#fff', marginTop: 4, marginBottom: 8 }}>{activeProject.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.7)' }}>
                    <span>Client: <strong style={{ color: '#fff' }}>{activeProject.client}</strong></span>
                    {activeProject.clientUrl && (
                      <a href={activeProject.clientUrl} target="_blank" rel="noreferrer" style={{ color: activeProject.metricColor, textDecoration: 'none' }}>
                        Visit Link <i className="fa-solid fa-external-link" style={{ fontSize: 11 }} />
                      </a>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16 }}>
                  {activeProject.tags.map(t => (
                    <span key={t} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 16px', borderRadius: 100, fontSize: 13, color: '#fff', fontWeight: 500 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
                {/* Challenge & Strategy */}
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <h4 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Challenge</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>{activeProject.challenge}</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Strategy</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>{activeProject.strategy}</p>
                  </div>
                </div>

                {/* Before vs After & Results */}
                <div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
                    <h4 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Before vs After Metrics</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div style={{ borderRight: '1px solid rgba(255,255,255,0.08)', paddingRight: 8 }}>
                        <span style={{ fontSize: 11, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>Before Campaign</span>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#f87171', marginTop: 4 }}>{activeProject.beforeAfter.before}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: 11, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>After Campaign</span>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#4ade80', marginTop: 4 }}>{activeProject.beforeAfter.after}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Key Highlights</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {activeProject.bullets.map((b, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10 }}>
                          <i className="fa-solid fa-circle-check" style={{ color: activeProject.metricColor, marginTop: 3 }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <button
                  onClick={() => setActiveProject(null)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    padding: '10px 24px',
                    color: '#fff',
                    fontFamily: 'var(--font-display, Inter)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  Close Showcase
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
