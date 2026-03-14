'use client';

import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';

const useCases = [
  {
    industry: "E-Commerce",
    icon: "🛒",
    title: "Order Processing",
    description: "Automate order confirmations, inventory updates, and shipping notifications.",
    savings: "15+ hours/week"
  },
  {
    industry: "Healthcare",
    icon: "🏥",
    title: "Appointment Scheduling",
    description: "AI handles bookings, reminders, and rescheduling automatically.",
    savings: "20+ hours/week"
  },
  {
    industry: "Real Estate",
    icon: "🏠",
    title: "Lead Qualification",
    description: "Screen leads, schedule viewings, and send property details instantly.",
    savings: "12+ hours/week"
  },
  {
    industry: "Legal",
    icon: "⚖️",
    title: "Document Processing",
    description: "Extract data from contracts, generate summaries, organize files.",
    savings: "18+ hours/week"
  },
  {
    industry: "Marketing",
    icon: "📢",
    title: "Content Distribution",
    description: "Schedule posts, respond to comments, analyze engagement automatically.",
    savings: "10+ hours/week"
  },
  {
    industry: "Finance",
    icon: "💼",
    title: "Invoice Management",
    description: "Generate, send, and track invoices. Send payment reminders automatically.",
    savings: "8+ hours/week"
  },
  {
    industry: "HR",
    icon: "👥",
    title: "Candidate Screening",
    description: "Review resumes, schedule interviews, send follow-ups automatically.",
    savings: "16+ hours/week"
  },
  {
    industry: "Customer Support",
    icon: "💬",
    title: "Ticket Resolution",
    description: "AI resolves common issues instantly. Route complex cases to humans.",
    savings: "25+ hours/week"
  }
];

export const UseCasesGrid = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Real-World Applications
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how businesses in your industry are using AI automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <LiquidGlassCard key={index} intensity="light" className="p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">{useCase.icon}</div>
              <div className="text-sm text-purple-400 mb-2 font-semibold">
                {useCase.industry}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {useCase.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {useCase.description}
              </p>
              <div className="text-green-400 font-bold text-sm">
                ⏱️ Saves {useCase.savings}
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
