import React, { useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Scripting & Angle',
    tool: 'ChatGPT',
    icon: 'fa-regular fa-comment-dots',
    color: '#10a37f', // OpenAI green
    action: 'Hooks, outlines, and video scripts generated using custom audience-retention frameworks.',
    result: 'Optimized hooks & tags for high-engagement reels and SEO-friendly YouTube titles.'
  },
  {
    number: '02',
    title: 'Visual Assets',
    tool: 'Leonardo AI',
    icon: 'fa-solid fa-wand-magic-sparkles',
    color: '#c084fc', // Leonardo Purple
    action: 'Generating professional, thematic art, stock-level visuals, and high-fidelity base images.',
    result: 'High CTR thumbnails and aesthetic backgrounds suited for handcrafted/modern brands.'
  },
  {
    number: '03',
    title: 'Assembly & Branding',
    tool: 'Canva',
    icon: 'fa-solid fa-pen-nib',
    color: '#00c4cc', // Canva Cyan
    action: 'Standardizing visual templates, color mapping, logo placements, and overlay details.',
    result: 'Ready-to-publish content exported 3x faster than manual creation.'
  }
];

export default function WorkflowVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div style={styles.container}>
      {/* Steps Selector */}
      <div style={styles.stepHeader}>
        {steps.map((step, idx) => (
          <button
            key={step.number}
            onClick={() => setActiveStep(idx)}
            style={{
              ...styles.stepBtn,
              borderColor: activeStep === idx ? step.color : 'rgba(255, 255, 255, 0.05)',
              background: activeStep === idx ? `${step.color}10` : 'rgba(255,255,255,0.02)',
              color: activeStep === idx ? '#fff' : 'var(--text-secondary)'
            }}
          >
            <span style={{ ...styles.stepNum, color: step.color }}>{step.number}</span>
            <span style={styles.stepTitle}>{step.tool}</span>
          </button>
        ))}
      </div>

      {/* Interactive Visualizer Area */}
      <div className="glass-card" style={styles.displayCard}>
        {/* Connection flow indicators */}
        <div style={styles.flowProgressContainer}>
          <div style={styles.progressBarBg}>
            <div 
              style={{
                ...styles.progressBarActive,
                background: steps[activeStep].color,
                width: activeStep === 0 ? '15%' : activeStep === 1 ? '50%' : '100%'
              }} 
            />
          </div>
          <div style={styles.nodesContainer}>
            {steps.map((step, idx) => (
              <div 
                key={step.number}
                onClick={() => setActiveStep(idx)}
                style={{
                  ...styles.node,
                  background: idx <= activeStep ? step.color : '#1e2230',
                  boxShadow: idx === activeStep ? `0 0 15px ${step.color}` : 'none'
                }}
              >
                <i className={step.icon} style={{ fontSize: '12px', color: '#fff' }}></i>
              </div>
            ))}
          </div>
        </div>

        {/* Content Info */}
        <div style={styles.contentGrid}>
          <div style={styles.detailsCol}>
            <span style={{ ...styles.badge, color: steps[activeStep].color, background: `${steps[activeStep].color}12` }}>
              Step {steps[activeStep].number}: {steps[activeStep].tool}
            </span>
            <h3 style={styles.stepName}>{steps[activeStep].title}</h3>
            
            <div style={styles.infoBlock}>
              <h4 style={styles.infoTitle}>Process Execution</h4>
              <p style={styles.infoText}>{steps[activeStep].action}</p>
            </div>

            <div style={styles.infoBlock}>
              <h4 style={styles.infoTitle}>Deliverable Outcome</h4>
              <p style={{ ...styles.infoText, color: '#fff', fontWeight: '500' }}>
                <i className="fa-solid fa-circle-check" style={{ color: steps[activeStep].color, marginRight: '8px' }}></i>
                {steps[activeStep].result}
              </p>
            </div>
          </div>

          <div style={styles.demoCol}>
            {/* Simulated Workspace Window */}
            <div style={styles.windowFrame}>
              <div style={styles.windowHeader}>
                <div style={styles.dots}>
                  <span style={{ ...styles.dot, background: '#ff5f56' }} />
                  <span style={{ ...styles.dot, background: '#ffbd2e' }} />
                  <span style={{ ...styles.dot, background: '#27c93f' }} />
                </div>
                <span style={styles.windowTitle}>{steps[activeStep].tool.toLowerCase()}_pipeline_instance</span>
              </div>
              <div style={styles.windowBody}>
                {activeStep === 0 && (
                  <div style={styles.promptSim}>
                    <p style={styles.promptLabel}><i className="fa-solid fa-terminal" style={{ marginRight: '6px' }}></i> System Prompt:</p>
                    <code style={styles.promptCode}>
                      "Create high-retaining hook & 30s scripting format targeting craft boutique organic buyers on Instagram reels..."
                    </code>
                    <div style={styles.typingBox}>
                      <span style={styles.typingText}>Response generated successfully in 1.4s. Rate: 98% retention match.</span>
                    </div>
                  </div>
                )}
                {activeStep === 1 && (
                  <div style={styles.imageGenSim}>
                    <div style={styles.imageGrid}>
                      <div style={styles.imageItem}>
                        <i className="fa-solid fa-image" style={{ fontSize: '32px', color: '#ffffff20' }}></i>
                        <span style={styles.imageText}>asset_01.png</span>
                      </div>
                      <div style={styles.imageItem}>
                        <i className="fa-solid fa-image" style={{ fontSize: '32px', color: '#ffffff20' }}></i>
                        <span style={styles.imageText}>asset_02.png</span>
                      </div>
                    </div>
                    <p style={styles.statusText}>Leonardo AI Engine: Ready (Euler Discrete | 512x512)</p>
                  </div>
                )}
                {activeStep === 2 && (
                  <div style={styles.canvaSim}>
                    <div style={styles.canvaCanvas}>
                      <div style={styles.canvaNavbar}>
                        <span style={{ fontSize: '9px', opacity: 0.7 }}>File</span>
                        <span style={{ fontSize: '9px', opacity: 0.7 }}>Resize</span>
                        <span style={{ fontSize: '9px', opacity: 0.7, color: 'var(--accent-blue)' }}>Publish</span>
                      </div>
                      <div style={styles.artboard}>
                        <div style={styles.artboardHero} />
                        <div style={styles.artboardTextLine1} />
                        <div style={styles.artboardTextLine2} />
                      </div>
                    </div>
                    <p style={styles.statusText}>Status: Output standard 3x production benchmark</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    width: '100%'
  },
  stepHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    width: '100%'
  },
  stepBtn: {
    padding: '16px 20px',
    border: '1px solid',
    borderRadius: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    fontFamily: 'var(--font-heading)',
    fontWeight: '600',
    fontSize: '15px',
    textAlign: 'left',
    transition: 'all 0.3s ease',
  },
  stepNum: {
    fontSize: '20px',
    fontWeight: '800'
  },
  stepTitle: {
    fontSize: '15px'
  },
  displayCard: {
    padding: '40px',
    width: '100%'
  },
  flowProgressContainer: {
    position: 'relative',
    marginBottom: '40px',
    width: '100%',
    height: '24px',
    display: 'flex',
    alignItems: 'center'
  },
  progressBarBg: {
    position: 'absolute',
    left: '12px',
    right: '12px',
    height: '2px',
    background: 'rgba(255, 255, 255, 0.05)',
    zIndex: 1
  },
  progressBarActive: {
    height: '100%',
    transition: 'all 0.5s ease',
    borderRadius: '1px'
  },
  nodesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 2
  },
  node: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.4s ease'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '40px',
    alignItems: 'center',
  },
  detailsCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  badge: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  stepName: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '24px'
  },
  infoBlock: {
    marginBottom: '20px'
  },
  infoTitle: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6px'
  },
  infoText: {
    fontSize: '15px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5'
  },
  demoCol: {
    width: '100%'
  },
  windowFrame: {
    background: '#0d0f18',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
  },
  windowHeader: {
    background: '#121420',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
  },
  dots: {
    display: 'flex',
    gap: '6px'
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  windowTitle: {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: 'var(--text-secondary)'
  },
  windowBody: {
    padding: '24px',
    minHeight: '180px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  promptSim: {
    textAlign: 'left'
  },
  promptLabel: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    fontFamily: 'monospace'
  },
  promptCode: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    background: '#161927',
    padding: '8px 12px',
    borderRadius: '6px',
    display: 'block',
    marginBottom: '14px',
    lineHeight: '1.4'
  },
  typingBox: {
    borderLeft: '2px solid var(--accent-green)',
    paddingLeft: '10px'
  },
  typingText: {
    fontSize: '12px',
    color: 'var(--accent-green)',
    fontFamily: 'monospace'
  },
  imageGenSim: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  imageItem: {
    height: '100px',
    background: '#161927',
    borderRadius: '8px',
    border: '1px dashed rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  imageText: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    fontFamily: 'monospace'
  },
  canvaSim: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  canvaCanvas: {
    background: '#161927',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '8px'
  },
  canvaNavbar: {
    display: 'flex',
    gap: '10px',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    marginBottom: '8px',
    fontFamily: 'sans-serif'
  },
  artboard: {
    height: '90px',
    background: '#1f2335',
    borderRadius: '6px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px'
  },
  artboardHero: {
    width: '40px',
    height: '30px',
    background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-pink) 100%)',
    borderRadius: '4px'
  },
  artboardTextLine1: {
    width: '60px',
    height: '4px',
    background: '#ffffff40',
    borderRadius: '2px'
  },
  artboardTextLine2: {
    width: '40px',
    height: '4px',
    background: '#ffffff20',
    borderRadius: '2px'
  },
  statusText: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    fontFamily: 'monospace'
  }
};
