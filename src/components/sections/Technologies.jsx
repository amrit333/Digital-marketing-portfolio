import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TECH = [
  { name: 'Meta Ads', icon: 'fa-facebook' },
  { name: 'Google Ads', icon: 'fa-google' },
  { name: 'Instagram', icon: 'fa-instagram' },
  { name: 'YouTube', icon: 'fa-youtube' },
  { name: 'LinkedIn', icon: 'fa-linkedin' },
  { name: 'WordPress', icon: 'fa-wordpress' },
  { name: 'Canva', icon: 'fa-pen-nib' }, // fallback icon
  { name: 'OpenAI', icon: 'fa-robot' },
  { name: 'Mailchimp', icon: 'fa-envelope-open-text' },
  { name: 'Analytics', icon: 'fa-chart-line' },
  { name: 'Zapier', icon: 'fa-bolt' },
  { name: 'ManyChat', icon: 'fa-comments' },
  { name: 'Figma', icon: 'fa-figma' },
  { name: 'Notion', icon: 'fa-book-open' }
]

export default function Technologies() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="technologies" className="tech-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-eyebrow">07 — Tools</span>
          <h2 className="section-title" style={{ marginTop: 14 }}>Tech <span className="gradient-text">Stack</span></h2>
        </div>

        <motion.div 
          ref={ref}
          className="tech-grid"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {TECH.map((t, i) => (
            <motion.div 
              key={i} 
              className="tech-item"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <i className={`fa-brands ${t.icon} tech-icon`} style={{ color: 'var(--text-secondary)' }} />
              <span className="tech-name">{t.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
