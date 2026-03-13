'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import DNAHelix from '@/components/DNAHelix';
import ParticleField from '@/components/ParticleField';
import MagneticButton from '@/components/MagneticButton';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollControlled3DObject from '@/components/ScrollControlled3DObject';
import ServiceCard from '@/components/ServiceCard';
import NetworkVisualization from '@/components/NetworkVisualization';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicHome() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scene2Progress, setScene2Progress] = useState(0);
  const [scene3Progress, setScene3Progress] = useState(0);
  const [scene4Progress, setScene4Progress] = useState(0);
  
  useEffect(() => {
    // Master scroll timeline
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    const handleScroll = () => {
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
      
      // Calculate per-scene progress
      // Scene 2: 20-40%
      if (progress >= 0.2 && progress <= 0.4) {
        setScene2Progress((progress - 0.2) / 0.2);
      }
      
      // Scene 3: 40-60%
      if (progress >= 0.4 && progress <= 0.6) {
        setScene3Progress((progress - 0.4) / 0.2);
      }
      
      // Scene 4: 60-80%
      if (progress >= 0.6 && progress <= 0.8) {
        setScene4Progress((progress - 0.6) / 0.2);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Scene 1: Hero fade out
    gsap.to('.scene-hero-content', {
      scrollTrigger: {
        trigger: '.scene-hero',
        start: 'top top',
        end: '100% top',
        scrub: 1,
      },
      opacity: 0,
      y: -100,
      ease: 'power2.in',
    });
    
    // Scene 2: 3D World fade in/out
    gsap.fromTo('.scene-3d-world',
      { opacity: 0, scale: 0.9 },
      {
        scrollTrigger: {
          trigger: '.scene-3d-world',
          start: 'top 100%',
          end: 'top 50%',
          scrub: 1,
        },
        opacity: 1,
        scale: 1,
      }
    );
    
    gsap.to('.scene-3d-world', {
      scrollTrigger: {
        trigger: '.scene-3d-world',
        start: '50% top',
        end: '100% top',
        scrub: 1,
      },
      opacity: 0,
      scale: 0.9,
    });
    
    // Scene 3: Features assembly
    gsap.fromTo('.scene-features',
      { opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.scene-features',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        opacity: 1,
      }
    );
    
    // Scene 4: Network visualization
    gsap.fromTo('.scene-network',
      { opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.scene-network',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        opacity: 1,
      }
    );
    
    // Scene 5: CTA
    gsap.fromTo('.scene-cta',
      { opacity: 0, scale: 0.9 },
      {
        scrollTrigger: {
          trigger: '.scene-cta',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        opacity: 1,
        scale: 1,
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="relative bg-[#0a0a0a]">
      {/* SCENE 1: Hero Environment */}
      <section className="scene scene-hero relative min-h-screen flex items-center justify-center overflow-hidden">
        <DNAHelix speed={1} opacity={1} />
        <ParticleField count={200} />
        
        <div className="scene-hero-content relative z-10 container-custom py-20">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
              We save businesses{' '}
              <span className="relative inline-block">
                <span className="gradient-text-animated glow-text">20+ hours/week</span>
                <span className="absolute inset-0 blur-xl bg-gradient-to-r from-[#00F0FF] to-[#0088FF] opacity-50 animate-pulse" />
              </span>{' '}
              <span className="text-white">with AI</span>
            </h1>
            
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-white/70 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Transform your website into a 24/7 sales machine
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <MagneticButton variant="primary" href="#services">
                Explore Templates
              </MagneticButton>
              <MagneticButton variant="secondary" href="#contact">
                Book Consultation
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
        
        <ScrollIndicator />
      </section>
      
      {/* SCENE 2: Interactive 3D Object World */}
      <section className="scene scene-3d-world relative min-h-screen flex items-center justify-center">
        <ScrollControlled3DObject scrollProgress={scene2Progress} />
        
        <div className="relative z-10 container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              className="glass-card premium-blur p-8 text-center"
              style={{
                opacity: scene2Progress > 0.25 ? 1 : 0,
                transform: `translateX(${scene2Progress > 0.25 ? 0 : -100}px)`,
                transition: 'all 0.6s ease-out',
              }}
            >
              <h3 className="text-2xl font-bold gradient-text-animated mb-4">AI Automation</h3>
              <p className="text-white/70">Intelligent systems that work 24/7</p>
            </motion.div>
            
            <motion.div
              className="glass-card premium-blur p-8 text-center"
              style={{
                opacity: scene2Progress > 0.5 ? 1 : 0,
                transform: `translateX(${scene2Progress > 0.5 ? 0 : 100}px)`,
                transition: 'all 0.6s ease-out',
              }}
            >
              <h3 className="text-2xl font-bold gradient-text-animated mb-4">Web Development</h3>
              <p className="text-white/70">Custom solutions built for scale</p>
            </motion.div>
            
            <motion.div
              className="glass-card premium-blur p-8 text-center"
              style={{
                opacity: scene2Progress > 0.75 ? 1 : 0,
                transform: `translateX(${scene2Progress > 0.75 ? 0 : -100}px)`,
                transition: 'all 0.6s ease-out',
              }}
            >
              <h3 className="text-2xl font-bold gradient-text-animated mb-4">24/7 Support</h3>
              <p className="text-white/70">AI receptionist never sleeps</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* SCENE 3: Feature Reveal (Cards Assembling) */}
      <section className="scene scene-features relative min-h-screen flex items-center justify-center py-32">
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20 gradient-text-animated">
            Our Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <motion.div
              style={{
                opacity: scene3Progress > 0 ? 1 : 0,
                transform: `
                  translateY(${scene3Progress > 0 ? 0 : 100}px)
                  scale(${scene3Progress > 0.33 ? 1 : 0.8})
                `,
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <ServiceCard
                icon="🎨"
                title="Website Templates"
                description="Industry-specific sites in 48 hours"
                price="From $297"
                features={[
                  'Restaurant, Law, Fitness, Real Estate',
                  'Fully responsive & SEO optimized',
                  'Easy customization'
                ]}
                delay={0}
              />
            </motion.div>
            
            <motion.div
              style={{
                opacity: scene3Progress > 0.33 ? 1 : 0,
                transform: `
                  translateY(${scene3Progress > 0.33 ? 0 : 100}px)
                  scale(${scene3Progress > 0.66 ? 1 : 0.8})
                `,
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <ServiceCard
                icon="⚡"
                title="Custom Development"
                description="Tailored solutions for scale"
                price="From $1,997"
                features={[
                  'Bespoke design & architecture',
                  'Advanced integrations',
                  'Dedicated support'
                ]}
                featured={true}
                delay={0}
              />
            </motion.div>
            
            <motion.div
              style={{
                opacity: scene3Progress > 0.66 ? 1 : 0,
                transform: `
                  translateY(${scene3Progress > 0.66 ? 0 : 100}px)
                  scale(${scene3Progress > 1 ? 1 : 0.8})
                `,
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <ServiceCard
                icon="🤖"
                title="AI Receptionist"
                description="24/7 intelligent support"
                price="From $1,997"
                features={[
                  'Natural voice (ElevenLabs)',
                  'Smart call routing',
                  'CRM integration'
                ]}
                delay={0}
              />
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-0 circuit-bg opacity-5" />
      </section>
      
      {/* SCENE 4: Dynamic Grid / Network */}
      <section className="scene scene-network relative min-h-screen flex flex-col items-center justify-center py-32">
        <div className="container-custom relative z-10 w-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 gradient-text-animated">
            The AI Ecosystem
          </h2>
          
          <div className="relative w-full h-[600px] mb-12">
            <NetworkVisualization
              nodeCount={100}
              connectionDistance={100}
              scrollProgress={scene4Progress}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="text-center"
              style={{
                opacity: scene4Progress > 0.25 ? 1 : 0,
                transform: `scale(${scene4Progress > 0.25 ? 1 : 0.8})`,
                transition: 'all 0.6s ease-out',
              }}
            >
              <div className="text-6xl font-bold gradient-text-animated mb-2">20+</div>
              <div className="text-white/70 text-lg">Hours Saved Weekly</div>
            </motion.div>
            
            <motion.div
              className="text-center"
              style={{
                opacity: scene4Progress > 0.5 ? 1 : 0,
                transform: `scale(${scene4Progress > 0.5 ? 1 : 0.8})`,
                transition: 'all 0.6s ease-out',
              }}
            >
              <div className="text-6xl font-bold gradient-text-animated mb-2">100+</div>
              <div className="text-white/70 text-lg">Websites Built</div>
            </motion.div>
            
            <motion.div
              className="text-center"
              style={{
                opacity: scene4Progress > 0.75 ? 1 : 0,
                transform: `scale(${scene4Progress > 0.75 ? 1 : 0.8})`,
                transition: 'all 0.6s ease-out',
              }}
            >
              <div className="text-6xl font-bold gradient-text-animated mb-2">24/7</div>
              <div className="text-white/70 text-lg">AI Availability</div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* SCENE 5: Call to Action (Cinematic Close) */}
      <section className="scene scene-cta relative min-h-screen flex items-center justify-center overflow-hidden">
        <DNAHelix speed={0.5} opacity={0.3} />
        
        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              Ready to transform
              <br />
              <span className="gradient-text-animated">your business?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
              Join businesses saving 20+ hours weekly with AI automation
            </p>
            
            <MagneticButton
              variant="primary"
              href="/contact"
              className="text-2xl px-12 py-6 relative group"
            >
              <span className="relative z-10">Start Your Journey</span>
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#00F0FF] to-[#0088FF] opacity-50 group-hover:opacity-75 transition-opacity" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
