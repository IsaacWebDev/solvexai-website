'use client';

import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';

const benefits = [
  {
    icon: "⚡",
    metric: "10x",
    title: "Faster Execution",
    description: "Complete tasks in minutes that used to take hours. AI works 24/7 at lightning speed."
  },
  {
    icon: "💰",
    metric: "70%",
    title: "Cost Reduction",
    description: "Save on labor costs while increasing output. AI doesn't sleep, take breaks, or call in sick."
  },
  {
    icon: "🎯",
    metric: "99.9%",
    title: "Accuracy Rate",
    description: "Eliminate human error. AI follows instructions perfectly every single time."
  },
  {
    icon: "🚀",
    metric: "24/7",
    title: "Always Available",
    description: "Your AI workforce never stops. Serve customers and complete tasks around the clock."
  },
  {
    icon: "📈",
    metric: "5x",
    title: "Scalability",
    description: "Handle 5x more work without hiring. Scale instantly without training costs."
  },
  {
    icon: "🔒",
    metric: "100%",
    title: "Data Security",
    description: "Enterprise-grade encryption. Your business data stays private and secure."
  }
];

export const BenefitsGrid = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Why Choose AI Automation?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real results that transform your business from day one
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <LiquidGlassCard key={index} intensity="medium" className="p-8">
              <div className="text-6xl mb-4">{benefit.icon}</div>
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {benefit.metric}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {benefit.description}
              </p>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
