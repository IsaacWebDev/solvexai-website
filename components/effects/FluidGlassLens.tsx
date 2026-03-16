'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function FluidGlassLens() {
  const [mounted, setMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const lensX = useSpring(mouseX, springConfig)
  const lensY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsHovering(true)
    }
    
    const handleMouseLeave = () => {
      setIsHovering(false)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-50"
      style={{
        left: 0,
        top: 0,
        x: lensX,
        y: lensY,
        translateX: '-50%',
        translateY: '-50%'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isHovering ? 1 : 0,
        scale: isHovering ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Outer glow ring */}
      <div className="relative w-48 h-48">
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, rgba(139,92,246,0.8), rgba(59,130,246,0.8), rgba(139,92,246,0.8))',
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Glass lens effect */}
        <div className="absolute inset-[3px] rounded-full overflow-hidden">
          {/* Backdrop blur layer */}
          <div 
            className="absolute inset-0 backdrop-blur-2xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
              boxShadow: 'inset 0 0 30px rgba(255,255,255,0.2)'
            }}
          />
          
          {/* Inner glass highlight */}
          <div 
            className="absolute top-6 left-6 w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent)',
              filter: 'blur(8px)'
            }}
          />
          
          {/* Chromatic aberration effect */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at center, transparent 40%, rgba(139,92,246,0.1) 70%, transparent 100%)',
                mixBlendMode: 'screen'
              }}
            />
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at center, transparent 40%, rgba(59,130,246,0.1) 70%, transparent 100%)',
                mixBlendMode: 'screen',
                transform: 'translate(2px, 2px)'
              }}
            />
          </div>
          
          {/* Refraction distortion ring */}
          <div 
            className="absolute inset-4 rounded-full border-2"
            style={{
              borderColor: 'rgba(255,255,255,0.2)',
              boxShadow: '0 0 20px rgba(139,92,246,0.3)'
            }}
          />
        </div>
        
        {/* Outer glow */}
        <div 
          className="absolute inset-[-20px] rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)'
          }}
        />
      </div>
    </motion.div>
  )
}
