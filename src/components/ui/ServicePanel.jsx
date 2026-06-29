import { motion, AnimatePresence } from 'framer-motion'

const SERVICE_DETAILS = {
  'Social Media Marketing': {
    process: ['Competitor & Audience Analysis', 'Content Calendar Creation', 'Reel Frame Optimization', 'Community Engagement & Outreach'],
    benefits: ['Consistent organic brand awareness', 'Warm community building', 'High engagement growth'],
    tools: ['Figma', 'Hootsuite', 'Later', 'Meta Creator Studio'],
    results: ['85K+ views within 30 days', '300% reach margin increase']
  },
  'Meta Ads': {
    process: ['Pixel & Conversion API Setup', 'Custom Audience Definition', 'A/B Creative & Hook Testing', 'ROAS Scaling & Optimization'],
    benefits: ['Instant lead flow', 'Targeted audience acquisition', 'Compound scaling'],
    tools: ['Meta Ads Manager', 'Facebook Pixel', 'ManyChat', 'Google Analytics'],
    results: ['42% CPL reduction', 'Managed ₹20L+ ad spend']
  },
  'Google Ads': {
    process: ['Intent Keyword Mapping', 'Compelling Ad Copy Writing', 'Negative Keyword Audits', 'Conversion Tracking Verification'],
    benefits: ['High purchase-intent traffic', 'Instant search presence', 'Stable conversion margins'],
    tools: ['Google Ads dashboard', 'Google Keyword Planner', 'Google Tag Manager', 'GA4'],
    results: ['6.5x ROAS achieved', 'Top of page search visibility']
  },
  'Lead Generation': {
    process: ['ManyChat DM Automation Mapping', 'Lead Magnet Creation', 'Opt-In Page Funneling', 'Immediate Auto-Reply Rules Setup'],
    benefits: ['24/7 client booking', '₹0 ad spend lead generation', 'Zero manual response lag'],
    tools: ['ManyChat Pro', 'Zapier', 'Instagram DM API', 'Airtable'],
    results: ['150+ organic warm leads', 'Automated comment-to-DM triggers']
  },
  'AI Automation': {
    process: ['Workflow Bottleneck Identification', 'Zapier Integration Hooking', 'AI Script Drafting (GPT-4)', 'Automated Bulk Creation Pipeline'],
    benefits: ['70% manual labor time reduced', 'Fast asset publishing', 'Consistent post frequency'],
    tools: ['OpenAI API', 'Leonardo AI', 'Zapier', 'Make.com'],
    results: ['Saved 30+ hours/week', 'Scale content output by 3x']
  },
  'Website Development': {
    process: ['Layout & Structure Blueprinting', 'Elementor Page Construction', 'Speed & Caching Optimization', 'SEO Metadata Injecting'],
    benefits: ['High-converting landing pages', 'Super fast page load times', 'Search engine friendly code'],
    tools: ['WordPress', 'Elementor Pro', 'WP Rocket', 'Cloudflare'],
    results: ['Built 5+ landing pages', '90+ Google Lighthouse score']
  },
  'Brand Strategy': {
    process: ['Brand Identity Strategy Session', 'Color & Font Guide Building', 'Market Positioning Definition', 'Content Pillar Structuring'],
    benefits: ['Distinct market voice', 'Cohesive multi-channel visuals', 'Trust-focused client perception'],
    tools: ['Figma', 'Adobe Illustrator', 'Notion', 'Brand Mindmaps'],
    results: ['Completed 3 brand launch strategies', 'Consistent aesthetic guidelines']
  },
  'Content Marketing': {
    process: ['Problem-Solution Content Planning', 'Visual Hook Construction', 'Copywriting & Call-to-Actions', 'Repurposing Across Channels'],
    benefits: ['Establishes niche authority', 'Nurtures passive followers', 'Improves landing conversions'],
    tools: ['Notion', 'Google Docs', 'Trello', 'Canva'],
    results: ['Compound organic conversion rates', 'Increased click-through by 25%']
  },
  'SEO': {
    process: ['Technical Crawl Error Fixing', 'Keyword Difficulty Mapping', 'Competitor Gap Audits', 'Backlink Prospect Acquisition'],
    benefits: ['Long-term compounding search traffic', 'Zero dependency on ad spends', 'Authority search rankings'],
    tools: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'Google Search Console'],
    results: ['Expedited crawling indexing', 'Secured high difficulty keyword positions']
  },
  'Video Marketing': {
    process: ['YouTube SEO Title & Hook Tagging', 'Dynamic Retention Video Editing', 'High-CTR Thumbnail A/B Test Design', 'Performance Metrics Audits'],
    benefits: ['Long-term evergreen view counts', 'Strong emotional connection', 'High engagement and subscribers'],
    tools: ['Adobe Premiere Pro', 'CapCut', 'Photoshop', 'TubeBuddy'],
    results: ['69K YouTube impressions in 28 days', '101+ subscribers in a month']
  }
}

export default function ServicePanel({ service, onClose }) {
  if (!service) return null

  const details = SERVICE_DETAILS[service.title] || {
    process: ['Planning', 'Execution', 'Testing', 'Handoff'],
    benefits: ['High quality results', 'Reliable operation', 'Full transparency'],
    tools: ['Standard platforms'],
    results: ['Improved conversions']
  }

  const handleContentClick = (e) => {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5, 7, 12, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
          zIndex: 100
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          onClick={handleContentClick}
          style={{
            position: 'relative',
            width: '90%',
            maxWidth: 680,
            maxHeight: '80vh',
            background: 'rgba(10, 15, 30, 0.7)',
            backdropFilter: 'blur(45px)',
            WebkitBackdropFilter: 'blur(45px)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            borderRadius: 24,
            padding: 40,
            overflowY: 'auto',
            boxShadow: `0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 40px ${service.color}15`,
          }}
          className="skill-panel-scroll premium-glass-panel"
        >
          {/* Top-right radial glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 24,
            pointerEvents: 'none',
            background: `radial-gradient(circle at top right, ${service.color}20, transparent 65%)`,
            zIndex: 0
          }} />
          
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: 40,
              height: 40,
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <i className="fa-solid fa-times" />
          </button>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>{service.icon}</div>
            <h2 style={{
              fontFamily: 'var(--font-display, Inter)',
              fontSize: 36,
              fontWeight: 800,
              color: '#fff',
              marginBottom: 12,
              letterSpacing: '-0.02em',
              textShadow: `0 0 20px ${service.color}40`
            }}>
              {service.title}
            </h2>
            <div style={{ width: 60, height: 4, background: service.color, borderRadius: 2, marginBottom: 24, boxShadow: `0 0 10px ${service.color}` }} />

            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 32 }}>
              {service.desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
              {/* Process */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: 20, borderRadius: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 8 }}>Delivery Process</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {details.process.map((step, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                      <span style={{ color: service.color }}>{idx + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: 20, borderRadius: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 8 }}>Key Benefits</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {details.benefits.map((benefit, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                      <i className="fa-solid fa-check" style={{ color: service.color, marginTop: 3 }} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Tools Used */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: 20, borderRadius: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 8 }}>Tools Used</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {details.tools.map((tool, idx) => (
                    <span key={idx} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: 8, fontSize: 12, color: '#fff' }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expected Results */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: 20, borderRadius: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 8 }}>Expected Results</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {details.results.map((result, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                      <i className="fa-solid fa-square-poll-vertical" style={{ color: service.color, marginTop: 3 }} />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
