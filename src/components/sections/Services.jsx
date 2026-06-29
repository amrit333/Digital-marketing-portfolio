import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ServiceCard3D from '../3d/ServiceCard3D'
import ServicePanel from '../ui/ServicePanel'

export const SERVICES = [
  {
    icon: '📱',
    title: 'Social Media Marketing',
    desc: 'Full-funnel Instagram & Facebook strategy with content calendars, engagement tactics, and viral reel frameworks.',
    color: '#e1306c',
    bg: 'rgba(225,48,108,0.1)',
  },
  {
    icon: '⚡',
    title: 'Meta Ads',
    desc: 'Performance campaigns on Facebook & Instagram — audience research, creative testing, and ROAS optimisation.',
    color: '#1877f2',
    bg: 'rgba(24,119,242,0.1)',
  },
  {
    icon: '🎯',
    title: 'Google Ads',
    desc: 'Search, display, and YouTube campaigns with precision keyword targeting and conversion-focused landing pages.',
    color: '#fbbc04',
    bg: 'rgba(251,188,4,0.1)',
  },
  {
    icon: '🎪',
    title: 'Lead Generation',
    desc: 'Comment-to-DM funnels, ManyChat automation, and opt-in sequences that capture warm leads 24/7 at ₹0 ad spend.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    icon: '🤖',
    title: 'AI Automation',
    desc: 'GPT-powered scripting, Leonardo AI visuals, Zapier workflows, and automated publishing pipelines.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    icon: '🌐',
    title: 'Website Development',
    desc: 'WordPress sites built for speed, conversion, and SEO — from landing pages to full e-commerce stores.',
    color: '#21759b',
    bg: 'rgba(33,117,155,0.1)',
  },
  {
    icon: '🏷️',
    title: 'Brand Strategy',
    desc: 'Visual identity, tone-of-voice guidelines, content pillars, and positioning that makes your brand unforgettable.',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
  },
  {
    icon: '✍️',
    title: 'Content Marketing',
    desc: 'Retention-optimised reels, blog posts, carousels, and email sequences engineered to convert viewers into buyers.',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
  },
  {
    icon: '🔍',
    title: 'SEO',
    desc: 'Technical audits, keyword gap analysis with Ahrefs/SEMrush, off-page link acquisition, and rank tracking.',
    color: '#4f8eff',
    bg: 'rgba(79,142,255,0.1)',
  },
  {
    icon: '🎬',
    title: 'Video Marketing',
    desc: 'YouTube channel strategy, video editing (Premiere Pro & CapCut), thumbnail design, and SEO for maximum reach.',
    color: '#ff0000',
    bg: 'rgba(255,0,0,0.08)',
  },
]

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeService, setActiveService] = useState(null)

  return (
    <section id="services" className="services-section" style={{ background: '#050709', padding: '100px 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="section-eyebrow">03 — Services</span>
          <h2 className="section-title" style={{ marginTop: 14 }}>
            What I <span className="gradient-text">Deliver</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A full suite of digital marketing services designed to scale your brand,
            automate your pipeline, and compound your results over time.
          </p>
        </motion.div>

        {/* Responsive CSS Grid Container containing individual Canvases */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 32,
          width: '100%'
        }}>
          {SERVICES.map((service) => (
            <ServiceCard3D 
              key={service.title} 
              service={service} 
              onClick={() => setActiveService(service)}
            />
          ))}
        </div>
      </div>

      {/* Floating Detailed Panel Modal */}
      <ServicePanel service={activeService} onClose={() => setActiveService(null)} />
    </section>
  )
}
