import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'
import { Html, Float, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const AnimatedGroup = animated.group
const AnimatedMesh = animated.mesh

function ServiceCube({ service, index, total, activeService, setActiveService, hoveredService, setHoveredService }) {
  const meshRef = useRef()
  const { size, viewport } = useThree()
  
  // Arrange in a visually pleasing 3D layout (e.g. 2 rows or a staggered grid)
  const columns = viewport.width < 8 ? 2 : 5;
  const rows = Math.ceil(total / columns);
  const col = index % columns;
  const row = Math.floor(index / columns);
  
  const spacingX = viewport.width < 8 ? 4 : 3.5;
  const spacingY = 3.5;
  
  const initialPos = [
    (col - (columns - 1) / 2) * spacingX,
    -(row - (rows - 1) / 2) * spacingY,
    (Math.random() - 0.5) * 2 // slight depth stagger
  ]
  
  const isHovered = hoveredService?.title === service.title
  const isActive = activeService?.title === service.title
  
  // Spring physics for drag and drop
  const [{ position }, api] = useSpring(() => ({
    position: initialPos,
    config: { mass: 2, tension: 150, friction: 20 }
  }))
  
  const { scale } = useSpring({
    scale: isActive ? 1.4 : isHovered ? 1.15 : 1,
    config: { mass: 1, tension: 300, friction: 20 }
  })
  
  const { emissiveIntensity, transmission, opacity } = useSpring({
    emissiveIntensity: isActive || isHovered ? 0.8 : 0.1,
    transmission: isActive || isHovered ? 0.95 : 0.85,
    opacity: isActive || isHovered ? 1 : 0.9,
    config: { mass: 1, tension: 200, friction: 20 }
  })

  const bind = useDrag(({ active, movement: [x, y], event }) => {
    if (active) {
      if (event) event.stopPropagation()
      document.body.style.cursor = 'grabbing'
      const factor = (viewport.width / size.width) * 1.5
      api.start({
        position: [initialPos[0] + x * factor, initialPos[1] - y * factor, initialPos[2]]
      })
    } else {
      document.body.style.cursor = 'auto'
      api.start({ position: initialPos }) // Snap back
    }
  })

  useFrame((state, delta) => {
    if (!meshRef.current) return
    if (!isActive && !isHovered) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.15
    } else if (isHovered && !isActive) {
      meshRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <AnimatedGroup {...bind()} position={position} scale={scale}>
      <AnimatedMesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          setActiveService(isActive ? null : service)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          if (!activeService) setHoveredService(service)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHoveredService(null)
          document.body.style.cursor = 'auto'
        }}
      >
        {/* Rounded Box Geometry */}
        <boxGeometry args={[2, 2, 2, 4, 4, 4]} />
        <animated.meshPhysicalMaterial
          color={service.color}
          transmission={transmission}
          opacity={opacity}
          metalness={0.2}
          roughness={0.1}
          ior={1.6}
          thickness={1.5}
          emissive={service.color}
          emissiveIntensity={emissiveIntensity}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent={true}
        />
      </AnimatedMesh>
      
      <Html position={[0, 0, 1.2]} center style={{ pointerEvents: 'none' }} zIndexRange={[100, 0]}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isActive || isHovered ? 1 : 0.85,
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          textAlign: 'center',
          userSelect: 'none'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px', filter: `drop-shadow(0 0 10px ${service.color})` }}>
            {service.icon}
          </div>
          <div style={{
            fontFamily: 'var(--font-display, Inter)',
            fontSize: '16px',
            fontWeight: 800,
            color: '#ffffff',
            textShadow: `0px 2px 10px rgba(0,0,0,0.9), 0px 0px 10px ${service.color}`,
            letterSpacing: '-0.02em',
            maxWidth: '120px',
            lineHeight: 1.2
          }}>
            {service.title}
          </div>
        </div>
      </Html>
    </AnimatedGroup>
  )
}

export default function Services3D({ services, activeService, setActiveService, hoveredService, setHoveredService }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -20, -10]} intensity={0.8} color="#8b5cf6" />
      
      <Environment preset="city" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 0, 0]}>
          {services.map((service, index) => (
            <ServiceCube 
              key={service.title} 
              service={service} 
              index={index} 
              total={services.length} 
              activeService={activeService} 
              setActiveService={setActiveService}
              hoveredService={hoveredService}
              setHoveredService={setHoveredService}
            />
          ))}
        </group>
      </Float>

      <ContactShadows position={[0, -6, 0]} opacity={0.4} scale={40} blur={2.5} far={10} color="#000000" />
    </>
  )
}
