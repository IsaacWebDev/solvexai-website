'use client'

import { Navigation } from '@/components/Navigation'
import { InteractiveParticles } from '@/components/InteractiveParticles'
import { Card } from '@/components/Card'
import { motion } from 'framer-motion'

const stats = [
  { value: '20+', label: 'Hours Saved Weekly', suffix: '' },
  { value: '100', label: 'Websites Delivered', suffix: '+' },
  { value: '24/7', label: 'AI Uptime', suffix: '' },
  { value: '99.9', label: 'Reliability', suffix: '%' }
]

const values = [
  {
    title: 'Innovation First',
    description: 'We leverage cutting-edge AI to solve real business problems.',
    icon: '💡'
  },
  {
    title: 'Client Success',
    description: 'Your growth is our mission. We measure success by your results.',
    icon: '🎯'
  },
  {
    title: 'Quality & Speed',
    description: 'Premium solutions delivered fast without compromising excellence.',
    icon: '⚡'
  }
]

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <InteractiveParticles />
      
      <main className="relative z-10 min-h-screen bg-black px-4 py-32">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Building the Future of <br />
              <span className="gradient-text">AI Automation</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              SolveXAI empowers businesses to automate repetitive tasks and reclaim their time. 
              We build AI solutions that work 24/7, so you can focus on what matters most: growth.
            </p>
          </motion.div>
          
          {/* Mission */}
          <section className="mb-32">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Our Mission
            </h2>
            <Card className="max-w-4xl mx-auto">
              <p className="text-xl text-white/80 leading-relaxed">
                Our mission is simple: <strong className="text-white">automate the mundane, amplify the meaningful</strong>. 
                We believe every business deserves access to enterprise-grade AI automation, 
                regardless of size or budget. By combining cutting-edge technology with 
                thoughtful design, we help you save 20+ hours every week and scale without limits.
              </p>
            </Card>
          </section>
          
          {/* Stats */}
          <section className="mb-32">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              By the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-5xl md:text-6xl font-bold gradient-text mb-3">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-white/70 text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Values */}
          <section>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} delay={index * 0.2}>
                  <div className="text-6xl mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-white/70 text-lg">{value.description}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
