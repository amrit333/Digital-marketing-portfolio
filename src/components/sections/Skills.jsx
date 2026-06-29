import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import AbstractSkills3D from '../3d/AbstractSkills3D'
import SkillPanel from '../ui/SkillPanel'

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  return (
    <section id="skills" style={{ position: 'relative', width: '100%', height: '100vh', background: '#020205', overflow: 'hidden' }}>
      
      {/* 3D Glass Spheres Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ antialias: true, alpha: false }}>
          <AbstractSkills3D 
            activeSkill={activeSkill} 
            setActiveSkill={setActiveSkill}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
          />
        </Canvas>
      </div>

      {/* Holographic UI Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <SkillPanel skill={activeSkill} onClose={() => setActiveSkill(null)} />
      </div>

      {/* Small Hover Tooltip (if not active) */}
      {hoveredSkill && !activeSkill && (
        <div style={{
          position: 'absolute', 
          bottom: '10%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: 'rgba(10, 12, 22, 0.7)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${hoveredSkill.color}`,
          padding: '12px 24px',
          borderRadius: 30,
          color: '#fff',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          zIndex: 5,
          pointerEvents: 'none',
          boxShadow: `0 0 20px ${hoveredSkill.color}40`
        }}>
          {hoveredSkill.name} - Click to explore
        </div>
      )}

      {/* Title Overlay */}
      <div style={{
        position: 'absolute',
        top: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <h2 className="section-title" style={{ margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
          Digital <span className="gradient-text">Galaxy</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Explore my professional universe</p>
      </div>
    </section>
  )
}
