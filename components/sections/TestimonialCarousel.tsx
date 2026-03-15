'use client'

import { useState, useEffect } from 'react'
import { ClayCard } from '@/components/ui/ClayCard'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechCorp Inc.',
    image: '/avatars/sarah.jpg', // Placeholder
    rating: 5,
    text: 'SolveXAI transformed how we handle complex problem-solving. The AI-powered insights saved us weeks of work.',
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateLabs',
    image: '/avatars/michael.jpg',
    rating: 5,
    text: 'Incredible tool! The automated workflow analysis helped us identify bottlenecks we didn\'t even know existed.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Data Scientist',
    company: 'Analytics Pro',
    image: '/avatars/emily.jpg',
    rating: 5,
    text: 'The most intuitive AI platform I\'ve used. Results in minutes, not days. Absolutely game-changing.',
  },
  {
    name: 'David Park',
    role: 'Founder',
    company: 'StartupX',
    image: '/avatars/david.jpg',
    rating: 5,
    text: 'SolveXAI gave us enterprise-level problem-solving on a startup budget. ROI was immediate.',
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const visibleTestimonials = [
    testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length],
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
  ]

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by Teams Worldwide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join 10,000+ professionals who trust SolveXAI
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 md:-translate-x-12 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 md:translate-x-12 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
            {visibleTestimonials.map((testimonial, idx) => (
              <ClayCard
                key={`${testimonial.name}-${idx}`}
                elevation={idx === 1 ? 'lg' : 'md'}
                variant="soft"
                className={`p-8 transition-all duration-500 ${
                  idx === 1
                    ? 'md:scale-110 md:z-10'
                    : 'md:scale-95 opacity-60 md:opacity-100'
                }`}
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </ClayCard>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx)
                  setIsAutoPlaying(false)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-purple-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialCarousel
