import { useEffect, useRef } from 'react'

/* Pure CSS / JS animated background:
   - 4 gradient blobs drifting slowly
   - Aurora sweep at top
   - Noise texture overlay
   - Floating particles (canvas)
*/

export default function BackgroundEffects() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let width, height

    const particles = []
    const PARTICLE_COUNT = 80

    class Particle {
      constructor() { this.reset(true) }
      reset(initial = false) {
        this.x = Math.random() * width
        this.y = initial ? Math.random() * height : height + 10
        this.size = Math.random() * 1.5 + 0.5
        this.speedY = -(Math.random() * 0.4 + 0.15)
        this.speedX = (Math.random() - 0.5) * 0.2
        this.opacity = Math.random() * 0.4 + 0.1
        this.color = ['#4f8eff', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 4)]
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.y < -10) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const init = () => {
      resize()
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => { p.update(); p.draw() })
      animId = requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener('resize', () => { resize() })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* Floating gradient blobs */}
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
      <div className="bg-blob bg-blob-4" />

      {/* Aurora at top */}
      <div className="aurora" />

      {/* Floating particles canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6,
        }}
      />

      {/* Noise texture overlay for premium feel */}
      <div className="noise-overlay" />
    </>
  )
}
