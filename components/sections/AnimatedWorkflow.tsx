'use client'

import { useEffect, useRef, useState } from 'react'
import { Upload, Brain, Sparkles, Download, ArrowRight } from 'lucide-react'
import { ClayCard } from '@/components/ui/ClayCard'

const steps = [
  {
    icon: Upload,
    title: 'Upload Problem',
    description: 'Drag & drop your files or paste your challenge',
    color: 'from-blue-500 to-cyan-500',
    delay: 0,
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Advanced ML algorithms process your data',
    color: 'from-purple-500 to-violet-500',
    delay: 200,
  },
  {
    icon: Sparkles,
    title: 'Solution Generation',
    description: 'Multiple optimized solutions created instantly',
    color: 'from-pink-500 to-rose-500',
    delay: 400,
  },
  {
    icon: Download,
    title: 'Download Results',
    description: 'Export in your preferred format with full documentation',
    color: 'from-green-500 to-emerald-500',
    delay: 600,
  },
]

export function AnimatedWorkflow() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From problem to solution in 4 simple steps. No complexity, no learning curve.
          </p>
        </div>

        {/* Workflow Steps - Desktop Horizontal */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isLast = index === steps.length - 1

              return (
                <div key={index} className="flex-1 relative">
                  {/* Step Card */}
                  <div
                    className={`transition-all duration-700 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${step.delay}ms` }}
                  >
                    <ClayCard elevation="md" variant="soft" className="p-6 mx-2">
                      {/* Icon */}
                      <div className="relative w-16 h-16 mx-auto mb-4">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-50`}
                        />
                        <div
                          className={`relative w-full h-full bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Step Number */}
                      <div className="text-center mb-2">
                        <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300">
                          Step {index + 1}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        {step.description}
                      </p>
                    </ClayCard>
                  </div>

                  {/* Animated Arrow */}
                  {!isLast && (
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 -right-4 z-10 transition-all duration-700 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}
                      style={{ transitionDelay: `${step.delay + 300}ms` }}
                    >
                      <div className="relative">
                        {/* Pulsing glow */}
                        <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-50 animate-pulse" />
                        <div className="relative bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                          <ArrowRight className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Workflow Steps - Mobile Vertical */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === steps.length - 1

            return (
              <div key={index} className="relative">
                <div
                  className={`transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${step.delay}ms` }}
                >
                  <ClayCard elevation="md" variant="soft" className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="relative w-14 h-14 flex-shrink-0">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-50`}
                        />
                        <div
                          className={`relative w-full h-full bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-2">
                          <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-bold text-gray-700 dark:text-gray-300">
                            Step {index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </ClayCard>
                </div>

                {/* Vertical Arrow */}
                {!isLast && (
                  <div
                    className={`flex justify-center my-4 transition-all duration-700 ${
                      isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: `${step.delay + 300}ms` }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-50 animate-pulse" />
                      <div className="relative bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg rotate-90">
                        <ArrowRight className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AnimatedWorkflow
