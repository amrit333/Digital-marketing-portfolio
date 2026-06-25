import React, { useEffect, useState } from 'react';

const statsData = [
  {
    id: 1,
    value: '9,200+',
    label: 'Instagram Followers',
    icon: 'fa-brands fa-instagram',
    color: '#E1306C',
    description: 'Targeted organic growth'
  },
  {
    id: 2,
    value: '120K+',
    label: 'Monthly Reach',
    icon: 'fa-solid fa-chart-line',
    color: '#00e676',
    description: 'Purely organic reach expansion'
  },
  {
    id: 3,
    value: '150+',
    label: 'Organic Leads',
    icon: 'fa-solid fa-funnel-dollar',
    color: '#0084ff',
    description: 'Generated with ₹0 ad spend'
  },
  {
    id: 4,
    value: '85K+',
    label: 'Views in 1st Month',
    icon: 'fa-solid fa-bolt',
    color: '#ff9100',
    description: 'Launch metrics for Stitchery brand'
  },
  {
    id: 5,
    value: '69.8K',
    label: 'YouTube Impressions',
    icon: 'fa-brands fa-youtube',
    color: '#FF0000',
    description: 'Tech Wealth Coach channel'
  }
];

export default function StatsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.gridContainer}>
      {statsData.map((stat, index) => (
        <div
          key={stat.id}
          className="glass-card"
          style={{
            ...styles.card,
            borderColor: hoveredIndex === index ? stat.color : 'rgba(255, 255, 255, 0.08)',
            boxShadow: hoveredIndex === index ? `0 15px 30px ${stat.color}15` : 'none',
            transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)'
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div style={styles.topRow}>
            <div
              style={{
                ...styles.iconContainer,
                background: `${stat.color}15`,
                color: stat.color
              }}
            >
              <i className={stat.icon}></i>
            </div>
            <span style={{ ...styles.badge, color: stat.color, background: `${stat.color}10` }}>
              Verified
            </span>
          </div>
          
          <h3 style={styles.value}>{stat.value}</h3>
          <p style={styles.label}>{stat.label}</p>
          <p style={styles.description}>{stat.description}</p>
          
          {/* Animated decorative indicator line */}
          <div
            style={{
              ...styles.indicator,
              background: stat.color,
              width: hoveredIndex === index ? '100%' : '30%'
            }}
          />
        </div>
      ))}
    </div>
  );
}

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    width: '100%',
  },
  card: {
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    position: 'relative',
    height: '100%',
    cursor: 'default',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px'
  },
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    transition: 'transform 0.3s ease',
  },
  badge: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  value: {
    fontSize: '40px',
    fontWeight: '800',
    lineHeight: '1.1',
    marginBottom: '8px',
    fontFamily: 'var(--font-heading)',
  },
  label: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '6px'
  },
  description: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4'
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    borderRadius: '0 0 0 20px',
    transition: 'width 0.4s ease'
  }
};
