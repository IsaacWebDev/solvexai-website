'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'
import dynamic from 'next/dynamic'
import * as LucideIcons from 'lucide-react'

const HolographicCard = dynamic(() => import('@/components/ui/HolographicCard'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export function ServicesReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    
    cards.forEach((card, i) => {
      // EXPLOSIVE reveal animation with BIDIRECTIONAL support (scroll up = reverse)
      gsap.fromTo(
        card,
        {
          scale: 0,
          rotation: -180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,  // Smooth scrubbing for bidirectional effect
            toggleActions: 'play reverse play reverse'  // Bidirectional animation
          },
          delay: i * 0.15
        }
      )
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  const services = [
    {
      icon: 'Palette',
      title: 'Pre-Built Templates',
      description: 'Launch-ready websites for every industry. Choose your design, add your content, go live in 48 hours.',
      price: 'From $53'
    },
    {
      icon: 'Zap',
      title: 'Custom Development',
      description: 'Unique features, custom integrations, built exactly how you want. Your vision, our expertise.',
      price: 'From $2,997'
    },
    {
      icon: 'Bot',
      title: 'AI Receptionist',
      description: '24/7 phone answering, appointment booking, customer support. Never miss a call again.',
      price: 'From $297/mo'
    },
    {
      icon: 'MessageSquare',
      title: 'AI Chatbots',
      description: '24/7 customer support that actually understands your customers. Smart, contextual, always available.',
      price: 'From $297/mo'
    },
    {
      icon: 'BarChart3',
      title: 'Analytics Dashboard',
      description: 'Real-time insights into your automation performance. Track ROI, monitor workflows, optimize results.',
      price: 'Included'
    },
    {
      icon: 'Link',
      title: 'API Integration',
      description: 'Connect your existing tools seamlessly. Zapier, Make, custom APIs - we integrate with everything.',
      price: 'From $297/mo'
    }
  ]
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-4"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100vw',
        maxWidth: 'none',
        margin: 0
      }}
    >
      <h2 
        className="font-bold text-center mb-20"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        }}
      >
        Three Ways We Transform Your Business
      </h2>
      
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          padding: '0 2rem'
        }}
      >
        {services.map((service, i) => {
          const IconComponent = (LucideIcons as any)[service.icon];
          return (
            <div key={i} ref={el => { cardsRef.current[i] = el }}>
              <LiquidGlassCard intensity="medium" className="p-12 cursor-pointer group h-full">
                <div className="mb-6">
                  {IconComponent && <IconComponent size={48} className="text-purple-400" />}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                <div 
                  className="text-xl font-bold mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {service.price}
                </div>
                <LiquidGlassButton variant="secondary" size="md">
                  Learn More →
                </LiquidGlassButton>
              </LiquidGlassCard>
            </div>
          );
        })}
      </div>
    </section>
  )
}
