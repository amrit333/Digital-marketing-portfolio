import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Stars, OrbitControls, Sphere, PointMaterial, Points, Trail } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, LensFlare } from '@react-three/postprocessing'
import * as THREE from 'three'
import gsap from 'gsap'

export const GALAXY_SKILLS = [
  { id: 'meta', name: 'Meta Ads', color: '#1877f2', radius: 4, size: 0.4, speed: 0.2, score: 95, exp: '1.5+ Years', budget: '₹20+ Lakhs',
    projects: [{ name: 'Stitchery by Preet', result: '85K+ Views', desc: 'Launched handcrafted fashion brand from zero' }],
    achievements: ['Managed ₹20+ Lakhs Ad Spend', 'Reduced CPL by 42%'], tech: ['Meta Business Suite', 'Facebook Pixel', 'CAPI'] },
  { id: 'google', name: 'Google Ads', color: '#fbbc04', radius: 5.5, size: 0.35, speed: 0.15, score: 90, exp: '1 Year', budget: '₹5+ Lakhs',
    projects: [], achievements: ['Increased ROAS to 6.5x'], tech: ['Google Ads', 'GA4', 'Tag Manager'] },
  { id: 'seo', name: 'SEO', color: '#4f8eff', radius: 7, size: 0.45, speed: 0.1, score: 88, exp: '1+ Year', budget: 'Organic',
    projects: [{ name: 'Daydream Epoxy', result: 'Crawl Audit', desc: 'Complete technical search audit' }], achievements: ['Improved Organic Rankings'], tech: ['Ahrefs', 'SEMrush', 'Search Console'] },
  { id: 'smm', name: 'Social Media', color: '#ec4899', radius: 8.5, size: 0.5, speed: 0.08, score: 92, exp: '1.5+ Years', budget: 'Organic',
    projects: [], achievements: ['Grew Reach by 300%'], tech: ['Hootsuite', 'Buffer', 'Later'] },
  { id: 'insta', name: 'Instagram', color: '#e1306c', radius: 10, size: 0.55, speed: 0.06, score: 98, exp: '1.5+ Years', budget: 'Organic',
    projects: [{ name: 'Solitaire Infosys', result: '150+ Leads', desc: 'Engineered complete organic funnel' }], achievements: ['Grew Instagram 0–10K'], tech: ['Reels', 'Stories', 'Insights'] },
  { id: 'fb', name: 'Facebook', color: '#1877f2', radius: 11.5, size: 0.4, speed: 0.05, score: 90, exp: '1.5+ Years', budget: '₹15+ Lakhs',
    projects: [], achievements: ['Generated 10,000+ Leads'], tech: ['Facebook Pages', 'Groups', 'Creator Studio'] },
  { id: 'youtube', name: 'YouTube', color: '#ff0000', radius: 13, size: 0.45, speed: 0.04, score: 85, exp: '1 Year', budget: 'Organic',
    projects: [{ name: 'Tech Wealth Coach', result: '69K+ Impr.', desc: 'Built finance & AI channel' }], achievements: ['Gained 69K+ Impressions in 28 days'], tech: ['Premiere Pro', 'CapCut', 'TubeBuddy'] },
  { id: 'ai', name: 'AI Automation', color: '#8b5cf6', radius: 14.5, size: 0.5, speed: 0.035, score: 95, exp: '1 Year', budget: 'N/A',
    projects: [], achievements: ['Created AI Automation Workflow', 'Reduced production time by 70%'], tech: ['ChatGPT', 'Leonardo AI', 'Zapier'] },
  { id: 'canva', name: 'Canva', color: '#00c4cc', radius: 16, size: 0.35, speed: 0.03, score: 96, exp: '2+ Years', budget: 'N/A',
    projects: [], achievements: ['Designed 500+ creatives'], tech: ['Canva Pro', 'Presentations', 'Video Editing'] },
  { id: 'content', name: 'Content Strategy', color: '#10b981', radius: 17.5, size: 0.4, speed: 0.025, score: 90, exp: '1.5+ Years', budget: 'Organic',
    projects: [], achievements: ['Built 30-day content pillars'], tech: ['Notion', 'Google Docs', 'Trello'] },
  { id: 'wp', name: 'WordPress', color: '#21759b', radius: 19, size: 0.45, speed: 0.02, score: 85, exp: '1 Year', budget: 'N/A',
    projects: [], achievements: ['Built 5+ high-converting landing pages'], tech: ['Elementor', 'WooCommerce', 'WP Rocket'] },
  { id: 'email', name: 'Email Marketing', color: '#f59e0b', radius: 20.5, size: 0.38, speed: 0.015, score: 88, exp: '1 Year', budget: 'N/A',
    projects: [], achievements: ['Achieved 45% Open Rate'], tech: ['Mailchimp', 'ActiveCampaign', 'Klaviyo'] },
  { id: 'lead', name: 'Lead Gen', color: '#a855f7', radius: 22, size: 0.42, speed: 0.012, score: 94, exp: '1.5+ Years', budget: '₹10+ Lakhs',
    projects: [], achievements: ['Generated 10,000+ B2B & B2C Leads'], tech: ['ManyChat', 'Forms', 'Webhooks'] },
  { id: 'analytics', name: 'Analytics', color: '#06b6d4', radius: 23.5, size: 0.36, speed: 0.01, score: 90, exp: '1.5+ Years', budget: 'N/A',
    projects: [], achievements: ['Set up cross-domain tracking'], tech: ['GA4', 'Looker Studio', 'GTM'] },
  { id: 'branding', name: 'Branding', color: '#ec4899', radius: 25, size: 0.35, speed: 0.008, score: 85, exp: '1 Year', budget: 'N/A',
    projects: [], achievements: ['Developed brand guidelines for 3 startups'], tech: ['Figma', 'Illustrator', 'Color Theory'] },
  { id: 'copy', name: 'Copywriting', color: '#10b981', radius: 26.5, size: 0.3, speed: 0.006, score: 92, exp: '1.5+ Years', budget: 'N/A',
    projects: [], achievements: ['Wrote copy that drove ₹5L in sales'], tech: ['Direct Response', 'Storytelling', 'A/B Testing'] }
]

