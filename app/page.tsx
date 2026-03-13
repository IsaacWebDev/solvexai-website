'use client'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-8">
          We save businesses{' '}
          <span className="text-cyan-400">20+ hours/week</span>
          {' '}with AI
        </h1>
        
        <p className="text-2xl text-gray-300 mb-12 text-center max-w-3xl">
          Transform your website into a 24/7 sales machine with intelligent automation
        </p>
        
        <div className="flex gap-6">
          <a
            href="#services"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg text-xl font-semibold hover:scale-105 transition"
          >
            View Templates
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-cyan-400 rounded-lg text-xl font-semibold hover:bg-cyan-400/10 transition"
          >
            Book Consultation
          </a>
        </div>
      </section>
      
      {/* SERVICES */}
      <section id="services" className="min-h-screen px-4 py-24">
        <h2 className="text-5xl font-bold text-center mb-16">Our Services</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ServiceCard
            title="Website Templates"
            description="Industry-specific sites in 48 hours"
            price="From $297"
            features={[
              'Restaurant, Law, Fitness, Real Estate',
              'Fully responsive & SEO optimized',
              'Easy customization'
            ]}
          />
          <ServiceCard
            title="Custom Development"
            description="Tailored solutions for scale"
            price="From $1,997"
            features={[
              'Bespoke design & architecture',
              'Advanced integrations',
              'Dedicated support'
            ]}
            featured
          />
          <ServiceCard
            title="AI Receptionist"
            description="24/7 intelligent support"
            price="From $1,997"
            features={[
              'Natural voice (ElevenLabs)',
              'Smart call routing',
              'CRM integration'
            ]}
          />
        </div>
      </section>
      
      {/* STATS */}
      <section className="min-h-screen px-4 py-24 flex items-center justify-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">Why Choose Us</h2>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl font-bold text-cyan-400 mb-4">20+</div>
              <div className="text-xl text-gray-300">Hours Saved Weekly</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-cyan-400 mb-4">100+</div>
              <div className="text-xl text-gray-300">Websites Built</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-cyan-400 mb-4">24/7</div>
              <div className="text-xl text-gray-300">AI Availability</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-6xl font-bold mb-8">
            Ready to transform<br />your business?
          </h2>
          <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join businesses saving 20+ hours weekly with AI automation
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-6 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg text-2xl font-semibold hover:scale-105 transition"
          >
            Start Your Journey
          </a>
        </div>
      </section>
    </main>
  )
}

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  featured?: boolean;
}

function ServiceCard({ title, description, price, features, featured }: ServiceCardProps) {
  return (
    <div className={`
      p-8 rounded-2xl border transition-all hover:scale-105
      ${featured 
        ? 'bg-blue-600/20 border-cyan-400' 
        : 'bg-blue-600/10 border-cyan-400/20 hover:border-cyan-400/40'
      }
    `}>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <p className="text-cyan-400 font-semibold text-xl mb-6">{price}</p>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="text-gray-300 flex items-start">
            <span className="text-cyan-400 mr-2">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg font-semibold hover:scale-105 transition">
        Get Started
      </button>
    </div>
  )
}
