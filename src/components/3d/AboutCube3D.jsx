import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const CUBE_FACES = [
  { id: 'front',   icon: '🚀', label: 'Experience',  value: '1.5+ Years',    desc: 'in digital marketing & growth automation', rot: [0, 0, 0] },
  { id: 'back',    icon: '⚡', label: 'Automation',  value: 'ManyChat Pro',  desc: 'comment → DM funnels, 24/7 lead capture', rot: [0, Math.PI, 0] },
  { id: 'right',   icon: '📊', label: 'Results',     value: '150+ Leads',   desc: 'generated organically at ₹0 ad spend', rot: [0, -Math.PI / 2, 0] },
  { id: 'left',    icon: '🎯', label: 'Mission',     value: 'Hyper-Growth', desc: 'for every brand through AI & automation', rot: [0, Math.PI / 2, 0] },
  { id: 'top',     icon: '🤖', label: 'AI Tools',    value: 'GPT + Leonardo', desc: 'powering content at 3× human speed', rot: [Math.PI / 2, 0, 0] },
  { id: 'bottom',  icon: '📱', label: 'Platforms',   value: '6+ Channels',  desc: 'Instagram, YouTube, Facebook & more', rot: [-Math.PI / 2, 0, 0] },
]

export default function AboutCube3D({ onFaceClick }) {
  const groupRef = useRef()
  const { size, viewport } = useThree()
  
  const rotation = useRef([0.3, 0.4, 0])
  const velocity = useRef([0, 0])
  const lastTime = useRef(0)
  const isDragging = useRef(false)
  const lastActiveTime = useRef(Date.now())
  
  const [targetRotation, setTargetRotation] = useState(null)

  const bind = useDrag(({ active, delta: [dx, dy], timeStamp }) => {
    isDragging.current = active
    lastActiveTime.current = Date.now()
    setTargetRotation(null)

    if (active) {
      const factor = 0.005
      rotation.current[1] += dx * factor
      rotation.current[0] += dy * factor
      
      const dt = timeStamp - lastTime.current || 16
      velocity.current = [dx / dt, dy / dt]
    }
    lastTime.current = timeStamp
  })

  const handleFaceClick = (face, event) => {
    event.stopPropagation()
    setTargetRotation(face.rot)
    onFaceClick(face)
    lastActiveTime.current = Date.now()
  }

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const now = Date.now()
    const idleTime = now - lastActiveTime.current

    if (targetRotation) {
      const speed = 0.1
      rotation.current[0] = THREE.MathUtils.lerp(rotation.current[0], targetRotation[0], speed)
      rotation.current[1] = THREE.MathUtils.lerp(rotation.current[1], targetRotation[1], speed)
      rotation.current[2] = THREE.MathUtils.lerp(rotation.current[2], targetRotation[2], speed)
    } else if (isDragging.current) {
      // Manual drag rotation
    } else {
      rotation.current[1] += velocity.current[0] * delta * 50
      rotation.current[0] += velocity.current[1] * delta * 50

      velocity.current[0] *= Math.exp(-4 * delta)
      velocity.current[1] *= Math.exp(-4 * delta)

      if (idleTime > 4000) {
        rotation.current[1] += delta * 0.12
        rotation.current[0] = THREE.MathUtils.lerp(rotation.current[0], 0.25, 0.02)
      }
    }

    groupRef.current.rotation.x = rotation.current[0]
    groupRef.current.rotation.y = rotation.current[1]
    groupRef.current.rotation.z = rotation.current[2]
  })

  return (
    <group ref={groupRef} {...bind()}>
      {/* 3D Glass Box base with higher opacity to block back-face content */}
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshPhysicalMaterial
          color="#0f172a"
          transmission={0.2}
          roughness={0.15}
          ior={1.6}
          thickness={1.5}
          transparent={true}
          opacity={0.92}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Grid lines outlining the cube */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3, 3, 3)]} />
        <lineBasicMaterial color="#4f8eff" transparent opacity={0.4} linewidth={2} />
      </lineSegments>

      {/* Render HTML Content onto the 6 Faces */}
      {CUBE_FACES.map((face) => {
        const pos = [0, 0, 0]
        const rot = face.rot
        const offset = 1.51

        if (face.id === 'front') pos[2] = offset
        if (face.id === 'back') pos[2] = -offset
        if (face.id === 'right') pos[0] = offset
        if (face.id === 'left') pos[0] = -offset
        if (face.id === 'top') pos[1] = offset
        if (face.id === 'bottom') pos[1] = -offset

        return (
          <group key={face.id} position={pos} rotation={rot}>
            <Html
              transform
              occlude="blending"
              distanceFactor={3.2}
              style={{
                width: 260,
                height: 260,
                pointerEvents: 'auto',
                userSelect: 'none',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            >
              <div
                onClick={(e) => handleFaceClick(face, e)}
                style={{
                  width: '100%',
                  height: '100%',
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgba(9, 13, 28, 0.98)',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 16,
                  color: '#fff',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0,0,0,0.5)',
                  transition: 'all 0.3s ease',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                className="cube-face-inner"
              >
                <div style={{ fontSize: 44, marginBottom: 14 }}>{face.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-display, Inter)',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#94a3b8',
                  marginBottom: 6
                }}>
                  {face.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display, Inter)',
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#4f8eff',
                  marginBottom: 10,
                  textShadow: '0 2px 10px rgba(79, 142, 255, 0.4)'
                }}>
                  {face.value}
                </div>
                <p style={{
                  fontSize: 13,
                  color: '#e2e8f0',
                  lineHeight: 1.5,
                  margin: 0,
                  fontWeight: 500
                }}>
                  {face.desc}
                </p>
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}
