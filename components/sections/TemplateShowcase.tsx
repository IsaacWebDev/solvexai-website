'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';

const templates = [
  {
    name: "Real Estate Luxury",
    subtitle: "Listings + Lead Gen",
    price: "$897",
    image: "/template-mockups/real-estate-luxury.jpg",
    features: ["✓ Mobile responsive", "✓ 2-day delivery", "✓ Free support"],
    demoUrl: "https://real-estate-demo.vercel.app",
    isBestSeller: true
  },
  {
    name: "E-Commerce Clean",
    subtitle: "Store + Checkout",
    price: "$997",
    image: "/template-mockups/e-commerce-clean.jpg",
    features: ["✓ Mobile responsive", "✓ 2-day delivery", "✓ Free support"],
    demoUrl: "https://ecommerce-demo.vercel.app",
    isBestSeller: true
  },
  {
    name: "Medical Practice",
    subtitle: "Appointments + Records",
    price: "$797",
    image: "/template-mockups/medical-practice.jpg",
    features: ["✓ Mobile responsive", "✓ 2-day delivery", "✓ Free support"],
    demoUrl: "https://medical-demo.vercel.app",
    isBestSeller: true
  },
  {
    name: "Restaurant Delight",
    subtitle: "Menu + Online Ordering",
    price: "$497",
    image: "/template-mockups/restaurant-delight.jpg",
    features: ["✓ Mobile responsive", "✓ 3-day delivery", "✓ Free support"],
    demoUrl: "https://restaurant-demo.vercel.app"
  },
  {
    name: "Law Firm Authority",
    subtitle: "Case Studies + Intake",
    price: "$697",
    image: "/template-mockups/law-firm-authority.jpg",
    features: ["✓ Mobile responsive", "✓ 3-day delivery", "✓ Free support"],
    demoUrl: "https://lawfirm-demo.vercel.app"
  },
  {
    name: "Fitness Studio Energy",
    subtitle: "Classes + Bookings",
    price: "$597",
    image: "/template-mockups/fitness-studio-energy.jpg",
    features: ["✓ Mobile responsive", "✓ 3-day delivery", "✓ Free support"],
    demoUrl: "https://fitness-demo.vercel.app"
  },
  {
    name: "Construction Pro",
    subtitle: "Portfolio + Quotes",
    price: "$597",
    image: "/template-mockups/construction-pro.jpg",
    features: ["✓ Mobile responsive", "✓ 3-day delivery", "✓ Free support"],
    demoUrl: "https://construction-demo.vercel.app"
  },
  {
    name: "Creative Agency",
    subtitle: "Portfolio + Case Studies",
    price: "$697",
    image: "/template-mockups/creative-agency.jpg",
    features: ["✓ Mobile responsive", "✓ 3-day delivery", "✓ Free support"],
    demoUrl: "https://agency-demo.vercel.app"
  }
];

export const TemplateShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        
        {/* Header - Centered */}
        <div className="text-center mb-24 w-full">
          <div className="text-purple-400 text-sm uppercase tracking-wider mb-4">
            Ready-to-Deploy
          </div>
          <h2 className="text-6xl md:text-7xl font-light mb-6">
            Template Showcase
          </h2>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Industry-proven automation. Live in 48 hours.
          </p>
        </div>
        
        {/* Template Grid - Centered with Stagger Animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          
          {templates.map((template, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                transform: hoveredIndex === i ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredIndex === i 
                  ? '0 25px 50px -12px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.3)' 
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease-out'
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <LiquidGlassCard
                intensity="medium"
                className="group h-full flex flex-col border border-gray-500/30 hover:border-purple-400/50 transition-all overflow-hidden relative"
              >
                {/* Best Seller Badge */}
                {template.isBestSeller && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    🔥 Best Seller
                  </div>
                )}

                {/* Image Preview */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* View Demo Button - Appears on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/70 flex items-center justify-center"
                  >
                    <a
                      href={template.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform shadow-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Demo →
                    </a>
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="p-8 flex-1 flex flex-col text-center">
                  
                  {/* Name */}
                  <h3 className="text-2xl font-light mb-2">
                    {template.name}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-sm text-gray-400 mb-6">
                    {template.subtitle}
                  </p>
                  
                  {/* Feature Bullet Points */}
                  <ul className="space-y-2 mb-6 text-left flex-1">
                    {template.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-green-400">{feature.split(' ')[0]}</span>
                        <span>{feature.substring(2)}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Price */}
                  <div className="text-4xl font-light mb-6">
                    {template.price}
                  </div>
                  
                  {/* CTA */}
                  <button className="w-full py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform">
                    Buy Now
                  </button>
                </div>
                
              </LiquidGlassCard>
            </motion.div>
          ))}
          
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="px-12 py-5 bg-white/10 text-white rounded-full text-lg font-medium hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20">
            View All Templates →
          </button>
        </div>
        
      </div>
    </section>
  );
};
