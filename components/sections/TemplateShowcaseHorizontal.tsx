'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'

export function TemplateShowcaseHorizontal() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const templates = [
    {
      name: 'Restaurant Delight',
      subtitle: 'Menu + Online Ordering',
      description: 'Beautiful menu displays, online ordering system, table reservations, and delivery integration.',
      price: '497',
      gradient: 'from-orange-600 to-red-600',
      image: '/template-previews/restaurant.jpg',
      features: ['Online Ordering', 'Reservations', 'Menu Management', 'Delivery Integration']
    },
    {
      name: 'Law Firm Authority',
      subtitle: 'Case Studies + Intake Forms',
      description: 'Professional presence with case studies, client intake forms, and consultation booking.',
      price: '797',
      gradient: 'from-blue-800 to-blue-600',
      features: ['Case Studies', 'Intake Forms', 'Consultation Booking', 'Attorney Profiles']
    },
    {
      name: 'Fitness Studio Energy',
      subtitle: 'Class Schedules + Bookings',
      description: 'Dynamic class schedules, membership management, and online booking system.',
      price: '597',
      gradient: 'from-yellow-600 to-orange-600',
      features: ['Class Schedules', 'Online Booking', 'Memberships', 'Trainer Profiles']
    },
    {
      name: 'E-Commerce Clean',
      subtitle: 'Product Pages + Checkout',
      description: 'Complete online store with product management, shopping cart, and secure checkout.',
      price: '997',
      gradient: 'from-purple-600 to-pink-600',
      features: ['Product Catalog', 'Shopping Cart', 'Secure Checkout', 'Inventory Management']
    }
  ]
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const container = containerRef.current
      const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth)
      const index = Math.round(scrollPercentage * (templates.length - 1))
      setActiveIndex(index)
    }
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [templates.length])
  
  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const targetScroll = (container.scrollWidth - container.clientWidth) * (index / (templates.length - 1))
    
    gsap.to(container, {
      scrollLeft: targetScroll,
      duration: 0.8,
      ease: 'power3.inOut'
    })
  }
  
  return (
    <section 
      className="relative overflow-hidden"
      style={{
        height: '100vh',
        width: '100vw',
        maxWidth: 'none',
        margin: 0,
        padding: 0
      }}
    >
      <div 
        ref={containerRef}
        className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {templates.map((template, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-center flex items-center justify-center"
            style={{
              width: '100vw',
              height: '100vh',
              padding: '4rem 2rem'
            }}
          >
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              style={{
                maxWidth: '1200px',
                width: '100%',
              }}
            >
              {/* Left: Screenshot Preview */}
              <div 
                className="relative group cursor-pointer overflow-hidden rounded-2xl order-2 md:order-1"
                style={{
                  aspectRatio: '16/10',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
                }}
              >
                {template.image ? (
                  <>
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <span className="text-white text-xl font-semibold">View Live Demo →</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${template.gradient} transition-transform duration-700 group-hover:scale-110`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white/20 text-9xl font-bold">{template.name.charAt(0)}</div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">View Live Demo →</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Right: Details */}
              <div className="text-left order-1 md:order-2">
                <div className="text-sm text-purple-400 font-semibold mb-2 uppercase tracking-wider">
                  {template.subtitle}
                </div>
                <h3 
                  className="font-bold mb-4"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                >
                  {template.name}
                </h3>
                <p 
                  className="text-gray-400 mb-6 leading-relaxed"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                >
                  {template.description}
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {template.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-6 mb-8">
                  <div 
                    className="font-bold"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                  >
                    ${template.price}
                  </div>
                  <div className="text-sm text-gray-500">One-time payment</div>
                </div>
                
                <Link href={`/templates/${template.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <button 
                    className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                      color: 'white',
                      boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    View Demo →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20"
      >
        {templates.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className="transition-all duration-300"
            style={{
              width: i === activeIndex ? '60px' : '40px',
              height: '4px',
              background: i === activeIndex ? '#8B5CF6' : 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label={`Go to template ${i + 1}`}
          />
        ))}
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
