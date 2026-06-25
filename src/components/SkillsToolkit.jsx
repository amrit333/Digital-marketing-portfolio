import React, { useState } from 'react';

const skillCategories = [
  {
    id: 'automation',
    title: 'Automation',
    icon: 'fa-solid fa-robot',
    color: '#0084ff',
    tools: [
      { name: 'ManyChat', level: 'Expert' },
      { name: 'Meta Business Suite', level: 'Expert' },
      { name: 'Comment-to-DM Flows', level: 'Expert' },
      { name: 'Auto-Reply Systems', level: 'Expert' },
      { name: 'Story Response Triggers', level: 'Advanced' },
      { name: 'Keyword DM Funnels', level: 'Expert' },
      { name: 'Instagram Automation', level: 'Expert' },
      { name: 'Lead Capture Automation', level: 'Expert' },
    ],
  },
  {
    id: 'social',
    title: 'Social Media',
    icon: 'fa-solid fa-share-nodes',
    color: '#E1306C',
    tools: [
      { name: 'Instagram Growth Strategy', level: 'Expert' },
      { name: 'Multi-Page Management', level: 'Expert' },
      { name: 'Organic Lead Generation', level: 'Expert' },
      { name: 'Content Calendars', level: 'Advanced' },
      { name: 'Reel Strategy', level: 'Expert' },
      { name: 'Audience Engagement', level: 'Advanced' },
      { name: 'Hashtag Research', level: 'Advanced' },
      { name: 'YouTube SEO', level: 'Advanced' },
      { name: 'WhatsApp Marketing', level: 'Intermediate' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Content',
    icon: 'fa-solid fa-brain',
    color: '#c084fc',
    tools: [
      { name: 'Flow AI', level: 'Expert', highlight: true },
      { name: 'Claude', level: 'Expert', highlight: true },
      { name: 'ChatGPT', level: 'Expert' },
      { name: 'Leonardo AI', level: 'Expert' },
      { name: 'Perplexity AI', level: 'Advanced' },
      { name: 'Prompt Engineering', level: 'Expert' },
      { name: 'AI Content Pipelines', level: 'Expert' },
      { name: 'Generative AI Strategy', level: 'Advanced' },
      { name: 'AI Copywriting', level: 'Advanced' },
      { name: 'n8n', level: 'Learning' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Analytics',
    icon: 'fa-solid fa-magnifying-glass-chart',
    color: '#00e676',
    tools: [
      { name: 'On-Page SEO', level: 'Advanced' },
      { name: 'Off-Page SEO', level: 'Advanced' },
      { name: 'Technical SEO', level: 'Advanced' },
      { name: 'Keyword Research', level: 'Advanced' },
      { name: 'Link Building', level: 'Advanced' },
      { name: 'Google Analytics 4', level: 'Intermediate' },
      { name: 'Google Search Console', level: 'Advanced' },
      { name: 'SEMrush', level: 'Advanced' },
      { name: 'Ahrefs', level: 'Advanced' },
      { name: 'Ubersuggest', level: 'Intermediate' },
      { name: 'Yoast SEO', level: 'Advanced' },
    ],
  },
  {
    id: 'paid',
    title: 'Paid Marketing',
    icon: 'fa-solid fa-bullhorn',
    color: '#ff9100',
    tools: [
      { name: 'Meta Ads Manager', level: 'Advanced' },
      { name: 'Google Ads', level: 'Intermediate' },
      { name: 'PPC Fundamentals', level: 'Intermediate' },
      { name: 'Pixel Setup', level: 'Advanced' },
      { name: 'Conversion Tracking', level: 'Advanced' },
      { name: 'A/B Testing', level: 'Advanced' },
      { name: 'Performance Marketing', level: 'Intermediate' },
    ],
  },
  {
    id: 'design',
    title: 'Design & Video',
    icon: 'fa-solid fa-palette',
    color: '#00c4cc',
    tools: [
      { name: 'Canva', level: 'Expert' },
      { name: 'Adobe Premiere Pro', level: 'Advanced' },
      { name: 'CapCut', level: 'Expert' },
      { name: 'Thumbnail Design', level: 'Expert' },
      { name: 'Reel Creation', level: 'Expert' },
      { name: 'WordPress', level: 'Advanced' },
      { name: 'Brand Visual Design', level: 'Advanced' },
    ],
  },
];

/* Small set of marquee tools for the infinite scroll banner */
const marqueeTools = [
  'ManyChat', 'Flow AI', 'Claude', 'ChatGPT', 'Leonardo AI',
  'SEMrush', 'Ahrefs', 'Meta Ads', 'Canva', 'CapCut',
  'Premiere Pro', 'Google Analytics 4', 'Perplexity AI',
  'Instagram', 'YouTube SEO', 'n8n', 'WordPress',
];

const levelColors = {
  Expert: '#00e676',
  Advanced: '#0084ff',
  Intermediate: '#ff9100',
  Learning: '#c084fc',
};

export default function SkillsToolkit() {
  const [activeCategory, setActiveCategory] = useState('automation');

  const activeCat = skillCategories.find((c) => c.id === activeCategory);

  return (
    <div style={styles.wrapper}>
      {/* Infinite marquee banner */}
      <div style={styles.marqueeContainer}>
        <div style={styles.marqueeTrack}>
          {[...marqueeTools, ...marqueeTools].map((tool, i) => (
            <span key={i} style={styles.marqueeItem}>
              <i className="fa-solid fa-circle" style={{ fontSize: '4px', opacity: 0.3, marginRight: '12px' }}></i>
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Category tab pills */}
      <div style={styles.tabBar}>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              ...styles.tabBtn,
              background: activeCategory === cat.id ? `${cat.color}15` : 'rgba(255,255,255,0.02)',
              borderColor: activeCategory === cat.id ? cat.color : 'rgba(255,255,255,0.06)',
              color: activeCategory === cat.id ? '#fff' : 'var(--text-secondary)',
            }}
          >
            <i className={cat.icon} style={{ color: cat.color, fontSize: '14px' }}></i>
            <span>{cat.title}</span>
            <span style={{ ...styles.countBadge, background: `${cat.color}20`, color: cat.color }}>
              {cat.tools.length}
            </span>
          </button>
        ))}
      </div>

      {/* Active category display */}
      {activeCat && (
        <div className="glass-card" style={styles.displayPanel}>
          {/* Header row */}
          <div style={styles.panelHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  ...styles.catIcon,
                  background: `${activeCat.color}15`,
                  color: activeCat.color,
                }}
              >
                <i className={activeCat.icon}></i>
              </div>
              <div>
                <h3 style={styles.panelTitle}>{activeCat.title}</h3>
                <p style={styles.panelSub}>{activeCat.tools.length} tools & skills</p>
              </div>
            </div>

            {/* Proficiency legend */}
            <div style={styles.legendRow}>
              {Object.entries(levelColors).map(([label, color]) => (
                <span key={label} style={styles.legendItem}>
                  <span style={{ ...styles.legendDot, background: color }}></span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Skills grid */}
          <div style={styles.toolsGrid}>
            {activeCat.tools.map((tool, idx) => (
              <div
                key={tool.name}
                style={{
                  ...styles.toolPill,
                  animationDelay: `${idx * 0.04}s`,
                  borderColor: tool.highlight ? `${activeCat.color}50` : 'rgba(255,255,255,0.06)',
                  background: tool.highlight
                    ? `${activeCat.color}08`
                    : 'rgba(255,255,255,0.02)',
                }}
                className="glass-card"
              >
                <div style={styles.toolPillTop}>
                  <span style={styles.toolName}>
                    {tool.highlight && (
                      <i
                        className="fa-solid fa-star"
                        style={{ color: activeCat.color, marginRight: '6px', fontSize: '10px' }}
                      ></i>
                    )}
                    {tool.name}
                  </span>
                  <span
                    style={{
                      ...styles.levelBadge,
                      background: `${levelColors[tool.level]}15`,
                      color: levelColors[tool.level],
                    }}
                  >
                    {tool.level}
                  </span>
                </div>
                {/* Proficiency bar */}
                <div style={styles.barTrack}>
                  <div
                    style={{
                      ...styles.barFill,
                      width:
                        tool.level === 'Expert'
                          ? '100%'
                          : tool.level === 'Advanced'
                          ? '78%'
                          : tool.level === 'Intermediate'
                          ? '55%'
                          : '30%',
                      background: `linear-gradient(90deg, ${levelColors[tool.level]}, ${activeCat.color})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Highlight callout for Flow AI & Claude */}
          {activeCategory === 'ai' && (
            <div style={styles.highlightBox}>
              <div style={styles.highlightIcon}>
                <i className="fa-solid fa-fire-flame-curved"></i>
              </div>
              <div>
                <p style={styles.highlightTitle}>Primary AI Workflow</p>
                <p style={styles.highlightText}>
                  <strong>Flow AI</strong> is my go-to tool for content creation, thumbnail design, and visual
                  ideation. <strong>Claude</strong> powers my strategic planning, design thinking, and
                  decision-making workflows — giving me a unique competitive edge in speed and output quality.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    width: '100%',
  },
  /* Marquee */
  marqueeContainer: {
    overflow: 'hidden',
    width: '100%',
    maskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
  },
  marqueeTrack: {
    display: 'flex',
    gap: '8px',
    whiteSpace: 'nowrap',
    animation: 'marquee-scroll 40s linear infinite',
    width: 'max-content',
  },
  marqueeItem: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '14px',
    color: 'var(--text-muted)',
    fontWeight: '500',
    padding: '8px 0',
    letterSpacing: '0.02em',
  },
  /* Tabs */
  tabBar: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tabBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: '12px',
    border: '1px solid',
    cursor: 'pointer',
    fontFamily: 'var(--font-heading)',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.3s ease',
  },
  countBadge: {
    fontSize: '11px',
    fontWeight: '700',
    padding: '2px 7px',
    borderRadius: '6px',
  },
  /* Display Panel */
  displayPanel: {
    padding: '36px',
    width: '100%',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  catIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  panelTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '2px',
  },
  panelSub: {
    fontSize: '13px',
    color: 'var(--text-muted)',
  },
  legendRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  /* Tools Grid */
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '14px',
  },
  toolPill: {
    padding: '16px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    animation: 'fadeInUp 0.5s ease forwards',
    cursor: 'default',
  },
  toolPillTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolName: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  levelBadge: {
    fontSize: '10px',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  barTrack: {
    width: '100%',
    height: '4px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  /* AI Highlight */
  highlightBox: {
    marginTop: '28px',
    padding: '20px 24px',
    background: 'rgba(192, 132, 252, 0.06)',
    border: '1px solid rgba(192, 132, 252, 0.2)',
    borderRadius: '16px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  highlightIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'rgba(192, 132, 252, 0.15)',
    color: '#c084fc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0,
  },
  highlightTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#c084fc',
    marginBottom: '4px',
  },
  highlightText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.55',
  },
};
