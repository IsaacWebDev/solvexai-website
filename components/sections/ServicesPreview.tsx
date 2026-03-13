'use client'
import { Card } from '../Card'
import { Button } from '../Button'
import Link from 'next/link'

const services = [
  {
    title: 'Website Templates',
    description: 'Professional, conversion-optimized templates ready to deploy.',
    price: '$297+',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading']
  },
  {
    title: 'Custom Development',
    description: 'Tailored web solutions built to your exact specifications.',
    price: '$1,997+',
    features: ['Custom Features', 'API Integration', 'Full Support']
  },
  {
    title: 'AI Receptionist',
    description: '24/7 automated customer service that never sleeps.',
    price: '$1,997+',
    features: ['24/7 Availability', 'Natural Conversation', 'CRM Integration']
  }
]

export function ServicesPreview() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Our Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} delay={index * 0.2}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  {service.price}
                </p>
                <p className="text-white/70 mb-6">{service.description}</p>
              </div>
              
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-white/80">
                    <svg className="w-5 h-5 mr-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/services">
            <Button variant="secondary">View All Services</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
