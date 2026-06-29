import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const STATS = [
  { label: 'Projects Completed', value: 12, suffix: '+', icon: 'fa-briefcase' },
  { label: 'Clients Served',     value: 8,  suffix: '+', icon: 'fa-handshake' },
  { label: 'Leads Generated',    value: 10, suffix: 'K+', icon: 'fa-users' },
  { label: 'Campaign Reach',     value: 2,  suffix: 'M+', icon: 'fa-eye' },
  { label: 'Ad Spend Managed',   value: 25, suffix: 'L+', icon: 'fa-indian-rupee-sign' },
  { label: 'Average ROI',        value: 4,  suffix: 'x',  icon: 'fa-arrow-trend-up' },
]

function Counter({ endValue, suffix }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let start = 0
      const duration = 2000
      const increment = endValue / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= endValue) {
          setCount(endValue)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [inView, endValue])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="stats-grid"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-card stat-card"
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
            >
              <i className={`fa-solid ${stat.icon} stat-icon`} style={{ color: 'var(--vivid-purple)' }} />
              <div className="stat-value">
                <Counter endValue={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
