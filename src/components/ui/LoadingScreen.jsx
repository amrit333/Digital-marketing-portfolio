import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Simulate loading progress
    const steps = [15, 30, 45, 60, 72, 85, 95, 100]
    let i = 0
    const timer = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i])
        i++
      } else {
        clearInterval(timer)
        // Hold at 100% briefly then exit
        setTimeout(() => {
          setVisible(false)
          setTimeout(onComplete, 700)
        }, 400)
      }
    }, 220)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient glow */}
          <div style={{
            position: 'absolute',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />

          {/* Logo letters staggered in */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div className="loading-logo">
              {'AMRIT'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.7,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.2em',
                color: 'var(--text-muted)',
                marginTop: 8,
                textTransform: 'uppercase',
              }}
            >
              Digital Marketing Expert
            </motion.p>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div className="loading-bar-container">
              <motion.div
                className="loading-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <span className="loading-percent">Loading experience</span>
              <span className="loading-percent">{progress}%</span>
            </div>
          </motion.div>

          {/* Spinning ring decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: '50%',
              border: '1px solid rgba(139, 92, 246, 0.15)',
              animation: 'cube-rotate 8s linear infinite',
              borderTopColor: 'rgba(139, 92, 246, 0.5)',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '1px solid rgba(79, 142, 255, 0.15)',
              animation: 'cube-rotate 5s linear infinite reverse',
              borderRightColor: 'rgba(79, 142, 255, 0.5)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
