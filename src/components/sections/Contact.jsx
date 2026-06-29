import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate sending
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-grid">
        
        <div style={{ paddingRight: 40 }}>
          <span className="section-eyebrow">08 — Contact</span>
          <h2 className="section-title" style={{ marginTop: 14, fontSize: 42 }}>Let's Build Something <span className="gradient-text">Great</span></h2>
          <p className="section-subtitle" style={{ textAlign: 'left', margin: '20px 0 0 0' }}>
            Whether you need a complete organic funnel, an AI content pipeline, or a high-converting ad campaign, I'm ready to help you scale.
          </p>

          <div className="contact-direct-links">
            <a href="https://wa.me/918544926441" target="_blank" rel="noreferrer" className="contact-link-card">
              <div className="contact-link-icon" style={{ background: 'rgba(37,211,102,0.1)', color: '#25D366' }}>
                <i className="fa-brands fa-whatsapp" />
              </div>
              <div className="contact-link-text">
                <div className="contact-link-label">WhatsApp</div>
                <div className="contact-link-value">+91 85449-26441</div>
              </div>
              <i className="fa-solid fa-arrow-right contact-arrow" />
            </a>

            <a href="mailto:jot60103@gmail.com" className="contact-link-card">
              <div className="contact-link-icon" style={{ background: 'rgba(236,72,153,0.1)', color: '#ec4899' }}>
                <i className="fa-solid fa-envelope" />
              </div>
              <div className="contact-link-text">
                <div className="contact-link-label">Email</div>
                <div className="contact-link-value">jot60103@gmail.com</div>
              </div>
              <i className="fa-solid fa-arrow-right contact-arrow" />
            </a>

            <a href="https://drive.google.com/file/d/10BDaCvF14NrWOMfHKzajatG_sb1K9WyR/view?usp=sharing" target="_blank" rel="noreferrer" className="contact-link-card">
              <div className="contact-link-icon" style={{ background: 'rgba(79,142,255,0.1)', color: '#4f8eff' }}>
                <i className="fa-solid fa-file-pdf" />
              </div>
              <div className="contact-link-text">
                <div className="contact-link-label">Resume</div>
                <div className="contact-link-value">Download CV</div>
              </div>
              <i className="fa-solid fa-arrow-right contact-arrow" />
            </a>
          </div>
        </div>

        <div className="glass-card contact-form">
          {status === 'success' ? (
            <motion.div 
              className="form-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <i className="fa-solid fa-circle-check success-icon" />
              <h3>Message Sent!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>I'll get back to you within 24 hours.</p>
              <button className="btn btn-secondary" onClick={() => setStatus('idle')} style={{ marginTop: 20 }}>
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" className="form-input" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="john@company.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" rows="4" placeholder="Tell me about your goals..." required />
              </div>
              <button type="submit" className="form-submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
