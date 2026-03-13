import PropertyCard from '@/components/PropertyCard';

const properties = [
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
  {
    id: 4,
    title: 'Mountain Retreat',
    price: 6700000,
    location: 'Aspen, Colorado',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    bedrooms: 7,
    bathrooms: 6,
    squareFeet: 6500
  },
  {
    id: 5,
    title: 'Waterfront Estate',
    price: 12500000,
    location: 'Miami Beach, Florida',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    bedrooms: 8,
    bathrooms: 7,
    squareFeet: 9200
  },
  {
    id: 6,
    title: 'Contemporary Loft',
    price: 2800000,
    location: 'San Francisco, California',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2400
  },
];

export default function Properties() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-light">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-heading font-bold text-5xl md:text-6xl mb-4">
          Luxury <span className="text-primary">Properties</span>
        </h1>
        <p className="text-dark/70 text-lg mb-12">
          Browse our exclusive collection of premium estates
        </p>

        <div className="mb-8 flex flex-wrap gap-4">
          <button className="px-6 py-2 bg-primary text-dark rounded font-semibold">All</button>
          <button className="px-6 py-2 bg-light border border-dark/20 rounded hover:bg-dark/5">Houses</button>
          <button className="px-6 py-2 bg-light border border-dark/20 rounded hover:bg-dark/5">Apartments</button>
          <button className="px-6 py-2 bg-light border border-dark/20 rounded hover:bg-dark/5">Villas</button>
          <button className="px-6 py-2 bg-light border border-dark/20 rounded hover:bg-dark/5">Penthouses</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(property => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </main>
  );
}