function SpaceDust({ count = 3000 }) {
  const pointsRef = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 30 * Math.sqrt(Math.random())
      const theta = Math.random() * 2 * Math.PI
      const y = (Math.random() - 0.5) * 5
      arr[i * 3] = r * Math.cos(theta)
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = r * Math.sin(theta)
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.05} opacity={0.4} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  )
}

function Planet({ skill, activeSkill, setActiveSkill, hoveredSkill, setHoveredSkill }) {
  const meshRef = useRef()
  const orbitRef = useRef()
  const isHovered = hoveredSkill?.id === skill.id
  const isActive = activeSkill?.id === skill.id
  const angleRef = useRef(Math.random() * Math.PI * 2)

  useFrame((state, delta) => {
    if (!meshRef.current || !orbitRef.current) return

    // Orbit logic
    if (!isHovered && !isActive) {
      angleRef.current += skill.speed * delta
    }
    const x = Math.cos(angleRef.current) * skill.radius
    const z = Math.sin(angleRef.current) * skill.radius
    
    orbitRef.current.position.set(x, 0, z)
    meshRef.current.rotation.y += delta * 0.5
    
    // Hover pop effect
    if (isHovered && !isActive) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1)
      orbitRef.current.position.y = THREE.MathUtils.lerp(orbitRef.current.position.y, 0.5, 0.1)
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      orbitRef.current.position.y = THREE.MathUtils.lerp(orbitRef.current.position.y, 0, 0.1)
    }
  })

  return (
    <>
      {/* Orbit Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[skill.radius - 0.02, skill.radius + 0.02, 64]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Planet Group */}
      <group ref={orbitRef}>
        <Trail width={1} length={20} color={skill.color} attenuation={(t) => t * t}>
          <mesh
            ref={meshRef}
            onClick={(e) => {
              e.stopPropagation()
              setActiveSkill(skill)
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              if (!activeSkill) setHoveredSkill(skill)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              setHoveredSkill(null)
              document.body.style.cursor = 'auto'
            }}
          >
            <sphereGeometry args={[skill.size, 32, 32]} />
            <meshStandardMaterial 
              color={skill.color} 
              metalness={0.6} 
              roughness={0.4} 
              emissive={skill.color} 
              emissiveIntensity={isHovered || isActive ? 0.8 : 0.2}
            />
            
            {/* Atmosphere glow */}
            {(isHovered || isActive) && (
              <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[skill.size, 32, 32]} />
                <meshBasicMaterial color={skill.color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
              </mesh>
            )}
          </mesh>
        </Trail>
      </group>
    </>
  )
}

function CameraController({ activeSkill }) {
  const { camera } = useThree()
  const controlsRef = useRef()

  useEffect(() => {
    if (activeSkill) {
      // Zoom to planet
      // Note: In a real advanced R3F setup, we'd calculate the exact world position of the planet
      // For simplicity in this structure, we'll just move the camera closer and restrict controls
      gsap.to(camera.position, {
        x: 0,
        y: 2,
        z: 8,
        duration: 1.5,
        ease: 'power3.inOut'
      })
    } else {
      // Reset to galaxy view
      gsap.to(camera.position, {
        x: 0,
        y: 8,
        z: 20,
        duration: 1.5,
        ease: 'power3.inOut'
      })
    }
  }, [activeSkill, camera])

  return <OrbitControls ref={controlsRef} enablePan={false} enableZoom={!activeSkill} maxDistance={40} minDistance={5} />
}

export default function SkillsGalaxy({ activeSkill, setActiveSkill, hoveredSkill, setHoveredSkill }) {
  return (
    <>
      <color attach="background" args={['#020205']} />
      <ambientLight intensity={0.2} />
      
      {/* Central Sun (Digital Marketing Core) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight intensity={3} color="#ffffff" distance={50} decay={2} />
      </mesh>
      
      {/* Sun Aura */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#4f8eff" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>

      <SpaceDust />
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />

      {/* Planets */}
      {GALAXY_SKILLS.map(skill => (
        <Planet 
          key={skill.id} 
          skill={skill} 
          activeSkill={activeSkill} 
          setActiveSkill={setActiveSkill}
          hoveredSkill={hoveredSkill}
          setHoveredSkill={setHoveredSkill}
        />
      ))}

      <CameraController activeSkill={activeSkill} />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  )
}
