import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'

export default function CaseStudy3D({ project, position, initialRotation, isFocused, onSelect, onHover }) {
  const meshRef = useRef()
  const [isHovered, setIsHovered] = useState(false)
  
  const rotation = useRef([...initialRotation])
  const velocity = useRef([0, 0])
  const lastTime = useRef(0)
  const isDragging = useRef(false)
  const lastActiveTime = useRef(Date.now())

  // Drag logic to rotate the slab in 3D space
  const bind = useDrag(({ active, delta: [dx, dy], timeStamp }) => {
    isDragging.current = active
    lastActiveTime.current = Date.now()

    if (active) {
      const factor = 0.008
      rotation.current[1] += dx * factor
      rotation.current[0] += dy * factor
      
      const dt = timeStamp - lastTime.current || 16
      velocity.current = [dx / dt, dy / dt]
    }
    lastTime.current = timeStamp
  })

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const now = Date.now()
    const idleTime = now - lastActiveTime.current

    if (isDragging.current) {
      // Direct drag rotation
    } else {
      // Apply velocity inertia
      rotation.current[1] += velocity.current[0] * delta * 50
      rotation.current[0] += velocity.current[1] * delta * 50

      // Damping velocity
      velocity.current[0] *= Math.exp(-4 * delta)
      velocity.current[1] *= Math.exp(-4 * delta)

      // Float smoothly and return to default rotation when not active
      if (!isFocused && idleTime > 2000) {
        rotation.current[1] = THREE.MathUtils.lerp(rotation.current[1], initialRotation[1], 0.03)
        rotation.current[0] = THREE.MathUtils.lerp(rotation.current[0], initialRotation[0], 0.03)
      }
    }

    // Apply floating animation
    const floatOffset = Math.sin(state.clock.elapsedTime * 1.2 + project.id) * 0.12
    meshRef.current.position.y = position[1] + floatOffset

    // Smoothly transition scale and Z position on hover/focus
    const targetScale = isFocused ? 1.05 : isHovered ? 1.05 : 0.95
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

    // Apply rotation
    meshRef.current.rotation.x = rotation.current[0]
    meshRef.current.rotation.y = rotation.current[1]
  })

  const glowStrength = isFocused || isHovered ? 0.8 : 0.15

  return (
    <group {...bind()}>
      <mesh
        ref={meshRef}
        position={[position[0], position[1], position[2]]}
        onPointerOver={() => {
          setIsHovered(true)
          onHover(project)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setIsHovered(false)
          onHover(null)
          document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(project)
        }}
      >
        {/* Sleek, thin glass display slab */}
        <boxGeometry args={[2.5, 3.6, 0.08]} />
        <meshPhysicalMaterial
          color={project.metricColor}
          transmission={0.88}
          opacity={0.9}
          metalness={0.2}
          roughness={0.1}
          ior={1.6}
          thickness={0.8}
          emissive={project.metricColor}
          emissiveIntensity={glowStrength}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transparent={true}
        />

        {/* Outer neon border segments */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.5, 3.6, 0.08)]} />
          <lineBasicMaterial color={project.metricColor} transparent opacity={0.3} />
        </lineSegments>

        {/* Display details on the front face of the slab */}
        <group position={[0, 0, 0.05]}>
          <Html
            transform
            distanceFactor={3.2}
            occlude="blending"
            style={{
              width: 230,
              height: 330,
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'rgba(5, 8, 16, 0.5)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 16,
              padding: 20,
              color: '#fff',
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 10,
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: 6
                }}>
                  {project.period}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display, Inter)',
                  fontSize: 18,
                  fontWeight: 800,
                  lineHeight: 1.3,
                  margin: '0 0 10px 0',
                  color: '#fff',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                  {project.title}
                </h3>
                <div style={{
                  fontSize: 12,
                  color: '#cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <i className="fa-solid fa-user" style={{ color: project.metricColor }} />
                  {project.client}
                </div>
              </div>

              <div>
                <div style={{
                  background: project.metricBg,
                  border: `1px solid ${project.metricColor}40`,
                  color: project.metricColor,
                  borderRadius: 12,
                  padding: '8px 12px',
                  fontSize: 14,
                  fontWeight: 700,
                  textAlign: 'center',
                  fontFamily: 'var(--font-display, Inter)',
                  marginBottom: 12,
                  boxShadow: `0 4px 15px ${project.metricColor}15`
                }}>
                  {project.metric}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  Drag to inspect • Click to zoom
                </div>
              </div>
            </div>
          </Html>
        </group>
      </mesh>
    </group>
  )
}
