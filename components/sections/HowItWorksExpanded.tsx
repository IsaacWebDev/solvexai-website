'use client'

import React from 'react'
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard'
import { Phone, Target, Wrench, FlaskConical, Rocket, TrendingUp, LucideIcon } from 'lucide-react'

export function HowItWorksExpanded() {
  const steps: Array<{
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
  }> = [
    {
      number: "01",
      title: "Discovery Call",
      description: "We learn about your business, goals, and automation needs in a 30-minute consultation.",
      icon: Phone
    },
    {
      number: "02",
      title: "Custom Strategy",
      description: "We design your perfect automation blueprint with timeline, costs, and expected ROI.",
      icon: Target
    },
    {
      number: "03",
      title: "Build & Integrate",
      description: "Our team builds your solution, integrates with your systems, and trains the AI.",
      icon: Wrench
    },
    {
      number: "04",
      title: "Quality Testing",
      description: "We run comprehensive tests and fine-tune every automation for peak performance.",
      icon: FlaskConical
    },
    {
      number: "05",
      title: "Launch & Train",
      description: "Go live with full training for your team. We make sure everyone knows the system.",
      icon: Rocket
    },
    {
      number: "06",
      title: "Scale & Support",
      description: "As your business grows, we scale your automations and provide ongoing support.",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From discovery to deployment in 6 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <LiquidGlassCard key={index} intensity="medium" className="p-8 relative">
                <div className="absolute top-4 right-4 text-6xl font-bold text-purple-500/20">
                  {step.number}
                </div>
                <div className="mb-4">
                  <IconComponent size={48} className="text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </LiquidGlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
