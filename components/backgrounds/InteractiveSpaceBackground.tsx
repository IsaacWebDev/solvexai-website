'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export function InteractiveSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)
  
  // Mouse tracking for neural network structure
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 30, stiffness: 100 }
  const structureX = useSpring(mouseX, springConfig)
  const structureY = useSpring(mouseY, springConfig)
  
  // Parallax transforms based on scroll
  const nebulae1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const nebulae2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const structureRotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Animated stars canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = []
    
    // Create varied star field
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.3 + 0.05,
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
        
        // Subtle star movement
        star.y += star.speed
        star.x += Math.sin(star.y * 0.01) * 0.1
        
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
        
        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.015
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => cancelAnimationFrame(animationId)
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #080C14, #0D1520)' }}>
      {/* Animated stars canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Subtle teal-blue nebula (center-left) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: nebulae1Y }}
      >
        <div className="absolute top-[30%] left-[15%] w-[700px] h-[700px] rounded-full blur-[140px]" 
             style={{ background: 'radial-gradient(circle, rgba(26,58,74,0.3) 0%, transparent 70%)' }} />
      </motion.div>
      
      {/* Pink/mauve nebula (lower-left) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: nebulae2Y }}
      >
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[100px]"
             style={{ background: 'radial-gradient(circle, rgba(107,58,90,0.25) 0%, transparent 70%)' }} />
      </motion.div>
      
      {/* Blue-teal nebula cluster (upper-right) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: nebulae1Y }}
      >
        <div className="absolute top-[15%] right-[10%] w-[600px] h-[600px] rounded-full blur-[120px]"
             style={{ background: 'radial-gradient(circle, rgba(0,150,180,0.2) 0%, transparent 70%)' }} />
      </motion.div>
      
      {/* Interactive neural network structure (right-center) */}
      <motion.div
        className="fixed top-1/2 pointer-events-none"
        style={{
          right: '25%',
          x: useTransform(structureX, (value) => mounted ? (value - window.innerWidth) * 0.015 : 0),
          y: useTransform(structureY, (value) => mounted ? (value - window.innerHeight / 2) * 0.015 : 0),
          translateY: '-50%',
          rotate: structureRotate,
          width: '45vw',
          height: '60vh',
          maxWidth: '800px',
          maxHeight: '900px'
        }}
      >
        {/* Central cyan glow core */}
        <motion.div
          className="absolute inset-0 rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.4) 0%, rgba(0,229,255,0.1) 40%, transparent 70%)' }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Wireframe structure layers */}
        {/* Outer ring */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" style={{ filter: 'drop-shadow(0 0 20px rgba(0,229,255,0.6))' }}>
          <motion.circle
            cx="200" cy="200" r="150"
            fill="none"
            stroke="rgba(0,229,255,0.4)"
            strokeWidth="1"
            animate={{
              strokeOpacity: [0.3, 0.6, 0.3],
              r: [148, 152, 148]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Inner geometric web */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '200px 200px' }}
          >
            {/* Connection lines creating neural network pattern */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <line
                key={`spoke-${i}`}
                x1="200" y1="200"
                x2={200 + Math.cos(angle * Math.PI / 180) * 150}
                y2={200 + Math.sin(angle * Math.PI / 180) * 150}
                stroke="rgba(128,239,255,0.3)"
                strokeWidth="0.5"
              />
            ))}
            
            {/* Node spheres at vertices */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.circle
                key={`node-${i}`}
                cx={200 + Math.cos(angle * Math.PI / 180) * 150}
                cy={200 + Math.sin(angle * Math.PI / 180) * 150}
                r="4"
                fill="url(#nodeGradient)"
                animate={{
                  r: [3.5, 5, 3.5],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.g>
          
          {/* Central core node */}
          <motion.circle
            cx="200" cy="200" r="8"
            fill="url(#coreGradient)"
            animate={{
              r: [7, 10, 7],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Gradients */}
          <defs>
            <radialGradient id="nodeGradient">
              <stop offset="0%" stopColor="#B0F4FF" />
              <stop offset="100%" stopColor="#00E5FF" />
            </radialGradient>
            <radialGradient id="coreGradient">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#B0F4FF" />
              <stop offset="100%" stopColor="#00E5FF" />
            </radialGradient>
          </defs>
        </svg>
        
        {/* Particle effects around structure */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: 'rgba(0,229,255,0.8)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(1px)'
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [-10, 10]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </div>
  )
}
