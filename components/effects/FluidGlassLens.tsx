'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function FluidGlassLens() {
  const [mounted, setMounted] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const lensRef = useRef<HTMLDivElement>(null)
  
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
      if (!isActive) setIsActive(true)
    }
    
    const handleMouseLeave = () => {
      setIsActive(false)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY, isActive])

  if (!mounted) return null

  return (
    <motion.div
      ref={lensRef}
      className="pointer-events-none fixed z-50"
      style={{
        left: 0,
        top: 0,
        x: lensX,
        y: lensY,
        translateX: '-50%',
        translateY: '-50%',
        width: 200,
        height: 200,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.8
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Rotating gradient border */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #8B5CF6, #3B82F6, #0EA5E9, #3B82F6, #8B5CF6)',
          padding: '2px',
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Inner lens with actual magnification */}
        <div 
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(0px)',
            WebkitBackdropFilter: 'blur(0px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
              inset 0 0 30px rgba(255, 255, 255, 0.1),
              0 8px 32px rgba(139, 92, 246, 0.3),
              0 0 0 1px rgba(139, 92, 246, 0.2)
            `,
          }}
        >
          {/* SVG filter for lens distortion */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <filter id="lensDistortion" x="-50%" y="-50%" width="200%" height="200%">
                {/* Displacement map for magnification effect */}
                <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="
                  1.2 0 0 0 0
                  0 1.2 0 0 0
                  0 0 1.2 0 0
                  0 0 0 1 0
                " result="bright" />
                <feComposite in="SourceGraphic" in2="bright" operator="over" />
              </filter>
              
              {/* Radial gradient for magnifying glass effect */}
              <radialGradient id="lensGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="70%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <circle 
              cx="100" 
              cy="100" 
              r="95" 
              fill="url(#lensGradient)" 
              filter="url(#lensDistortion)"
            />
          </svg>
          
          {/* Glass highlight (top-left) */}
          <div 
            className="absolute top-8 left-8 w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.6), transparent 70%)',
              filter: 'blur(10px)'
            }}
          />
          
          {/* Fresnel edge glow */}
          <div 
            className="absolute inset-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, transparent 50%, rgba(255,255,255,0.3) 90%, transparent)',
              mixBlendMode: 'overlay'
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
