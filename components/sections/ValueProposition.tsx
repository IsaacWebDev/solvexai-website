'use client'
import { Card } from '../Card'

const benefits = [
  {
    title: 'Save 20+ Hours Weekly',
    description: 'Automate repetitive tasks and reclaim your time for strategic growth.',
    icon: '⏰'
  },
  {
    title: '24/7 AI Automation',
    description: 'Your AI works around the clock, even when you\'re sleeping.',
    icon: '🤖'
  },
  {
    title: 'Scale Without Hiring',
    description: 'Grow your business without expanding headcount or overhead.',
    icon: '📈'
  }
]

export function ValueProposition() {
  return (
    <section id="value-proposition" className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Why Choose SolveXAI?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} delay={index * 0.2}>
              <div className="text-6xl mb-6">{benefit.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-white/70 text-lg">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
