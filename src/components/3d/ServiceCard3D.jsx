import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Environment } from '@react-three/drei'
import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'

function InteractiveCube({ service, isHovered, setIsHovered, onClick }) {
  const meshRef = useRef()
  const { size, viewport } = useThree()
  
  const rotation = useRef([0.3, 0.4, 0])
  const velocity = useRef([0, 0])
  const lastTime = useRef(0)
  const isDragging = useRef(false)
  const lastActiveTime = useRef(Date.now())

  // Gesture binding for mouse dragging
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
      // Direct drag updates
    } else {
      // Apply velocity inertia
      rotation.current[1] += velocity.current[0] * delta * 50
      rotation.current[0] += velocity.current[1] * delta * 50

      // Damping velocity
      velocity.current[0] *= Math.exp(-4 * delta)
      velocity.current[1] *= Math.exp(-4 * delta)

      // Float and rotate if idle
      if (idleTime > 2000) {
        rotation.current[1] += delta * 0.25
        rotation.current[0] = THREE.MathUtils.lerp(rotation.current[0], 0.2, 0.02)
      }
    }

    // Apply floating bounce motion
    const floatOffset = Math.sin(state.clock.elapsedTime * 1.5 + service.title.length) * 0.15
    meshRef.current.position.y = floatOffset

    // Apply rotation
    meshRef.current.rotation.x = rotation.current[0]
    meshRef.current.rotation.y = rotation.current[1]
  })

  const glowStrength = isHovered ? 0.7 : 0.15
  const scale = isHovered ? 1.1 : 1.0

  return (
    <group {...bind()} scale={scale} style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Rounded glass box representing the service block */}
        <boxGeometry args={[2.2, 2.2, 2.2, 3, 3, 3]} />
        <meshPhysicalMaterial
          color={service.color}
          transmission={0.85}
          opacity={0.9}
          metalness={0.2}
          roughness={0.1}
          ior={1.6}
          thickness={1.0}
          emissive={service.color}
          emissiveIntensity={glowStrength}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transparent={true}
        />
        
        {/* Front Face Text Display */}
        <group position={[0, 0, 1.11]}>
          <Html
            transform
            distanceFactor={2.4}
            occlude="blending"
            style={{
              width: 140,
              height: 140,
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(5, 8, 16, 0.45)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 12,
              textAlign: 'center',
              color: '#fff',
              padding: 10
            }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{service.icon}</div>
              <div style={{
                fontFamily: 'var(--font-display, Inter)',
                fontSize: 12,
                fontWeight: 800,
                lineHeight: 1.2
              }}>{service.title}</div>
            </div>
          </Html>
        </group>
      </mesh>
    </group>
  )
}

export default function ServiceCard3D({ service, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        height: 280,
        background: isHovered ? 'rgba(14, 18, 36, 0.55)' : 'rgba(10, 12, 22, 0.45)',
        backdropFilter: 'blur(20px)',
        border: isHovered ? `1px solid ${service.color}60` : '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 24,
        padding: '24px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: isHovered ? `0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px ${service.color}15` : '0 10px 25px rgba(0,0,0,0.3)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Scene */}
      <div style={{ width: '100%', height: 180, position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <InteractiveCube 
            service={service} 
            isHovered={isHovered} 
            setIsHovered={setIsHovered}
            onClick={onClick}
          />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Title & Tiny Label */}
      <div style={{ width: '100%', textAlign: 'center', zIndex: 10 }}>
        <h4 style={{
          fontFamily: 'var(--font-display, Inter)',
          fontSize: 16,
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 4px 0',
          transition: 'color 0.3s',
        }}>
          {service.title}
        </h4>
        <span style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 11,
          color: service.color,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Inspect 3D Block
        </span>
      </div>
    </div>
  )
}
