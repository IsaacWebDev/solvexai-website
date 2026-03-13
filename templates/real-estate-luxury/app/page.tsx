import PropertyCard from '@/components/PropertyCard';

const featuredProperties = [
  {
    id: 1,
    title: 'Modern Penthouse Suite',
    price: 4500000,
    location: 'Manhattan, New York',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3200
  },
  {
    id: 2,
    title: 'Beachfront Villa',
    price: 8900000,
    location: 'Malibu, California',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    bedrooms: 6,
    bathrooms: 5,
    squareFeet: 5800
  },
  {
    id: 3,
    title: 'Historic Townhouse',
    price: 3200000,
    location: 'Boston, Massachusetts',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 4100
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-light">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920)' }}
        >
          <div className="absolute inset-0 bg-dark/60" />
        </div>
        <div className="relative z-10 text-center px-4 text-light max-w-4xl">
          <h1 className="font-heading font-bold text-6xl md:text-7xl mb-6">
            Discover Your<br />Dream Estate
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-light/90">
            Exclusive luxury properties in the world's most prestigious locations
          </p>
          <button className="bg-primary text-dark px-8 py-4 rounded font-bold text-lg hover:bg-primary/90 transition-all">
            Explore Properties →
          </button>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-2">Exclusive Listings</h2>
          <p className="text-dark/70 text-lg mb-12">Curated selection of our finest properties</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-dark text-light">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-heading font-bold text-primary mb-2">$2.5B+</div>
            <div className="text-light/70">Properties Sold</div>
          </div>
          <div>
            <div className="text-5xl font-heading font-bold text-primary mb-2">500+</div>
            <div className="text-light/70">Luxury Listings</div>
          </div>
          <div>
            <div className="text-5xl font-heading font-bold text-primary mb-2">98%</div>
            <div className="text-light/70">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-5xl font-heading font-bold text-primary mb-2">25+</div>
            <div className="text-light/70">Years Experience</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            Find Your Perfect Home
          </h2>
          <p className="text-dark/70 text-xl mb-8">
            Let our expert agents guide you to your dream property
          </p>
          <button className="bg-primary text-dark px-8 py-4 rounded font-bold text-lg hover:bg-primary/90 transition-all">
            Schedule a Consultation
          </button>
        </div>
      </section>
    </main>
  );
}
