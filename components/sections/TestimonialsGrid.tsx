'use client';

import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';
import { Briefcase, Stethoscope, Laptop, Home, DollarSign, MessageSquare, Star, LucideIcon } from 'lucide-react';

const testimonials: Array<{
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  icon: LucideIcon;
}> = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    company: "E-Commerce",
    quote: "SolveXAI saved us 40 hours a week. Our team can finally focus on growth instead of admin work.",
    rating: 5,
    icon: Briefcase
  },
  {
    name: "Michael Chen",
    role: "Operations Director",
    company: "HealthCare Plus",
    quote: "The AI receptionist handles 200+ calls daily. Our patients love the instant responses.",
    rating: 5,
    icon: Stethoscope
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    company: "Creative Agency",
    quote: "We automated our entire social media pipeline. 10x more content in half the time.",
    rating: 5,
    icon: Laptop
  },
  {
    name: "David Park",
    role: "Founder",
    company: "Real Estate Pro",
    quote: "Lead qualification is 100% automated. We close 3x more deals with the same team.",
    rating: 5,
    icon: Home
  },
  {
    name: "Lisa Thompson",
    role: "CFO",
    company: "Finance Solutions",
    quote: "Invoice processing went from 2 days to 2 minutes. The ROI was immediate.",
    rating: 5,
    icon: DollarSign
  },
  {
    name: "James Wilson",
    role: "Head of Support",
    company: "SaaS Company",
    quote: "Our AI handles 80% of tickets automatically. Support costs dropped 60%.",
    rating: 5,
    icon: MessageSquare
  }
];

export const TestimonialsGrid = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our clients say about the transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const IconComponent = testimonial.icon;
            return (
              <LiquidGlassCard key={index} intensity="medium" className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <IconComponent size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-purple-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed italic">
                  &quot;{testimonial.quote}&quot;
                </p>
              </LiquidGlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
