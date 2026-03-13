'use client'

import React, { useState, useEffect } from 'react'

export function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const testimonials = [
    {
      quote: "Cut my admin time by 80%",
      author: "Restaurant Owner",
      rating: 5
    },
    {
      quote: "AI receptionist books 15 calls/day while I focus on patients",
      author: "Dentist",
      rating: 5
    },
    {
      quote: "Website paid for itself in 2 weeks",
      author: "Gym Owner",
      rating: 5
    }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [testimonials.length])
  
  return (
    <section className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          Businesses Saving 20+ Hours Weekly
        </h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 mt-12">
          <StatCard value="127" label="Websites Launched" />
          <StatCard value="$2M+" label="Revenue Generated" />
          <StatCard value="4.9★" label="Average Rating" />
          <StatCard value="24/7" label="Uptime" />
        </div>
        
        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-12 text-center min-h-64 flex flex-col justify-center">
            <div className="mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-light mb-6 italic">
              "{testimonials[currentTestimonial].quote}"
            </blockquote>
            
            <cite className="text-gray-400 not-italic">
              — {testimonials[currentTestimonial].author}
            </cite>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-purple-600 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Case Studies CTA */}
        <div className="text-center mt-12">
          <button className="text-gray-400 hover:text-white transition-colors">
            Read Full Case Studies →
          </button>
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        {value}
      </div>
      <div className="text-sm text-gray-400">
        {label}
      </div>
    </div>
  )
}
