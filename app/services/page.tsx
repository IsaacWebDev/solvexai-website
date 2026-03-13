'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import ServiceCard from '@/components/ServiceCard';

export default function ServicesPage() {
  return (
    <div className="relative py-20">
      {/* Hero Section */}
      <section className="px-4 py-24">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Comprehensive AI automation and web development solutions tailored to your business needs
          </motion.p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="px-4 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            <ServiceCard
              icon="🎨"
              title="Website Templates"
              description="Pre-built, customizable sites for your industry"
              price="Starting at $297"
              features={[
                '5 industry options',
                'Fully responsive',
                'SEO optimized',
                '24/7 support'
              ]}
              delay={0}
            />

            <ServiceCard
              icon="⚡"
              title="Custom Development"
              description="Tailored websites built for your unique needs"
              price="Starting at $1,997"
              features={[
                'Bespoke design',
                'Advanced features',
                'Ongoing support',
                'Performance optimized'
              ]}
              featured={true}
              delay={0.1}
            />

            <ServiceCard
              icon="🤖"
              title="AI Receptionist"
              description="24/7 intelligent customer support & booking"
              price="Starting at $1,997"
              features={[
                'ElevenLabs voice',
                'Smart routing',
                'Never miss a call',
                'CRM integration'
              ]}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Template Details Section */}
      <section className="px-4 py-20 bg-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Website Templates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              {[
                { name: 'Restaurant', icon: '🍽️' },
                { name: 'Law Firm', icon: '⚖️' },
                { name: 'Fitness', icon: '💪' },
                { name: 'Real Estate', icon: '🏠' },
                { name: 'E-commerce', icon: '🛍️' }
              ].map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="text-5xl mb-4">{industry.icon}</div>
                  <h3 className="font-semibold text-lg">{industry.name}</h3>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">Pricing Tiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <h4 className="font-bold text-xl mb-2 text-[#00F0FF]">Template Only</h4>
                  <p className="text-3xl font-bold mb-4">$297</p>
                  <ul className="text-sm text-white/70 space-y-2">
                    <li>✓ Full template access</li>
                    <li>✓ Customization guide</li>
                    <li>✓ Basic support</li>
                  </ul>
                </div>
                <div className="text-center p-4 border-2 border-[#00F0FF]/30 rounded-lg">
                  <h4 className="font-bold text-xl mb-2 text-[#00F0FF]">+ Setup</h4>
                  <p className="text-3xl font-bold mb-4">$697</p>
                  <ul className="text-sm text-white/70 space-y-2">
                    <li>✓ Everything in Template</li>
                    <li>✓ Professional setup</li>
                    <li>✓ Custom branding</li>
                    <li>✓ Priority support</li>
                  </ul>
                </div>
                <div className="text-center p-4">
                  <h4 className="font-bold text-xl mb-2 text-[#00F0FF]">+ SEO</h4>
                  <p className="text-3xl font-bold mb-4">$997</p>
                  <ul className="text-sm text-white/70 space-y-2">
                    <li>✓ Everything in Setup</li>
                    <li>✓ SEO optimization</li>
                    <li>✓ Analytics setup</li>
                    <li>✓ 3-month support</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Development Section */}
      <section className="px-4 py-20">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Custom Development
            </h2>

            <div className="glass-card p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6">Our Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: '01', title: 'Discovery', desc: 'Understand your needs' },
                  { step: '02', title: 'Design', desc: 'Create mockups & wireframes' },
                  { step: '03', title: 'Build', desc: 'Develop your website' },
                  { step: '04', title: 'Launch', desc: 'Deploy & optimize' }
                ].map((phase, index) => (
                  <motion.div
                    key={phase.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold gradient-text mb-2">{phase.step}</div>
                    <h4 className="font-semibold text-lg mb-2">{phase.title}</h4>
                    <p className="text-sm text-white/60">{phase.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4">Portfolio Example</h3>
              <p className="text-white/70 mb-6">
                <strong className="text-[#00F0FF]">Leafway</strong> - Premium cannabis club website with custom booking system,
                member portal, and integrated payment processing. Built with Next.js and modern web technologies.
              </p>
              <div className="text-center">
                <Button variant="primary" href="/contact">
                  Request Custom Quote
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Receptionist Section */}
      <section className="px-4 py-20 bg-white/5">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              AI Receptionist
            </h2>

            <div className="glass-card p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00F0FF] flex items-center justify-center text-2xl">
                    📞
                  </div>
                  <h4 className="font-semibold mb-2">Customer Calls</h4>
                  <p className="text-sm text-white/60">AI answers instantly, 24/7</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00F0FF] flex items-center justify-center text-2xl">
                    🤖
                  </div>
                  <h4 className="font-semibold mb-2">Smart Routing</h4>
                  <p className="text-sm text-white/60">Routes to right department</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00F0FF] flex items-center justify-center text-2xl">
                    ✅
                  </div>
                  <h4 className="font-semibold mb-2">Books Appointment</h4>
                  <p className="text-sm text-white/60">Syncs with your calendar</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6">ROI Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Without AI</h4>
                  <ul className="space-y-2 text-white/70">
                    <li>• 20 hours/week on calls</li>
                    <li>• $25/hour labor cost</li>
                    <li>• = $2,000/month</li>
                    <li>• Missed calls after hours</li>
                  </ul>
                </div>
                <div className="border-l-2 border-[#00F0FF]/30 pl-8">
                  <h4 className="font-semibold mb-4 text-[#00F0FF]">With AI</h4>
                  <ul className="space-y-2 text-white/70">
                    <li>• $1,997 one-time setup</li>
                    <li>• $297/month subscription</li>
                    <li>• = Save $1,703/month</li>
                    <li>• Never miss a call</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button variant="primary" size="large" href="/contact">
                Book AI Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
