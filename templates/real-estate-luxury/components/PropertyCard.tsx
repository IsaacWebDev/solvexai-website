import Image from 'next/image';

interface PropertyCardProps {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
}

export default function PropertyCard({ title, price, location, image, bedrooms, bathrooms, squareFeet }: PropertyCardProps) {
  return (
    <div className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-primary text-dark px-4 py-1 rounded font-bold">
          ${(price / 1000000).toFixed(1)}M
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-2xl mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-dark/60 mb-4 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {location}
        </p>
        <div className="flex justify-between text-sm text-dark/70 border-t pt-4">
          <span>{bedrooms} Beds</span>
          <span>{bathrooms} Baths</span>
          <span>{squareFeet.toLocaleString()} sq ft</span>
        </div>
      </div>
    </div>
  );
}
