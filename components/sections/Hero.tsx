'use client'
import { motion } from 'framer-motion'
import { SolveXAILogo } from '../SolveXAILogo'
import { Button } from '../Button'
import { ScrollIndicator } from '../ScrollIndicator'

export function Hero() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('value-proposition')
    servicesSection?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SolveXAILogo />
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mt-16 mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textShadow: '0 0 40px rgba(139, 92, 246, 0.5)'
          }}
        >
          Automate 20+ hours of work every week.
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Let AI handle the repetitive tasks while you focus on growth.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button onClick={scrollToServices} variant="primary">
            Explore Our Services
          </Button>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  )
}
