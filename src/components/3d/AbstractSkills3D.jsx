import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { GALAXY_SKILLS } from './SkillsGalaxy'

const ICONS = {
  meta: '📱',
  google: '🎯',
  seo: '🔍',
  smm: '🎪',
  insta: '📸',
  fb: '👥',
  youtube: '🎬',
  ai: '🤖',
  canva: '🎨',
  content: '✍️',
  wp: '🌐',
  email: '✉️',
  lead: '📈',
  analytics: '📊',
  branding: '🏷️',
  copy: '📝'
}

export default function AbstractSkills3D({ activeSkill, setActiveSkill, hoveredSkill, setHoveredSkill }) {
  const { size, viewport } = useThree()
  const displaySkills = GALAXY_SKILLS.slice(0, 12) // Keep the top 12 skills for neat physics space

  const ballsRef = useRef([])
  const dragInfo = useRef({ activeIndex: -1, offset: new THREE.Vector3() })

  // Initialize balls positions and physics properties once
  if (ballsRef.current.length === 0) {
    const cols = 4
    ballsRef.current = displaySkills.map((skill, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)
      
      // Calculate initial layout spread in the viewport
      const startX = -(cols - 1) * 1.8
      const startY = 2.0
      
      return {
        id: skill.id,
        skill,
        pos: new THREE.Vector3(startX + col * 3.6 + (Math.random() - 0.5) * 0.5, startY - row * 2.8, 0),
        vel: new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 0),
        radius: 1.1,
        mass: 1.0,
        isDragging: false,
        meshRef: React.createRef()
      }
    })
  }

  // Update positions and handle physics collisions
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.03) // Cap dt to prevent physics exploding
    const balls = ballsRef.current
    const bounce = 0.55 // Boundary & collision restitution
    const friction = Math.exp(-0.8 * dt) // Air drag friction

    // Boundary constraints in world space
    const minX = -viewport.width / 2 + 1.2
    const maxX = viewport.width / 2 - 1.2
    const minY = -viewport.height / 2 + 1.2
    const maxY = viewport.height / 2 - 1.2

    // Pointer coordinates in 3D world space projected on z=0 plane
    const pointerX = (state.pointer.x * viewport.width) / 2
    const pointerY = (state.pointer.y * viewport.height) / 2

    // 1. Update velocities and positions
    balls.forEach((ball, idx) => {
      if (ball.isDragging) {
        // Smoothly slide ball to mouse pointer
        const targetX = THREE.MathUtils.clamp(pointerX - dragInfo.current.offset.x, minX - 0.5, maxX + 0.5)
        const targetY = THREE.MathUtils.clamp(pointerY - dragInfo.current.offset.y, minY - 0.5, maxY + 0.5)

        const prevPos = ball.pos.clone()
        ball.pos.set(targetX, targetY, 0)
        
        // Calculate throw velocity based on position changes
        ball.vel.copy(ball.pos).sub(prevPos).multiplyScalar(1 / Math.max(dt, 0.001))
        ball.vel.clampLength(0, 30) // Clamp drag velocity to prevent hyper-speeds
      } else {
        // Apply friction
        ball.vel.multiplyScalar(friction)
        // Apply position update
        ball.pos.addScaledVector(ball.vel, dt)
        
        // Boundary collision checks (X axis)
        if (ball.pos.x < minX) {
          ball.pos.x = minX
          ball.vel.x = -ball.vel.x * bounce
        } else if (ball.pos.x > maxX) {
          ball.pos.x = maxX
          ball.vel.x = -ball.vel.x * bounce
        }

        // Boundary collision checks (Y axis)
        if (ball.pos.y < minY) {
          ball.pos.y = minY
          ball.vel.y = -ball.vel.y * bounce
        } else if (ball.pos.y > maxY) {
          ball.pos.y = maxY
          ball.vel.y = -ball.vel.y * bounce
        }
      }
    })

    // 2. Resolve Ball-to-Ball collisions
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const b1 = balls[i]
        const b2 = balls[j]

        const diff = b2.pos.clone().sub(b1.pos)
        const dist = diff.length()
        const minDist = b1.radius + b2.radius

        if (dist < minDist) {
          const normal = diff.clone().normalize()
          const overlap = minDist - dist

          // Resolve overlap (push balls apart)
          if (!b1.isDragging && !b2.isDragging) {
            b1.pos.addScaledVector(normal, -overlap * 0.5)
            b2.pos.addScaledVector(normal, overlap * 0.5)
          } else if (b1.isDragging && !b2.isDragging) {
            b2.pos.addScaledVector(normal, overlap)
          } else if (!b1.isDragging && b2.isDragging) {
            b1.pos.addScaledVector(normal, -overlap)
          }

          // Resolve velocities (momentum exchange)
          const relVel = b2.vel.clone().sub(b1.vel)
          const velAlongNormal = relVel.dot(normal)

          // Only resolve if they are moving towards each other
          if (velAlongNormal < 0) {
            const restitution = 0.65
            const impulse = -(1 + restitution) * velAlongNormal / (1 / b1.mass + 1 / b2.mass)

            if (!b1.isDragging) {
              b1.vel.addScaledVector(normal, -impulse / b1.mass)
            }
            if (!b2.isDragging) {
              b2.vel.addScaledVector(normal, impulse / b2.mass)
            }
          }
        }
      }
    }

    // 3. Update mesh transforms directly
    balls.forEach((ball) => {
      if (ball.meshRef.current) {
        ball.meshRef.current.position.copy(ball.pos)
      }
    })
  })

  // Start dragging a ball
  const handlePointerDown = (index, event) => {
    event.stopPropagation()
    event.target.setPointerCapture(event.pointerId)
    
    const ball = ballsRef.current[index]
    ball.isDragging = true
    ball.vel.set(0, 0, 0)
    
    // Project click position in 3D world space
    const clickX = (event.pointer.x * viewport.width) / 2
    const clickY = (event.pointer.y * viewport.height) / 2
    
    // Store offset between click and center of the ball
    dragInfo.current.activeIndex = index
    dragInfo.current.offset.set(clickX - ball.pos.x, clickY - ball.pos.y, 0)
  }

  // End dragging a ball
  const handlePointerUp = (index, event) => {
    event.stopPropagation()
    event.target.releasePointerCapture(event.pointerId)
    
    const ball = ballsRef.current[index]
    ball.isDragging = false
    dragInfo.current.activeIndex = -1
  }

  return (
    <>
      <color attach="background" args={['#030508']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -20, -10]} intensity={0.8} color="#8b5cf6" />
      
      <Environment preset="city" />

      <group>
        {ballsRef.current.map((ball, index) => {
          const isHovered = hoveredSkill?.id === ball.id
          const isActive = activeSkill?.id === ball.id
          
          return (
            <mesh
              key={ball.id}
              ref={ball.meshRef}
              onPointerDown={(e) => handlePointerDown(index, e)}
              onPointerUp={(e) => handlePointerUp(index, e)}
              onPointerOver={(e) => {
                e.stopPropagation()
                setHoveredSkill(ball.skill)
                document.body.style.cursor = 'grab'
              }}
              onPointerOut={() => {
                setHoveredSkill(null)
                document.body.style.cursor = 'auto'
              }}
              onClick={(e) => {
                e.stopPropagation()
                setActiveSkill(ball.skill)
              }}
            >
              {/* Spherical geometry of the ball */}
              <sphereGeometry args={[ball.radius, 32, 32]} />
              
              {/* Premium physical glass material with reflection and color */}
              <meshPhysicalMaterial
                color={ball.skill.color}
                transmission={0.85}
                opacity={0.9}
                metalness={0.15}
                roughness={0.12}
                ior={1.5}
                thickness={1.2}
                emissive={ball.skill.color}
                emissiveIntensity={isHovered || isActive ? 0.6 : 0.15}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                transparent={true}
              />

              {/* Bold glassmorphic labels on the balls */}
              <Html position={[0, 0, 0]} center style={{ pointerEvents: 'none' }}>
                <div style={{
                  background: 'rgba(10, 15, 30, 0.7)',
                  backdropFilter: 'blur(12px)',
                  border: `2px solid ${ball.skill.color}cc`,
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.6), 0 0 15px ${ball.skill.color}35`,
                  borderRadius: '16px',
                  padding: '12px 16px',
                  width: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#fff',
                  userSelect: 'none',
                  transform: isHovered || isActive ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '4px' }}>
                    {ICONS[ball.id] || '⚡'}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display, Inter)',
                    fontSize: '14px',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    marginBottom: '4px',
                    whiteSpace: 'nowrap'
                  }}>{ball.skill.name}</div>
                  <div style={{
                    fontFamily: 'var(--font-display, Inter)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: ball.skill.color,
                    background: `${ball.skill.color}15`,
                    padding: '2px 8px',
                    borderRadius: '8px'
                  }}>{ball.skill.score}% Expertise</div>
                </div>
              </Html>
            </mesh>
          )
        })}
      </group>
    </>
  )
}
