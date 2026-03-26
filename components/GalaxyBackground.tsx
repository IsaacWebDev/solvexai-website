'use client'

import { useEffect, useRef, useState } from 'react'

interface Star {
  x: number
  y: number
  z: number
  size: number
  opacity: number
  brightness: number
  vx: number
  vy: number
}

interface DustParticle {
  x: number
  y: number
  opacity: number
  size: number
}

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const dustRef = useRef<DustParticle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const rafRef = useRef<number | undefined>(undefined)
  const [isMobile, setIsMobile] = useState(false)
  
  // On mobile, skip canvas entirely and use static background
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Return early on mobile with static background
  if (isMobile) {
    return (
      <div 
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/galaxy-bg-optimized.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#020A12'
        }}
      />
    )
  }

  useEffect(() => {
    // Mobile check already handled above
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // High-density realistic star field
    const starCount = isMobile ? 250 : 500
    starsRef.current = Array.from({ length: starCount }, () => {
      const sizeRand = Math.random()
      let size: number
      let brightness: number
      
      // 70% pinpoint, 20% small, 7% medium, 3% bright
      if (sizeRand < 0.7) {
        size = Math.random() * 0.5 + 0.5 // 0.5-1px
        brightness = Math.random() * 0.3 + 0.2 // Dim
      } else if (sizeRand < 0.9) {
        size = Math.random() * 1 + 1 // 1-2px
        brightness = Math.random() * 0.4 + 0.3
      } else if (sizeRand < 0.97) {
        size = Math.random() * 2 + 2 // 2-4px
        brightness = Math.random() * 0.5 + 0.4
      } else {
        size = Math.random() * 3 + 3 // 3-6px (bloomed)
        brightness = Math.random() * 0.4 + 0.6 // Bright
      }

      const z = Math.random() * 1.5 + 0.3

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z,
        size,
        opacity: brightness,
        brightness,
        vx: (Math.random() - 0.5) * 0.08 * z,
        vy: (Math.random() - 0.5) * 0.08 * z
      }
    })

    // Cosmic dust particles
    const dustCount = isMobile ? 40 : 80
    dustRef.current = Array.from({ length: dustCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      opacity: Math.random() * 0.08 + 0.02,
      size: Math.random() * 1.5 + 0.5
    }))

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight
      }
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    let time = 0
    const animate = () => {
      if (!canvas || !ctx) return
      time += 0.008

      const zoom = 1 + (scrollRef.current * 0.00006)

      // Astrophotography-accurate deep space background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      bgGradient.addColorStop(0, '#020A12') // Blue-black
      bgGradient.addColorStop(0.5, '#030B15')
      bgGradient.addColorStop(1, '#040C18')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (!isMobile) {
        // LARGE BLUE NEBULA BAND - astrophotography style
        ctx.filter = 'blur(100px)'

        // Main diagonal nebula band (blue/cyan)
        const nebulaX1 = canvas.width * 0.25 + Math.sin(time * 0.2) * 60
        const nebulaY1 = canvas.height * 0.65 + Math.cos(time * 0.15) * 50
        
        const nebulaGradient1 = ctx.createRadialGradient(
          nebulaX1, nebulaY1, 0,
          nebulaX1, nebulaY1, 1800
        )
        nebulaGradient1.addColorStop(0, 'rgba(77, 200, 232, 0.18)') // #4DC8E8 cyan
        nebulaGradient1.addColorStop(0.3, 'rgba(27, 92, 138, 0.14)') // #1B5C8A steel blue
        nebulaGradient1.addColorStop(0.6, 'rgba(10, 30, 61, 0.08)') // #0A1E3D deep navy
        nebulaGradient1.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = nebulaGradient1
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Secondary cyan emission region
        const nebulaX2 = canvas.width * 0.7 + Math.cos(time * 0.18) * 80
        const nebulaY2 = canvas.height * 0.35 + Math.sin(time * 0.22) * 60
        
        const nebulaGradient2 = ctx.createRadialGradient(
          nebulaX2, nebulaY2, 0,
          nebulaX2, nebulaY2, 1600
        )
        nebulaGradient2.addColorStop(0, 'rgba(125, 229, 245, 0.12)') // #7DE5F5 light cyan
        nebulaGradient2.addColorStop(0.4, 'rgba(77, 200, 232, 0.09)') // #4DC8E8
        nebulaGradient2.addColorStop(0.7, 'rgba(27, 92, 138, 0.05)')
        nebulaGradient2.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = nebulaGradient2
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Hot emission core (warm white-yellow like astrophoto)
        const coreX = canvas.width * 0.5 + Math.sin(time * 0.12) * 40
        const coreY = canvas.height * 0.5 + Math.cos(time * 0.16) * 35
        
        const coreGradient = ctx.createRadialGradient(
          coreX, coreY, 0,
          coreX, coreY, 900
        )
        coreGradient.addColorStop(0, 'rgba(255, 245, 224, 0.08)') // #FFF5E0 cream
        coreGradient.addColorStop(0.3, 'rgba(232, 240, 208, 0.05)') // #E8F0D0
        coreGradient.addColorStop(0.6, 'rgba(125, 229, 245, 0.03)') // #7DE5F5
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = coreGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Additional wisp for depth
        const wispX = canvas.width * 0.4
        const wispY = canvas.height * 0.2 + Math.sin(time * 0.25) * 40
        
        const wispGradient = ctx.createRadialGradient(
          wispX, wispY, 0,
          wispX, wispY, 1200
        )
        wispGradient.addColorStop(0, 'rgba(77, 200, 232, 0.1)')
        wispGradient.addColorStop(0.5, 'rgba(27, 92, 138, 0.06)')
        wispGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = wispGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.filter = 'none'
      }

      // Draw cosmic dust first (behind stars)
      dustRef.current.forEach(dust => {
        const dustGlow = ctx.createRadialGradient(dust.x, dust.y, 0, dust.x, dust.y, dust.size * 3)
        dustGlow.addColorStop(0, `rgba(77, 200, 232, ${dust.opacity})`)
        dustGlow.addColorStop(0.5, `rgba(27, 92, 138, ${dust.opacity * 0.5})`)
        dustGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = dustGlow
        ctx.beginPath()
        ctx.arc(dust.x, dust.y, dust.size * 3, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw high-density realistic star field
      starsRef.current.forEach((star) => {
        const parallaxX = mouseRef.current.x * star.z * 30 * zoom
        const parallaxY = (scrollRef.current * star.z * 0.5 * zoom) + (mouseRef.current.y * star.z * 30 * zoom)

        star.x += star.vx * zoom
        star.y += star.vy * zoom

        const buffer = 100
        if (star.x < -buffer) star.x = canvas.width + buffer
        if (star.x > canvas.width + buffer) star.x = -buffer
        if (star.y < -buffer) star.y = canvas.height + buffer
        if (star.y > canvas.height + buffer) star.y = -buffer

        const x = star.x + parallaxX
        const y = star.y - parallaxY

        // Realistic star color (blue-white to white, occasional warm)
        const colorRand = Math.random()
        let starColor: string
        
        if (colorRand < 0.7) {
          starColor = `rgba(220, 230, 255, ${star.opacity * zoom})` // Blue-white
        } else if (colorRand < 0.95) {
          starColor = `rgba(255, 255, 255, ${star.opacity * zoom})` // Pure white
        } else {
          starColor = `rgba(255, 245, 230, ${star.opacity * zoom})` // Warm white
        }

        // Gaussian bloom for bright stars
        if (star.size > 2) {
          const glowSize = star.size * 3
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
          glowGradient.addColorStop(0, colorRand < 0.95 ? `rgba(200, 220, 255, ${star.opacity * 0.6})` : `rgba(255, 245, 230, ${star.opacity * 0.6})`)
          glowGradient.addColorStop(0.4, colorRand < 0.95 ? `rgba(200, 220, 255, ${star.opacity * 0.3})` : `rgba(255, 245, 230, ${star.opacity * 0.3})`)
          glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
          
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(x, y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // Star core
        ctx.fillStyle = starColor
        ctx.beginPath()
        ctx.arc(x, y, star.size * zoom, 0, Math.PI * 2)
        ctx.fill()

        // Subtle twinkle
        if (Math.random() > 0.998) {
          star.opacity = star.brightness * (Math.random() * 0.4 + 0.8)
        } else {
          star.opacity += (star.brightness - star.opacity) * 0.01
        }
      })

      // Subtle vignette (less dramatic than before)
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.4,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      )
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)')
      vignette.addColorStop(0.8, 'rgba(0, 0, 0, 0.2)')
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.5)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none galaxy-background"
      style={{
        background: '#020A12'
      }}
    />
  )
}
