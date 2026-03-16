'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export function InteractiveSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)
  
  // Mouse tracking for orb
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const orbX = useSpring(mouseX, springConfig)
  const orbY = useSpring(mouseY, springConfig)
  
  // Parallax transforms based on scroll
  const galaxyOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 0.4, 0.6, 0.3])
  const galaxyScale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const galaxyRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])
  const nebulae1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const nebulae2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])

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
    
    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
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
        
        // Move stars
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
        
        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.02
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => cancelAnimationFrame(animationId)
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Animated stars canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Moving nebulae layer 1 */}
      <motion.div
        className="absolute inset-0"
        style={{ y: nebulae1Y }}
      >
        <div className="absolute top-[20%] left-[10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[30%] right-[15%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
      </motion.div>
      
      {/* Moving nebulae layer 2 */}
      <motion.div
        className="absolute inset-0"
        style={{ y: nebulae2Y }}
      >
        <div className="absolute top-[50%] left-[30%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[90px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[110px]" />
      </motion.div>
      
      {/* Rotating galaxy */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]"
        style={{
          opacity: galaxyOpacity,
          scale: galaxyScale,
          rotate: galaxyRotate
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-purple-600/20 via-blue-600/10 to-transparent rounded-full blur-3xl" />
      </motion.div>
      
      {/* Interactive orb (right side) */}
      <motion.div
        className="fixed right-[15%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{
          x: useTransform(orbX, (value) => (value - window.innerWidth) * 0.02),
          y: useTransform(orbY, (value) => (value - window.innerHeight / 2) * 0.02)
        }}
      >
        {/* Outer glow layers */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-[80px] opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Middle glow */}
        <motion.div
          className="absolute inset-[15%] rounded-full bg-gradient-to-r from-purple-400 to-blue-400 blur-[60px] opacity-50"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Core orb */}
        <motion.div
          className="absolute inset-[25%] rounded-full bg-gradient-to-br from-purple-300 via-blue-400 to-cyan-300 shadow-[0_0_80px_rgba(139,92,246,0.6)]"
          animate={{
            boxShadow: [
              '0 0 80px rgba(139,92,246,0.6)',
              '0 0 120px rgba(59,130,246,0.8)',
              '0 0 80px rgba(139,92,246,0.6)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner highlight */}
        <div className="absolute inset-[35%] top-[30%] left-[30%] w-[20%] h-[20%] rounded-full bg-white/40 blur-xl" />
      </motion.div>
      
      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </div>
  )
}
