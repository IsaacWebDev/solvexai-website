'use client'

import React from 'react'
import Link from 'next/link'

export function HowItWorks() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">
          From Idea to Launch in 3 Simple Steps
        </h2>
        
        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 transform -translate-y-1/2" />
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <Step
              number="1"
              title="Choose Your Path"
              items={[
                'Pick a template (fast)',
                'Request custom build (tailored)',
                'Add AI receptionist (automation)'
              ]}
            />
            
            <Step
              number="2"
              title="We Build & Integrate"
              items={[
                'Design customization',
                'Content migration',
                'System integration',
                'Quality assurance'
              ]}
            />
            
            <Step
              number="3"
              title="Launch & Automate"
              items={[
                'Domain setup',
                'Training & handoff',
                '30-day support',
                'Ongoing optimization'
              ]}
            />
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/contact">
            <button className="px-8 py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/50">
              Start Your Project →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

interface StepProps {
  number: string
  title: string
  items: string[]
}

function Step({ number, title, items }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Number Badge */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold mb-4 shadow-lg shadow-purple-500/50">
        {number}
      </div>
      
      {/* Title */}
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      
      {/* Items */}
      <ul className="space-y-3 text-left">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            <span className="text-purple-400 mt-1">├─</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
