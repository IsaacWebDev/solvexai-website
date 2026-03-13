'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

const DNABackground = dynamic(() => import('@/components/3d/DNABackground'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export function StatsCountUp() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const stats = [
    { value: 127, suffix: '+', label: 'Businesses Automated' },
    { value: 20, suffix: '+', label: 'Hours Saved Weekly' },
    { value: 10, suffix: 'K+', label: 'Revenue Generated' },
    { value: 24, suffix: '/7', label: 'Always Working' }
  ]
  
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-number')
    
    counters.forEach((counter) => {
      const element = counter as HTMLElement
      const targetValue = parseInt(element.dataset.value || '0', 10)
      const suffix = element.dataset.suffix || ''
      
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 80%',
        onEnter: () => {
          if (!hasAnimated) {
            gsap.fromTo(
              element,
              { innerText: 0 },
              {
                innerText: targetValue,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function() {
                  const currentValue = Math.ceil(parseFloat(this.targets()[0].innerText))
                  element.innerText = currentValue + suffix
                }
              }
            )
            setHasAnimated(true)
          }
        }
      })
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [hasAnimated])
  
  return (
    <section 
      ref={sectionRef}
      className="relative flex items-center justify-center"
      style={{
        minHeight: '100vh',
        width: '100vw',
        maxWidth: 'none',
        margin: 0,
        padding: '4rem 2rem'
      }}
    >
      {/* DNA Helix Background - Ultra-realistic, scroll-controlled */}
      <DNABackground />
      
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        }}
      />
      
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '4rem',
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="group"
            style={{
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
              })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
              })
            }}
          >
            <div 
              className="stat-number font-bold mb-4"
              data-value={stat.value}
              data-suffix={stat.suffix}
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              0{stat.suffix}
            </div>
            <div 
              className="text-gray-400"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
