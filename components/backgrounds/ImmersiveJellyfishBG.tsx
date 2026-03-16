'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export function ImmersiveJellyfishBG() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 30, stiffness: 100 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)
  
  // Scroll-based transforms
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.3])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 0.5, 0.6, 0.4])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.6])

  useEffect(() => {
    setMounted(true)
    
    // Play video when mounted
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err)
      })
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-black" />
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Main jellyfish video with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: videoScale,
          opacity: videoOpacity,
          x: useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-20, 20]),
          y: useTransform(smoothMouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-10, 10])
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.7) contrast(1.1) saturate(1.2)',
          }}
        >
          <source src="/videos/jellyfish-hero.mp4" type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Gradient overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Purple/cyan glow overlay (interactive) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${smoothMouseX.get ? smoothMouseX.get() : 50}px ${smoothMouseY.get ? smoothMouseY.get() : 50}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-purple-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [-20, 20, -20],
              x: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Ambient light orbs (follow jellyfish) */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
        style={{ 
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)',
          x: useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-30, 30]),
          y: useTransform(smoothMouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-20, 20])
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15"
        style={{ 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)',
          x: useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [20, -20]),
          y: useTransform(smoothMouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [15, -15])
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, black 100%)',
          opacity: 0.4
        }}
      />
      
      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </div>
  )
}
