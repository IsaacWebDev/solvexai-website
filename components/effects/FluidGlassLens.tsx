'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function FluidGlassLens() {
  const [mounted, setMounted] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 120 }
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

  // SVG distortion filter effect (mimics glass refraction)
  useEffect(() => {
    if (!mounted || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = 200
    canvas.height = 200
    
    // Create radial glass effect
    const gradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 100)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 200, 200)
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      {/* SVG Filters for glass distortion */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="glassDistortion" x="-50%" y="-50%" width="200%" height="200%">
            {/* Gaussian blur for depth */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
            
            {/* Displacement map for refraction */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.01" 
              numOctaves="3" 
              result="noise"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="8" 
              xChannelSelector="R" 
              yChannelSelector="G"
              result="distorted"
            />
            
            {/* Specular lighting for glass highlight */}
            <feSpecularLighting 
              in="distorted" 
              surfaceScale="5" 
              specularConstant="0.8" 
              specularExponent="20" 
              lighting-color="white"
              result="spec"
            >
              <fePointLight x="100" y="100" z="200" />
            </feSpecularLighting>
            
            {/* Composite everything */}
            <feComposite 
              in="distorted" 
              in2="spec" 
              operator="arithmetic" 
              k1="0" 
              k2="1" 
              k3="1" 
              k4="0"
            />
          </filter>
          
          {/* Chromatic aberration */}
          <filter id="chromaticAberration">
            <feOffset in="SourceGraphic" dx="2" dy="0" result="r" />
            <feOffset in="SourceGraphic" dx="0" dy="0" result="g" />
            <feOffset in="SourceGraphic" dx="-2" dy="0" result="b" />
            
            <feBlend mode="screen" in="r" in2="g" result="rg" />
            <feBlend mode="screen" in="rg" in2="b" />
          </filter>
        </defs>
      </svg>

      {/* Fluid glass lens */}
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
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.8
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative w-64 h-64">
          {/* Outer animated border (conic gradient) */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-80"
            style={{
              background: 'conic-gradient(from 0deg, #8B5CF6, #3B82F6, #0EA5E9, #3B82F6, #8B5CF6)',
              filter: 'blur(4px)'
            }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Main glass lens */}
          <div 
            className="absolute inset-[4px] rounded-full overflow-hidden"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1))',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: 'inset 0 0 60px rgba(255,255,255,0.1), 0 8px 32px rgba(139,92,246,0.3)',
              border: '1px solid rgba(255,255,255,0.18)'
            }}
          >
            {/* Glass highlight (top-left) */}
            <div 
              className="absolute top-8 left-8 w-20 h-20 rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.6), transparent 60%)',
                filter: 'blur(12px)'
              }}
            />
            
            {/* Refraction rings */}
            <div 
              className="absolute inset-8 rounded-full"
              style={{
                border: '2px solid rgba(255,255,255,0.1)',
                boxShadow: '0 0 30px rgba(139,92,246,0.2)'
              }}
            />
            <div 
              className="absolute inset-12 rounded-full"
              style={{
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            />
            
            {/* Chromatic aberration overlay */}
            <div className="absolute inset-0 mix-blend-screen opacity-30">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, transparent 30%, rgba(139,92,246,0.4) 70%, transparent)',
                  transform: 'translate(-1px, -1px)'
                }}
              />
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, transparent 30%, rgba(59,130,246,0.4) 70%, transparent)',
                  transform: 'translate(1px, 1px)'
                }}
              />
            </div>
            
            {/* Fresnel effect (edge glow) */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, transparent 60%, rgba(255,255,255,0.4) 95%, transparent)',
                mixBlendMode: 'overlay'
              }}
            />
          </div>
          
          {/* Outer glow / bloom */}
          <div 
            className="absolute inset-[-40px] rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.4), rgba(59,130,246,0.2) 50%, transparent 70%)',
              filter: 'blur(30px)'
            }}
          />
        </div>
      </motion.div>
    </>
  )
}
