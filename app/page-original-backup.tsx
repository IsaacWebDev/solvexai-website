'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeuralNetwork from '@/components/NeuralNetwork';
import MagneticButton from '@/components/MagneticButton';
import ScrollIndicator from '@/components/ScrollIndicator';
import ServiceCard from '@/components/ServiceCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Scroll-triggered animations for services
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out',
      });
    });

    // Stats animation
    const stats = document.querySelectorAll('.stat-card');
    
    stats.forEach((stat, index) => {
      gsap.from(stat, {
        scrollTrigger: {
          trigger: '.social-proof-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.7)',
      });
    });
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js Neural Network Background */}
        <div className="absolute inset-0 opacity-30">
          <NeuralNetwork />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e1a]/50 to-[#0a0e1a]" />

        {/* Hero Content */}
        <div className="container-custom relative z-10 py-20">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Main Headline */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              We save businesses{' '}
              <span className="gradient-text-animated block mt-2">
                20+ hours/week
              </span>{' '}
              <span className="text-white">with AI</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transform your website into a 24/7 sales machine with intelligent automation
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <MagneticButton variant="primary" href="#services">
                View Templates
              </MagneticButton>
              <MagneticButton variant="secondary" href="#contact">
                Book Consultation
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent" />
      </section>

      {/* Services Section */}
      <section className="services-section py-32 px-4 relative" id="services">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-animated">
              SERVICES
            </h2>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto">
              Choose the solution that fits your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <ServiceCard
              icon="🎨"
              title="Website Templates"
              description="Industry-specific sites ready in 48 hours"
              price="Starting at $297"
              features={[
                'Restaurant, Law, Fitness, Real Estate, E-commerce',
                'Fully responsive & SEO optimized',
                'Easy customization system'
              ]}
              delay={0}
            />

            <ServiceCard
              icon="⚡"
              title="Custom Development"
              description="Tailored solutions for unique business needs"
              price="Starting at $1,997"
              features={[
                'Bespoke design & architecture',
                'Advanced integrations',
                'Dedicated support'
              ]}
              featured={true}
              delay={0.1}
            />

            <ServiceCard
              icon="🤖"
              title="AI Receptionist"
              description="Never miss a customer with 24/7 AI support"
              price="$1,997 setup + $297/mo"
              features={[
                'ElevenLabs natural voice',
                'Smart call routing',
                'CRM integration'
              ]}
              delay={0.2}
            />
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 circuit-bg opacity-5" />
      </section>

      {/* Social Proof Section */}
      <section className="social-proof-section py-32 px-4 relative">
        <div className="container-custom">
          <div className="glass-card premium-blur p-12 md:p-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
              <div className="stat-card">
                <div className="text-6xl md:text-7xl font-bold gradient-text-animated mb-4">
                  20+
                </div>
                <div className="text-white/70 text-lg md:text-xl font-medium">
                  Hours Saved Weekly
                </div>
              </div>

              <div className="stat-card">
                <div className="text-6xl md:text-7xl font-bold gradient-text-animated mb-4">
                  100+
                </div>
                <div className="text-white/70 text-lg md:text-xl font-medium">
                  Websites Built
                </div>
              </div>

              <div className="stat-card">
                <div className="text-6xl md:text-7xl font-bold gradient-text-animated mb-4">
                  24/7
                </div>
                <div className="text-white/70 text-lg md:text-xl font-medium">
                  AI Availability
                </div>
              </div>

              <div className="stat-card">
                <div className="text-6xl md:text-7xl font-bold gradient-text-animated mb-4">
                  99.9%
                </div>
                <div className="text-white/70 text-lg md:text-xl font-medium">
                  Uptime SLA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 px-4 relative" id="contact">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              Ready to transform <br />
              <span className="gradient-text-animated">your business?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
              Join hundreds of businesses already saving time and growing with AI automation
            </p>
            <MagneticButton variant="primary" href="/contact">
              Book Free Consultation
            </MagneticButton>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 circuit-bg opacity-10" />
      </section>
    </div>
  );
}
