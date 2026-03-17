'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export function InteractiveGalaxyBG() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Parallax effects based on scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-black" />
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Main galaxy image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: imageScale,
          y: imageY,
          opacity: opacity
        }}
      >
        <Image
          src="/images/galaxy-bg-optimized.webp"
          alt="Galaxy Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </motion.div>
      
      {/* Dark overlay - galaxy is shaded by default */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      
      {/* Strong vignette - darkens edges more */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, black 100%)',
          opacity: 0.6
        }}
      />
    </div>
  )
}
