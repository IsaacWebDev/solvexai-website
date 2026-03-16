'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function SpaceHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  
  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 30, stiffness: 100 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
      
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
      
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      }
      
      window.addEventListener('resize', handleResize)
      window.addEventListener('mousemove', handleMouseMove)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [mouseX, mouseY])

  // Animated stars
  useEffect(() => {
    if (!mounted) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = dimensions.width
    canvas.height = dimensions.height
    
    const stars: Array<{ x: number; y: number; size: number; opacity: number }> = []
    
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        opacity: Math.random() * 0.8 + 0.2
      })
    }
    
    let animationId: number
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach(star => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
        
        star.opacity += (Math.random() - 0.5) * 0.015
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => cancelAnimationFrame(animationId)
  }, [mounted, dimensions])

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-[#080C14]" />
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#080C14]">
      {/* Stars canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Subtle nebulae */}
      <div className="absolute top-[30%] left-[15%] w-[700px] h-[700px] rounded-full blur-[140px] opacity-30" 
           style={{ background: 'radial-gradient(circle, rgba(26,58,74,0.3), transparent)' }} />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-25"
           style={{ background: 'radial-gradient(circle, rgba(107,58,90,0.25), transparent)' }} />
      <div className="absolute top-[15%] right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
           style={{ background: 'radial-gradient(circle, rgba(0,150,180,0.2), transparent)' }} />
      
      {/* Large 3D neural network structure (right side) */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          top: '50%',
          right: '10%',
          width: '50vw',
          height: '70vh',
          maxWidth: '900px',
          maxHeight: '1000px',
          x: smoothMouseX.get() ? (smoothMouseX.get() - dimensions.width) * 0.01 : 0,
          y: smoothMouseY.get() ? (smoothMouseY.get() - dimensions.height / 2) * 0.01 : 0,
          translateY: '-50%'
        }}
      >
        {/* Central cyan glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.5) 0%, rgba(0,229,255,0.15) 40%, transparent 70%)' }}
          animate={{
            opacity: [0.5, 0.7, 0.5],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Wireframe structure */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="nodeGrad">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#B0F4FF" />
              <stop offset="100%" stopColor="#00E5FF" />
            </radialGradient>
          </defs>
          
          {/* Outer ring */}
          <motion.circle
            cx="250" cy="250" r="180"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1"
            opacity="0.4"
            filter="url(#glow)"
            animate={{ r: [178, 182, 178] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Middle ring */}
          <motion.circle
            cx="250" cy="250" r="120"
            fill="none"
            stroke="#80EFFF"
            strokeWidth="0.8"
            opacity="0.3"
            filter="url(#glow)"
            animate={{ r: [118, 122, 118], rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '250px 250px' }}
          />
          
          {/* Connection web */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '250px 250px' }}
          >
            {/* Radial connections */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={`spoke-${i}`}
                x1="250"
                y1="250"
                x2={250 + Math.cos(angle * Math.PI / 180) * 180}
                y2={250 + Math.sin(angle * Math.PI / 180) * 180}
                stroke="#80EFFF"
                strokeWidth="0.5"
                opacity="0.25"
                filter="url(#glow)"
              />
            ))}
            
            {/* Outer nodes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.circle
                key={`node-outer-${i}`}
                cx={250 + Math.cos(angle * Math.PI / 180) * 180}
                cy={250 + Math.sin(angle * Math.PI / 180) * 180}
                r="5"
                fill="url(#nodeGrad)"
                filter="url(#glow)"
                animate={{
                  r: [4, 6, 4],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Mid-ring nodes */}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
              <motion.circle
                key={`node-mid-${i}`}
                cx={250 + Math.cos(angle * Math.PI / 180) * 120}
                cy={250 + Math.sin(angle * Math.PI / 180) * 120}
                r="4"
                fill="url(#nodeGrad)"
                filter="url(#glow)"
                animate={{
                  r: [3.5, 5, 3.5],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.g>
          
          {/* Central core */}
          <motion.circle
            cx="250" cy="250" r="12"
            fill="url(#nodeGrad)"
            filter="url(#glow)"
            animate={{
              r: [10, 14, 10],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={250 + (Math.random() - 0.5) * 300}
              cy={250 + (Math.random() - 0.5) * 300}
              r="1"
              fill="#00E5FF"
              opacity="0"
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                y: [-10, 10, -10]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  )
}
