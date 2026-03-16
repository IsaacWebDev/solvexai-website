'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { GuaranteeBadge } from '@/components/GuaranteeBadge'
import { Shield } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

export function FinalCTAParallax() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <section 
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100vh',
        width: '100vw',
        maxWidth: 'none',
        margin: 0,
        padding: '4rem 2rem'
      }}
    >
      {/* Simple gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
        }}
      />
      
      {/* Parallax Background Layer */}
      <div
        ref={bgRef}
        className="absolute pointer-events-none"
        style={{
          inset: '-20%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Content */}
      <div 
        className="relative z-10 text-center"
        style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <h2 
          className="font-bold mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            lineHeight: 1.1
          }}
        >
          Ready to Automate Your Business?
        </h2>
        
        <p 
          className="text-gray-300 mb-12"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          }}
        >
          Join 127+ businesses saving 20+ hours weekly
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center flex-wrap"
        >
          <Link href="/templates">
            <button 
              className="group relative overflow-hidden rounded-full transition-all duration-500 transform hover:scale-105"
              style={{
                padding: '1.5rem 3rem',
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 20px 60px rgba(139, 92, 246, 0.4)',
                minWidth: '250px'
              }}
            >
              <span className="relative z-10">See Our Templates →</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, #9F7AEA, #60A5FA)',
                }}
              />
            </button>
          </Link>
          
          <Link href="/contact">
            <button 
              className="rounded-full transition-all duration-300 transform hover:scale-105"
              style={{
                padding: '1.5rem 3rem',
                fontSize: '1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                cursor: 'pointer',
                minWidth: '250px'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(139, 92, 246, 0.5)',
                  duration: 0.3
                })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  duration: 0.3
                })
              }}
            >
              Book Free Consultation
            </button>
          </Link>
        </div>
        
        {/* Guarantee Badge + Trust Indicators */}
        <div className="mt-12 flex justify-center">
          <GuaranteeBadge size="lg" variant="prominent">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <Shield className="w-5 h-5 text-green-400" />
              <span style={{ fontSize: '16px', fontWeight: '600' }}>All services backed by 14-day guarantee</span>
            </div>
            <span style={{ fontSize: '13px', color: '#d1d5db' }}>
              100% satisfaction or full refund. No questions asked.
            </span>
          </GuaranteeBadge>
        </div>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Setup in 48 hours</span>
          </div>
        </div>
      </div>
    </section>
  )
}
