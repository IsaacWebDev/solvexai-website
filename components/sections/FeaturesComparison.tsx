'use client';

import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';

const features = [
  { icon: "✅", title: "No-Code Setup", description: "Launch in days, not months" },
  { icon: "✅", title: "White-Label Option", description: "Brand it as your own" },
  { icon: "✅", title: "Unlimited Workflows", description: "No restrictions on automation" },
  { icon: "✅", title: "Priority Support", description: "Direct access to our team" },
  { icon: "✅", title: "Custom Training", description: "We train AI on your data" },
  { icon: "✅", title: "API Access", description: "Full programmatic control" },
  { icon: "✅", title: "Multi-User Accounts", description: "Collaborate with your team" },
  { icon: "✅", title: "Advanced Analytics", description: "Track every metric" },
  { icon: "✅", title: "SOC 2 Compliant", description: "Enterprise security" },
  { icon: "✅", title: "99.9% Uptime SLA", description: "Always available" },
  { icon: "✅", title: "Free Migrations", description: "We handle the switch" },
  { icon: "✅", title: "Money-Back Guarantee", description: "30-day full refund" }
];

export const FeaturesComparison = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Everything You Need, Included
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No hidden fees, no surprise charges. Just powerful automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <LiquidGlassCard key={index} intensity="light" className="p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{feature.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
