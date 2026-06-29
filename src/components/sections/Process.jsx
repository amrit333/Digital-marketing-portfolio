import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STEPS = [
  { id: 1, title: 'Discovery', desc: 'Understanding your brand, audience, and goals.' },
  { id: 2, title: 'Strategy', desc: 'Crafting the blueprint for organic & paid growth.' },
  { id: 3, title: 'Execution', desc: 'Deploying campaigns, content, and automation.' },
  { id: 4, title: 'Scaling', desc: 'Optimising data to multiply ROAS and reach.' }
]

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  })

  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="process" className="process-section" ref={ref}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-eyebrow">06 — Workflow</span>
          <h2 className="section-title" style={{ marginTop: 14 }}>The Growth <span className="gradient-text">Engine</span></h2>
        </div>

        <div className="process-steps">
          <div className="process-connector">
            <motion.div className="process-connector-fill" style={{ width: fillWidth }} />
          </div>
          
          {STEPS.map((step, i) => (
            <div key={step.id} className="process-step">
              <motion.div 
                className="process-step-num"
                style={{
                  background: useTransform(scrollYProgress, 
                    [Math.max(0, (i-0.5)/3), i/3], 
                    ['rgba(10,12,22,0.6)', '#8b5cf6']
                  ),
                  borderColor: useTransform(scrollYProgress, 
                    [Math.max(0, (i-0.5)/3), i/3], 
                    ['rgba(255,255,255,0.1)', 'transparent']
                  ),
                  color: useTransform(scrollYProgress, 
                    [Math.max(0, (i-0.5)/3), i/3], 
                    ['#6b7280', '#ffffff']
                  )
                }}
              >
                0{step.id}
              </motion.div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
