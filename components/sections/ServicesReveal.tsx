'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ServicesReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.1
        }
      )
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  const services = [
    {
      icon: '🎨',
      title: 'Pre-Built Templates',
      description: 'Launch-ready websites for every industry. Choose your design, add your content, go live in 48 hours.',
      price: 'From $497'
    },
    {
      icon: '⚡',
      title: 'Custom Development',
      description: 'Unique features, custom integrations, built exactly how you want. Your vision, our expertise.',
      price: 'From $2,997'
    },
    {
      icon: '🤖',
      title: 'AI Receptionist',
      description: '24/7 phone answering, appointment booking, customer support. Never miss a call again.',
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
        {services.map((service, i) => (
          <div
            key={i}
            ref={el => { cardsRef.current[i] = el }}
            className="group cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '3rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -10,
                background: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'rgba(139, 92, 246, 0.3)',
                boxShadow: '0 30px 80px rgba(139, 92, 246, 0.2)',
                duration: 0.3
              })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 0 rgba(139, 92, 246, 0)',
                duration: 0.3
              })
            }}
          >
            <div className="text-6xl mb-6">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
            <div 
              className="text-xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {service.price}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
