import { Trophy, Handshake, Sparkles } from 'lucide-react'

export default function About() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h1 className="font-heading font-bold text-6xl mb-6">About Prestige Estate</h1>
            <p className="text-lg text-dark/80 mb-6">
              For over 25 years, Prestige Estate has been the premier name in luxury real estate, 
              connecting discerning clients with extraordinary properties across the globe.
            </p>
            <p className="text-lg text-dark/80 mb-6">
              Our team of expert agents brings unparalleled market knowledge, discretion, and 
              dedication to every transaction. We don't just sell properties—we create legacies.
            </p>
            <p className="text-lg text-dark/80">
              From beachfront villas to penthouse suites, historic estates to modern architectural 
              marvels, we curate a portfolio that represents the pinnacle of luxury living.
            </p>
          </div>
          <div className="h-96 bg-cover bg-center rounded-lg" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800)'}} />
        </div>

        <section className="py-20 bg-dark text-light rounded-xl px-12 mb-20">
          <h2 className="font-heading font-bold text-4xl mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Trophy className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-3">Excellence</h3>
              <p className="text-light/80">Uncompromising standards in every detail</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Handshake className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-3">Trust</h3>
              <p className="text-light/80">Discretion and integrity in all relationships</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-3">Innovation</h3>
              <p className="text-light/80">Leading the market with cutting-edge strategies</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-heading font-bold text-4xl mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Victoria Sterling', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
              { name: 'Marcus Chen', role: 'Director of Sales', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400' },
              { name: 'Sofia Rodriguez', role: 'Head of Marketing', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400' },
            ].map((person, i) => (
              <div key={i}>
                <div className="h-80 bg-cover bg-center rounded-lg mb-4" style={{backgroundImage: `url(${person.image})`}} />
                <h3 className="font-heading font-bold text-2xl mb-1">{person.name}</h3>
                <p className="text-primary font-semibold">{person.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
