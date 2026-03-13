'use client'

import React, { useRef } from 'react'
import Link from 'next/link'

export function TemplateShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const templates = [
    {
      name: 'Restaurant Delight',
      subtitle: 'Menu + Online Ordering',
      price: '$497',
      gradient: 'from-orange-600 to-red-600',
      image: '/templates/restaurant.jpg'
    },
    {
      name: 'Law Firm Authority',
      subtitle: 'Case Studies + Intake Forms',
      price: '$797',
      gradient: 'from-blue-800 to-blue-600',
      image: '/templates/lawfirm.jpg'
    },
    {
      name: 'Fitness Studio Energy',
      subtitle: 'Class Schedules + Bookings',
      price: '$597',
      gradient: 'from-yellow-600 to-orange-600',
      image: '/templates/fitness.jpg'
    },
    {
      name: 'Real Estate Luxury',
      subtitle: 'Property Listings + Tours',
      price: '$897',
      gradient: 'from-yellow-800 to-yellow-600',
      image: '/templates/realestate.jpg'
    },
    {
      name: 'E-Commerce Clean',
      subtitle: 'Product Pages + Checkout',
      price: '$997',
      gradient: 'from-purple-600 to-pink-600',
      image: '/templates/ecommerce.jpg'
    },
    {
      name: 'Medical Practice',
      subtitle: 'Appointments + Patient Portal',
      price: '$797',
      gradient: 'from-cyan-600 to-blue-600',
      image: '/templates/medical.jpg'
    },
    {
      name: 'Construction Pro',
      subtitle: 'Portfolio + Quote Requests',
      price: '$597',
      gradient: 'from-gray-700 to-yellow-700',
      image: '/templates/construction.jpg'
    },
    {
      name: 'Creative Agency',
      subtitle: 'Portfolio + Contact',
      price: '$697',
      gradient: 'from-pink-600 to-purple-600',
      image: '/templates/agency.jpg'
    }
  ]
  
  return (
    <section className="py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          Pre-Built Templates Ready to Launch
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16">
          Professional designs for every industry
        </p>
        
        {/* Horizontal Scrolling Gallery */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {templates.map((template, index) => (
            <TemplateCard key={index} {...template} />
          ))}
        </div>
        
        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/templates">
            <button className="px-8 py-4 rounded-lg font-semibold text-lg glass-card hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              View All Templates →
            </button>
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

interface TemplateCardProps {
  name: string
  subtitle: string
  price: string
  gradient: string
  image: string
}

function TemplateCard({ name, subtitle, price, gradient }: TemplateCardProps) {
  return (
    <div className="flex-shrink-0 w-80 snap-center group">
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
        {/* Screenshot Preview Placeholder */}
        <div 
          className={`h-64 bg-gradient-to-br ${gradient} relative overflow-hidden`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-6xl font-bold">{name.charAt(0)}</div>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-semibold">View Demo →</span>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-gray-400 text-sm mb-4">{subtitle}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold gradient-text">{price}</span>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              View Demo →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
