'use client';

import Image from 'next/image';
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';

const templates = [
  {
    name: "Restaurant Delight",
    subtitle: "Menu + Online Ordering",
    price: "$497",
    image: "/template-mockups/restaurant-delight.webp",
    features: ["Online ordering", "Reservations", "Menu management"]
  },
  {
    name: "Law Firm Authority",
    subtitle: "Case Studies + Intake",
    price: "$697",
    image: "/template-mockups/law-firm-authority.webp",
    features: ["Case studies", "Client intake", "Consultation booking"]
  },
  {
    name: "Fitness Studio Energy",
    subtitle: "Classes + Bookings",
    price: "$597",
    image: "/template-mockups/fitness-studio-energy.webp",
    features: ["Class schedules", "Online booking", "Memberships"]
  },
  {
    name: "Real Estate Luxury",
    subtitle: "Listings + Lead Gen",
    price: "$897",
    image: "/template-mockups/real-estate-luxury.jpg",
    features: ["Property listings", "Lead capture", "Virtual tours"]
  },
  {
    name: "E-Commerce Clean",
    subtitle: "Store + Checkout",
    price: "$997",
    image: "/template-mockups/e-commerce-clean.jpg",
    features: ["Product catalog", "Shopping cart", "Secure checkout"]
  },
  {
    name: "Medical Practice",
    subtitle: "Appointments + Records",
    price: "$797",
    image: "/template-mockups/medical-practice.jpg",
    features: ["Appointment booking", "Patient portal", "HIPAA compliant"]
  }
];

export const TemplateShowcase = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Centered */}
        <div className="text-center mb-24">
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
        
        {/* Template Grid - Centered */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {templates.map((template, i) => (
            <LiquidGlassCard
              key={i}
              intensity="medium"
              className="group h-full flex flex-col border border-gray-500/30 hover:border-purple-400/50 transition-all overflow-hidden"
            >
              {/* Image Preview */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    View Details →
                  </span>
                </div>
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
                
                {/* Features */}
                <ul className="space-y-2 mb-6 text-left flex-1">
                  {template.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-green-400">✓</span>
                      {feature}
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
