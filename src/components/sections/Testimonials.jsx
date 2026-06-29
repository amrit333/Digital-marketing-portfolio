import { useRef, useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const TESTIMONIALS = [
  { name: 'Preet', role: 'Founder, Stitchery', text: "Amrit completely transformed our launch. 85K views in month one was beyond our expectations. The ManyChat integration saves us hours every day." },
  { name: 'Rahul S.', role: 'Director, Solitaire Infosys', text: "The organic lead generation funnel Amrit built is incredible. 150+ high quality leads without spending a rupee on ads. Highly recommended!" },
  { name: 'Vikram', role: 'Tech Wealth Coach', text: "My YouTube channel blew up thanks to his SEO and thumbnail strategies. Over 200% growth in less than a month. He knows the algorithms inside out." },
  { name: 'Sarah M.', role: 'Marketing Head', text: "The AI automation workflows Amrit implemented reduced our content production time by 70%. We're publishing 3x more content with better engagement." },
  { name: 'David K.', role: 'E-com Store Owner', text: "ROAS went from 1.5x to 6.5x in two months. His approach to Meta Ads and audience testing is methodical and highly effective." }
]

export default function Testimonials() {
  const [width, setWidth] = useState(0)
  const carouselRef = useRef(null)
  const controls = useAnimation()

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [])

  return (
    <section id="testimonials" className="testimonials-section" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: 40, textAlign: 'center' }}>
        <span className="section-eyebrow">05 — Testimonials</span>
        <h2 className="section-title" style={{ marginTop: 14 }}>Client <span className="gradient-text">Success</span></h2>
      </div>

      <motion.div ref={carouselRef} className="testimonials-track-wrapper" style={{ cursor: 'grab', overflow: 'hidden' }}>
        <motion.div 
          className="testimonials-track"
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="glass-card testimonial-card">
              <div className="testimonial-stars">
                {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star" style={{ color: '#fbbc04', fontSize: 12 }} />)}
              </div>
              <p className="testimonial-quote">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: `hsl(${i * 60 + 200}, 70%, 60%)` }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
