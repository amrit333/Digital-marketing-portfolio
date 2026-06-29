import { motion, AnimatePresence } from 'framer-motion'

export default function SkillPanel({ skill, onClose }) {
  if (!skill) return null

  // Ensure clicks inside the panel content don't trigger the click-outside close
  const handleContentClick = (e) => {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      {/* Full screen backdrop for click-outside close */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5, 7, 12, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
          zIndex: 100
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          onClick={handleContentClick}
          style={{
            position: 'relative',
            width: '90%',
            maxWidth: 600,
            maxHeight: '80vh',
            background: 'rgba(10, 15, 30, 0.65)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            borderRadius: 24,
            padding: '40px',
            overflowY: 'auto',
            boxShadow: `0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 40px ${skill.color}15`,
          }}
          className="skill-panel-scroll premium-glass-panel"
        >
          {/* Radial glow matching skill's color */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 24,
            pointerEvents: 'none',
            background: `radial-gradient(circle at top right, ${skill.color}15, transparent 65%)`,
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
            <h2 style={{
              fontFamily: 'var(--font-display, Inter)',
              fontSize: 42,
              fontWeight: 800,
              color: '#fff',
              marginBottom: 12,
              letterSpacing: '-0.02em',
              textShadow: `0 0 20px ${skill.color}40`
            }}>
              {skill.name}
            </h2>
            <div style={{ width: 60, height: 4, background: skill.color, borderRadius: 2, marginBottom: 32, boxShadow: `0 0 10px ${skill.color}` }} />

            {/* Progress Ring and Stats */}
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 40 }}>
              <div style={{ position: 'relative', width: 90, height: 90 }}>
                <svg width="90" height="90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <motion.circle 
                    cx="50" cy="50" r="40" fill="none" stroke={skill.color} strokeWidth="8"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * skill.score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    style={{ transformOrigin: 'center', transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 8px ${skill.color}80)` }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display, Inter)' }}>{skill.score}%</span>
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Expertise Level</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>Expert</div>
              </div>
            </div>

            {/* Experience Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: 20, borderRadius: 16 }}>
                <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Experience</div>
                <div style={{ fontSize: 20, color: '#fff', fontWeight: 700 }}>{skill.exp}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: 20, borderRadius: 16 }}>
                <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Budget Managed</div>
                <div style={{ fontSize: 20, color: '#fff', fontWeight: 700 }}>{skill.budget}</div>
              </div>
            </div>

            {/* Projects */}
            {skill.projects && skill.projects.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Key Projects & Results</h3>
                {skill.projects.map((proj, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 24, borderRadius: 16, marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontWeight: 700, fontSize: 18, color: '#fff' }}>{proj.name}</span>
                      <span style={{ background: `${skill.color}20`, border: `1px solid ${skill.color}40`, color: skill.color, padding: '4px 12px', borderRadius: 100, fontSize: 13, fontWeight: 600 }}>{proj.result}</span>
                    </div>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>{proj.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {skill.achievements && skill.achievements.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Measurable Achievements</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {skill.achievements.map((ach, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16, fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>
                      <i className="fa-solid fa-check" style={{ color: skill.color, marginTop: 4, fontSize: 14, background: `${skill.color}20`, padding: 6, borderRadius: '50%' }} />
                      <span style={{ lineHeight: 1.5 }}>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            {skill.tech && skill.tech.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Tools & Technologies</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {skill.tech.map((t, idx) => (
                    <span key={idx} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 100, fontSize: 14, color: '#fff', fontWeight: 500, transition: 'all 0.2s', cursor: 'default' }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = skill.color; e.currentTarget.style.background = `${skill.color}10` }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
