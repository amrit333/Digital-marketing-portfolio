import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, MeshDistortMaterial, PointMaterial, Points } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/* Floating particle field */
function Particles({ count = 1200 }) {
  const pointsRef = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.009
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.7}
      />
    </Points>
  )
}

/* Main hero torus knot */
function HeroKnot({ mouseRef }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.18
    meshRef.current.rotation.y = t * 0.12
    // Smooth mouse reaction
    if (mouseRef?.current) {
      meshRef.current.rotation.z += (mouseRef.current.x * 0.15 - meshRef.current.rotation.z) * 0.04
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[2.8, 0.2, -1]} scale={1.1}>
        <torusKnotGeometry args={[1, 0.32, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          metalness={0.85}
          roughness={0.08}
          distort={0.15}
          speed={2.5}
          emissive="#4f2dc8"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

/* Floating metallic sphere */
function FloatSphere({ position, color, radius = 0.45, speed = 2.5, emissive }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25
  })

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.92}
          roughness={0.05}
          emissive={emissive || color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

/* Floating geometric ring */
function FloatRing({ position }) {
  const meshRef = useRef()
  useFrame((s) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = s.clock.elapsedTime * 0.3
    meshRef.current.rotation.y = s.clock.elapsedTime * 0.2
  })
  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.0}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.7, 0.06, 16, 60]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} emissive="#06b6d4" emissiveIntensity={0.3} />
      </mesh>
    </Float>
  )
}

/* Camera rig that follows mouse */
function CameraRig({ mouseRef }) {
  useFrame((state) => {
    if (!mouseRef?.current) return
    state.camera.position.x += (mouseRef.current.x * 0.6 - state.camera.position.x) * 0.04
    state.camera.position.y += (mouseRef.current.y * 0.4 - state.camera.position.y) * 0.04
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

/* Orbiting colored lights */
function OrbitLights() {
  const light1 = useRef()
  const light2 = useRef()
  const light3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.5) * 8
      light1.current.position.z = Math.cos(t * 0.5) * 8
    }
    if (light2.current) {
      light2.current.position.x = Math.sin(t * 0.35 + 2) * 6
      light2.current.position.y = Math.cos(t * 0.35 + 2) * 4
    }
    if (light3.current) {
      light3.current.position.z = Math.sin(t * 0.45 + 4) * 7
      light3.current.position.y = Math.cos(t * 0.45 + 4) * 3
    }
  })

  return (
    <>
      <pointLight ref={light1} color="#4f8eff" intensity={8} distance={20} />
      <pointLight ref={light2} color="#8b5cf6" intensity={6} distance={15} />
      <pointLight ref={light3} color="#ec4899" intensity={5} distance={15} />
    </>
  )
}

export default function HeroScene({ mouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.15} />
      <OrbitLights />

      <Suspense fallback={null}>
        <Particles count={1200} />
        <HeroKnot mouseRef={mouseRef} />

        <FloatSphere position={[-3.5, 1.8, -1.5]} color="#4f8eff" radius={0.55} speed={2} />
        <FloatSphere position={[-2.5, -1.8, 0.5]} color="#ec4899" radius={0.35} speed={3} />
        <FloatSphere position={[4.5, -1.2, -2]} color="#10b981" radius={0.42} speed={1.8} />
        <FloatSphere position={[-1.0, 2.5, -3]} color="#f59e0b" radius={0.28} speed={2.5} />

        <FloatRing position={[-4.5, -0.5, -1]} />
        <FloatRing position={[3, 2, -3]} />

        <Stars radius={60} depth={60} count={2500} factor={3.5} saturation={0} fade speed={0.8} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.15}
            luminanceSmoothing={0.85}
            intensity={1.8}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.08} darkness={0.85} />
        </EffectComposer>
      </Suspense>

      <CameraRig mouseRef={mouseRef} />
    </Canvas>
  )
}
