'use client'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Choose Your Service',
    description: 'Select from our range of AI automation solutions.'
  },
  {
    number: '02',
    title: 'We Build & Integrate',
    description: 'Our team develops and seamlessly integrates the solution.'
  },
  {
    number: '03',
    title: 'Automate & Scale',
    description: 'Watch your productivity soar as AI handles the work.'
  }
]

export function HowItWorks() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-30" style={{ width: '80%', margin: '0 10%' }} />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative inline-flex items-center justify-center w-48 h-48 mb-8 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full opacity-20 blur-xl" />
                <div className="relative bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-full w-full h-full flex items-center justify-center">
                  <span className="text-6xl font-bold bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-white/70 text-lg max-w-sm mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
