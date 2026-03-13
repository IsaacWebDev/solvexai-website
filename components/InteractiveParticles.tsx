'use client'
import { useEffect, useRef } from 'react'

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    // Particle system
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 3 + 1
        this.color = Math.random() > 0.5 ? '#00F0FF' : '#0066FF'
      }
      
      update(mouseX: number | null, mouseY: number | null, canvasWidth: number, canvasHeight: number) {
        // Move particle
        this.x += this.vx
        this.y += this.vy
        
        // Mouse interaction (repel)
        if (mouseX !== null && mouseY !== null) {
          const dx = this.x - mouseX
          const dy = this.y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 150) {
            const force = (150 - dist) / 150
            this.vx += (dx / dist) * force * 0.2
            this.vy += (dy / dist) * force * 0.2
          }
        }
        
        // Damping
        this.vx *= 0.99
        this.vy *= 0.99
        
        // Boundaries (wrap around)
        if (this.x < 0) this.x = canvasWidth
        if (this.x > canvasWidth) this.x = 0
        if (this.y < 0) this.y = canvasHeight
        if (this.y > canvasHeight) this.y = 0
      }
      
      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
        ctx.fill()
      }
    }
    
    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }
    
    // Mouse tracking
    let mouseX: number | null = null
    let mouseY: number | null = null
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Animation loop
    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        p.update(mouseX, mouseY, canvas.width, canvas.height)
        p.draw()
      })
      
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 240, 255, ${(100 - dist) / 100 * 0.2})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  )
}
