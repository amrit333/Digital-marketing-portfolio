import React, { useState } from 'react';
import profileImg from './assets/profile.jpg';
import StatsGrid from './components/StatsGrid';
import ManyChatSimulator from './components/ManyChatSimulator';
import WorkflowVisualizer from './components/WorkflowVisualizer';
import SkillsToolkit from './components/SkillsToolkit';

export default function App() {
  const [contactGoal, setContactGoal] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <>
      {/* Navigation Header */}
      <header style={styles.header}>
        <div className="container" style={styles.headerContainer}>
          <div style={styles.logo}>
            <span style={styles.logoDot} />
            <span style={styles.logoText}>AMRIT.MARKETING</span>
          </div>
          <nav style={styles.nav}>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#stats" style={styles.navLink}>Stats</a>
            <a href="#automation" style={styles.navLink}>Automation</a>
            <a href="#expertise" style={styles.navLink}>Services</a>
            <a href="#skills" style={styles.navLink}>Skills</a>
            <a href="#projects" style={styles.navLink}>Case Studies</a>
            <a href="#contact" className="btn btn-secondary" style={styles.navBtn}>Get Free Audit</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" style={styles.heroSection}>
        <div className="container" style={styles.heroContainer}>
          <div style={styles.heroContent} className="fade-in-up">
            <div style={styles.badgeWrapper}>
              <span style={styles.heroBadge}>
                <i className="fa-solid fa-wand-magic-sparkles" style={{ marginRight: '6px' }}></i>
                AUTOMATION & ORGANIC GROWTH
              </span>
            </div>
            <h1 style={styles.heroTitle}>
              Scale Your Page <br />
              <span className="gradient-text">Faster Than Manual.</span>
            </h1>
            <p style={styles.heroDesc}>
              Digital Marketing Executive with 1.5+ years of experience specializing in Instagram automation, organic growth, AI-powered content strategy, and multi-page social media management.
            </p>
            <div style={styles.heroActionRow}>
              <a href="#automation" className="btn btn-primary">Try Automation Demo</a>
              <a href="#contact" className="btn btn-secondary">Book Growth Session</a>
            </div>
          </div>
          
          <div style={styles.heroVisual} className="float-anim">
            <div style={styles.photoContainer}>
              <img src={profileImg} alt="Amrit - Digital Marketing Expert" style={styles.profilePhoto} />
              <div style={styles.photoGlow} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" style={styles.statsSection}>
        <div className="container">
          <h2 className="section-title">Proven Track Record</h2>
          <p className="section-subtitle">Real metrics, zero ad spend. Delivering engagement and conversions through precision automation.</p>
          <StatsGrid />
        </div>
      </section>

      {/* ManyChat Simulator Section */}
      <section id="automation" style={styles.simulatorSection}>
        <div className="container">
          <h2 className="section-title">Comment-to-DM Funnels</h2>
          <p className="section-subtitle">Meta Business Suite integrations that convert traffic 24/7 without manual inbox management.</p>
          <ManyChatSimulator />
        </div>
      </section>

      {/* Core Expertise / Services */}
      <section id="expertise" style={styles.expertiseSection}>
        <div className="container">
          <h2 className="section-title">Core Capability Stack</h2>
          <p className="section-subtitle">Combining cutting-edge AI content engines with standard marketing automation to deliver hyper-growth.</p>
          
          <div style={styles.expertiseGrid}>
            <div className="glass-card" style={styles.expertiseCard}>
              <div style={{ ...styles.iconCircle, background: 'rgba(0, 132, 255, 0.1)', color: 'var(--accent-blue)' }}>
                <i className="fa-solid fa-robot"></i>
              </div>
              <h3 style={styles.cardTitle}>Meta Automation</h3>
              <p style={styles.cardDesc}>
                Expert in ManyChat automation. Designing comment-triggered flows, story funnels, keyword DM routing, and Meta Business Suite campaigns.
              </p>
            </div>

            <div className="glass-card" style={styles.expertiseCard}>
              <div style={{ ...styles.iconCircle, background: 'rgba(211, 0, 197, 0.1)', color: 'var(--accent-pink)' }}>
                <i className="fa-solid fa-bolt-lightning"></i>
              </div>
              <h3 style={styles.cardTitle}>AI Content Engine</h3>
              <p style={styles.cardDesc}>
                Leveraging ChatGPT for retention-optimized scripting, Leonardo AI for high-CTR design elements, and Canva for high-speed publication.
              </p>
            </div>

            <div className="glass-card" style={styles.expertiseCard}>
              <div style={{ ...styles.iconCircle, background: 'rgba(138, 63, 252, 0.1)', color: 'var(--accent-purple)' }}>
                <i className="fa-solid fa-chart-pie"></i>
              </div>
              <h3 style={styles.cardTitle}>Performance SEO</h3>
              <p style={styles.cardDesc}>
                Technical audits, indexing issue resolution, competitor analysis with Ahrefs/SEMrush, and off-page campaign management for Daydream Epoxy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tools Section */}
      <section id="skills" style={styles.skillsSection}>
        <div className="container">
          <h2 className="section-title">Skills & Toolkit</h2>
          <p className="section-subtitle">60+ tools and competencies across automation, AI, SEO, paid media, and creative production.</p>
          <SkillsToolkit />
        </div>
      </section>

      {/* Case Studies / Projects */}
      <section id="projects" style={styles.projectsSection}>
        <div className="container">
          <h2 className="section-title">Active Case Studies</h2>
          <p className="section-subtitle">Real brands scaled. See how automation and strategic content creation drove reach and captured leads.</p>
          
          <div style={styles.projectsGrid}>
            {/* Stitchery by Preet */}
            <div className="glass-card" style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div>
                  <span style={styles.projectDuration}>2025 – Present</span>
                  <h3 style={styles.projectTitle}>Instagram Launch & Automation</h3>
                  <a href="https://www.instagram.com/stitcherybypreet/" target="_blank" rel="noreferrer" style={styles.projectLink}>
                    <i className="fa-brands fa-instagram" style={{ marginRight: '6px' }}></i> @stitcherybypreet
                  </a>
                </div>
                <div style={{ ...styles.projectMetric, background: 'rgba(0, 230, 118, 0.1)', color: 'var(--accent-green)' }}>
                  85K+ Views
                </div>
              </div>
              <ul style={styles.projectList}>
                <li>Launched handcrafted fashion brand from zero — designed content strategy, visual guidelines, and posting calendars.</li>
                <li>Achieved 85,000+ views and 50,000+ organic reach in month one via trend-optimized reels and niche keyword tagging.</li>
                <li>Deployed comment-to-DM lead capture and auto-replies for product price and details inquiries.</li>
              </ul>
            </div>

            {/* Solitaire Infosys */}
            <div className="glass-card" style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div>
                  <span style={styles.projectDuration}>Jan 2024 – Present</span>
                  <h3 style={styles.projectTitle}>Organic Lead Generation</h3>
                  <a href="https://www.instagram.com/solitaireinfosystems/?hl=en" target="_blank" rel="noreferrer" style={styles.projectLink}>
                    <i className="fa-brands fa-instagram" style={{ marginRight: '6px' }}></i> @solitaireinfosystems
                  </a>
                </div>
                <div style={{ ...styles.projectMetric, background: 'rgba(0, 132, 255, 0.1)', color: 'var(--accent-blue)' }}>
                  150+ Leads
                </div>
              </div>
              <ul style={styles.projectList}>
                <li>Engineered complete organic funnel: Educational content → interactive stories → link-in-bio opt-in → automated DMs.</li>
                <li>Delivered 150+ highly qualified leads in 6 months at ₹0 ad spend (average 25 warm leads per month).</li>
                <li>Scaled page to 9,200+ followers and over 120,000+ monthly impressions, establishing local training brand authority.</li>
              </ul>
            </div>

            {/* Tech Wealth Coach */}
            <div className="glass-card" style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div>
                  <span style={styles.projectDuration}>2025 – Present</span>
                  <h3 style={styles.projectTitle}>YouTube Channel Growth</h3>
                  <a href="https://www.youtube.com/@techwealthcoach" target="_blank" rel="noreferrer" style={styles.projectLink}>
                    <i className="fa-brands fa-youtube" style={{ marginRight: '6px' }}></i> @techwealthcoach
                  </a>
                </div>
                <div style={{ ...styles.projectMetric, background: 'rgba(255, 0, 0, 0.1)', color: '#FF0000' }}>
                  69K+ Impr.
                </div>
              </div>
              <ul style={styles.projectList}>
                <li>Built finance & AI education channel — scripting, video editing (Premiere & CapCut), thumbnail layouts, and SEO.</li>
                <li>Gained 69,800+ impressions, 113+ hours of watch time, and 101 subscribers in 28 days (206% growth vs previous period).</li>
                <li>Optimized keywords, descriptions, and tag architecture to leverage high-competition search volumes.</li>
              </ul>
            </div>

            {/* Off-Page SEO & Daydream Epoxy */}
            <div className="glass-card" style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <div>
                  <span style={styles.projectDuration}>2026 – Present</span>
                  <h3 style={styles.projectTitle}>SEO & Authority Campaign</h3>
                  <span style={{ ...styles.projectLink, color: 'var(--text-muted)' }}>
                    <i className="fa-solid fa-globe" style={{ marginRight: '6px' }}></i> Daydream Epoxy
                  </span>
                </div>
                <div style={{ ...styles.projectMetric, background: 'rgba(138, 63, 252, 0.1)', color: 'var(--accent-purple)' }}>
                  Crawl Audit
                </div>
              </div>
              <ul style={styles.projectList}>
                <li>Conducted complete technical search audit — resolved crawl bugs, optimized meta tags, and expedited search engine indexing.</li>
                <li>Acquired high-quality niche backlinks and conducted gap audits using professional tools (Ahrefs & SEMrush).</li>
                <li>Secured competitive keyword positions, elevating traffic margins within the epoxy and craft floor domains.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Automation pipeline visualization */}
      <section id="pipeline" style={styles.pipelineSection}>
        <div className="container">
          <h2 className="section-title">AI Content Automation Pipeline</h2>
          <p className="section-subtitle">How I combine artificial intelligence workflows with graphic tools to produce ready-to-publish media 3x faster.</p>
          <WorkflowVisualizer />
        </div>
      </section>

      {/* Contact and Interactive Lead Funnel */}
      <section id="contact" style={styles.contactSection}>
        <div className="container">
          <div style={styles.contactSplit}>
            
            {/* Left Col - Bot Funnel */}
            <div style={styles.contactInfoCol}>
              <span style={styles.contactBadge}>INTELLIGENT FORM</span>
              <h2 style={styles.contactTitle}>Ready to Automate Your Business?</h2>
              <p style={styles.contactText}>
                Select an optimization goal to customize your lead flow. Watch this form behave like an automated ManyChat sequence as you interact with it!
              </p>
              
              <div style={styles.goalsContainer}>
                <button
                  type="button"
                  style={{
                    ...styles.goalOption,
                    borderColor: contactGoal === 'leads' ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)',
                    background: contactGoal === 'leads' ? 'rgba(0, 132, 255, 0.1)' : 'rgba(255,255,255,0.02)'
                  }}
                  onClick={() => setContactGoal('leads')}
                >
                  <i className="fa-solid fa-users" style={{ color: 'var(--accent-blue)' }}></i>
                  <div>
                    <p style={styles.goalText}>I want more organic leads</p>
                    <span style={styles.goalSub}>Scale ManyChat & comment-to-DM strategies</span>
                  </div>
                </button>

                <button
                  type="button"
                  style={{
                    ...styles.goalOption,
                    borderColor: contactGoal === 'content' ? 'var(--accent-pink)' : 'rgba(255,255,255,0.05)',
                    background: contactGoal === 'content' ? 'rgba(211, 0, 197, 0.1)' : 'rgba(255,255,255,0.02)'
                  }}
                  onClick={() => setContactGoal('content')}
                >
                  <i className="fa-solid fa-wand-magic-sparkles" style={{ color: 'var(--accent-pink)' }}></i>
                  <div>
                    <p style={styles.goalText}>I want an AI Content Pipeline</p>
                    <span style={styles.goalSub}>Generate scripts & visuals at scale</span>
                  </div>
                </button>

                <button
                  type="button"
                  style={{
                    ...styles.goalOption,
                    borderColor: contactGoal === 'seo' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                    background: contactGoal === 'seo' ? 'rgba(138, 63, 252, 0.1)' : 'rgba(255,255,255,0.02)'
                  }}
                  onClick={() => setContactGoal('seo')}
                >
                  <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--accent-purple)' }}></i>
                  <div>
                    <p style={styles.goalText}>I need an SEO & Backlink Audit</p>
                    <span style={styles.goalSub}>Conduct crawl optimization and gap analysis</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Col - Contact Form */}
            <div className="glass-card" style={styles.contactFormCard}>
              {formSubmitted ? (
                <div style={styles.successState}>
                  <div style={styles.successCheck}>
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <h3>Sequence Triggered!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '10px' }}>
                    ManyChat has successfully logged your request for: <strong>{contactGoal === 'leads' ? 'Organic Lead Gen' : contactGoal === 'content' ? 'AI Pipelines' : 'SEO Audit'}</strong>.
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '12px' }}>
                    Amrit will get back to you shortly with custom templates.
                  </p>
                  <button onClick={() => { setFormSubmitted(false); setContactGoal(''); }} style={{ ...styles.submitBtn, marginTop: '24px' }}>
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleFormChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Custom Requirements (Optional)</label>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Tell me about your page or current marketing bottlenecks..."
                      value={formData.message}
                      onChange={handleFormChange}
                      style={styles.textarea}
                    />
                  </div>
                  
                  {contactGoal && (
                    <div style={styles.flowStatusBadge}>
                      <i className="fa-solid fa-robot" style={{ marginRight: '6px' }}></i>
                      Active Bot Customization: {contactGoal.toUpperCase()} flow active
                    </div>
                  )}

                  <button type="submit" style={styles.submitBtn}>
                    Send & Trigger Sequence
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="container" style={styles.footerContainer}>
          <p style={styles.footerCopy}>&copy; 2026 Amrit. All rights reserved. Created with marketing automation.</p>
          <div style={styles.footerSocials}>
            <a href="https://www.instagram.com/stitcherybypreet/" target="_blank" rel="noreferrer" style={styles.socialIconLink}><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.youtube.com/@techwealthcoach" target="_blank" rel="noreferrer" style={styles.socialIconLink}><i className="fa-brands fa-youtube"></i></a>
            <a href="https://www.instagram.com/solitaireinfosystems/?hl=en" target="_blank" rel="noreferrer" style={styles.socialIconLink}><i className="fa-solid fa-link"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    background: 'rgba(6, 7, 11, 0.8)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    zIndex: 100,
    height: '70px',
    display: 'flex',
    alignItems: 'center'
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  logoDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-pink) 100%)',
    boxShadow: '0 0 10px var(--accent-blue)'
  },
  logoText: {
    fontWeight: '800',
    fontSize: '16px',
    fontFamily: 'var(--font-heading)',
    letterSpacing: '0.05em'
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px'
  },
  navLink: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'var(--transition-fast)'
  },
  navBtn: {
    padding: '8px 16px',
    fontSize: '13px'
  },
  heroSection: {
    paddingTop: '140px',
    paddingBottom: '80px',
    display: 'flex',
    alignItems: 'center'
  },
  heroContainer: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '60px',
    alignItems: 'center'
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  badgeWrapper: {
    marginBottom: '20px'
  },
  heroBadge: {
    background: 'rgba(211, 0, 197, 0.1)',
    border: '1px solid rgba(211, 0, 197, 0.3)',
    color: 'var(--accent-pink)',
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 16px',
    borderRadius: '30px',
    letterSpacing: '0.05em'
  },
  heroTitle: {
    fontSize: '60px',
    lineHeight: '1.1',
    fontWeight: '800',
    marginBottom: '24px'
  },
  heroDesc: {
    fontSize: '18px',
    color: 'var(--text-secondary)',
    marginBottom: '36px',
    lineHeight: '1.6'
  },
  heroActionRow: {
    display: 'flex',
    gap: '16px'
  },
  heroVisual: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoContainer: {
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    position: 'relative',
    padding: '6px',
    background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-pink) 50%, var(--accent-purple) 100%)',
    boxShadow: '0 20px 50px rgba(138, 63, 252, 0.2)'
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid var(--bg-main)'
  },
  photoGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    filter: 'blur(30px)',
    background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-pink) 100%)',
    zIndex: -1,
    opacity: 0.5
  },
  statsSection: {
    background: 'rgba(255, 255, 255, 0.01)',
    borderBlock: '1px solid rgba(255, 255, 255, 0.03)'
  },
  simulatorSection: {},
  skillsSection: {
    background: 'linear-gradient(180deg, rgba(138, 63, 252, 0.03) 0%, rgba(6, 7, 11, 0) 100%)',
  },
  expertiseSection: {
    background: 'rgba(255, 255, 255, 0.01)',
    borderBlock: '1px solid rgba(255, 255, 255, 0.03)'
  },
  expertiseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px'
  },
  expertiseCard: {
    padding: '40px 30px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  iconCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginBottom: '24px'
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '12px'
  },
  cardDesc: {
    fontSize: '15px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6'
  },
  projectsSection: {},
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px'
  },
  projectCard: {
    padding: '36px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%'
  },
  projectDuration: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    fontWeight: '600',
    display: 'block',
    marginBottom: '6px'
  },
  projectTitle: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '6px'
  },
  projectLink: {
    fontSize: '14px',
    color: 'var(--accent-blue)',
    textDecoration: 'none',
    fontWeight: '600'
  },
  projectMetric: {
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 12px',
    borderRadius: '8px'
  },
  projectList: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  pipelineSection: {
    background: 'rgba(255, 255, 255, 0.01)',
    borderBlock: '1px solid rgba(255, 255, 255, 0.03)'
  },
  contactSection: {},
  contactSplit: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px',
    alignItems: 'center'
  },
  contactInfoCol: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  contactBadge: {
    background: 'rgba(138, 63, 252, 0.15)',
    color: 'var(--accent-purple)',
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 14px',
    borderRadius: '30px',
    letterSpacing: '0.05em',
    marginBottom: '16px'
  },
  contactTitle: {
    fontSize: '36px',
    lineHeight: '1.2',
    marginBottom: '20px'
  },
  contactText: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    marginBottom: '32px'
  },
  goalsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%'
  },
  goalOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    color: '#fff',
    transition: 'all 0.3s ease'
  },
  goalText: {
    fontSize: '15px',
    fontWeight: '600'
  },
  goalSub: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  contactFormCard: {
    padding: '40px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    textAlign: 'left'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-secondary)'
  },
  input: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  textarea: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    resize: 'none',
    transition: 'border-color 0.3s ease'
  },
  flowStatusBadge: {
    background: 'rgba(0, 230, 118, 0.1)',
    color: 'var(--accent-green)',
    border: '1px solid rgba(0, 230, 118, 0.2)',
    padding: '10px 14px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '600'
  },
  submitBtn: {
    background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
    color: '#fff',
    border: 'none',
    padding: '16px',
    borderRadius: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  },
  successState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
    textAlign: 'center'
  },
  successCheck: {
    fontSize: '48px',
    color: 'var(--accent-green)',
    marginBottom: '20px'
  },
  footer: {
    background: '#040508',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '40px 0'
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px'
  },
  footerCopy: {
    fontSize: '14px',
    color: 'var(--text-muted)'
  },
  footerSocials: {
    display: 'flex',
    gap: '16px'
  },
  socialIconLink: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease'
  }
};
