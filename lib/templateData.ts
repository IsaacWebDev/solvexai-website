import { TemplateModalData } from '@/components/modals/TemplateModal'

export const TEMPLATE_DATA: Record<string, TemplateModalData> = {
  restaurant: {
    name: 'Restaurant Delight',
    industry: 'Restaurants',
    price: 53,
    features: [
      'Dark luxury aesthetic with gold accents',
      'Full menu preview (starters, mains, desserts)',
      'Table reservation form with validation',
      'Featured dishes grid (6 items)',
      'Customer testimonials & gallery',
      'Location map & hours section'
    ],
    includes: 'Dark charcoal/black design, Smooth animations, Fully responsive, Ready to deploy',
    gradient: 'from-orange-600 to-red-600',
    pageImages: {
      home: '/template-pages/restaurant-home-page.png',
      about: '/template-pages/restaurant-about-page.png',
      services: '/template-pages/restaurant-services-page.png',
      contact: '/template-pages/restaurant-contact-page.png'
    }
  },
  law: {
    name: 'Law Firm Authority',
    industry: 'Law Firms',
    price: 67,
    features: [
      'Navy blue & gold professional design',
      '6 practice areas with detail pages',
      '3 attorney profiles with bios',
      'Consultation request form',
      'Firm stats (35+ years, $500M+ won)',
      'Client testimonials section'
    ],
    includes: 'Professional typography, Smooth animations, Fully responsive, Ready to deploy',
    gradient: 'from-blue-800 to-blue-600',
    pageImages: {
      home: '/template-pages/law-firm-home-page.png',
      about: '/template-pages/law-firm-about-page.png',
      services: '/template-pages/law-firm-services-page.png',
      contact: '/template-pages/law-firm-contact-page.png'
    }
  },
  fitness: {
    name: 'Fitness Studio Energy',
    industry: 'Fitness',
    price: 57,
    features: [
      'Dark design with neon green accents',
      '4 fitness programs with details',
      '3 trainer profiles with bios',
      '3-day class schedule grid',
      '3 membership plans (Basic/Pro/Elite)',
      'Transformation showcase & testimonials'
    ],
    includes: 'Bold energetic design, Smooth animations, Fully responsive, Ready to deploy',
    gradient: 'from-yellow-600 to-orange-600',
    pageImages: {
      home: '/template-pages/fitness-home-page.png',
      about: '/template-pages/fitness-about-page.png',
      services: '/template-pages/fitness-services-page.png',
      contact: '/template-pages/fitness-contact-page.png'
    }
  },
  construction: {
    name: 'Construction Pro',
    industry: 'Construction',
    price: 57,
    features: [
      'Construction yellow accents on dark grey',
      '6 services (residential, commercial, etc.)',
      '6 featured projects portfolio grid',
      '4-step construction process display',
      'Quote request form & testimonials',
      'Stats: 500+ projects, 25+ years, 100+ team'
    ],
    includes: 'Bold professional design, Smooth animations, Fully responsive, Ready to deploy',
    gradient: 'from-gray-700 to-yellow-700',
    pageImages: {
      home: '/template-pages/construction-home-page.png',
      about: '/template-pages/construction-about-page.png',
      services: '/template-pages/construction-services-page.png',
      contact: '/template-pages/construction-contact-page.png'
    }
  },
  medical: {
    name: 'Medical Practice Care',
    industry: 'Medical',
    price: 67,
    features: [
      'Soft blue accents with clean design',
      '6 medical services with details',
      '3 doctor profiles with specialties',
      'Appointment booking form with validation',
      '4 trust features & patient testimonials',
      'Clinic information with hours & map'
    ],
    includes: 'Professional healthcare design, Smooth animations, Fully responsive, Ready to deploy',
    gradient: 'from-cyan-600 to-blue-600',
    pageImages: {
      home: '/template-pages/medical-home-page.png',
      about: '/template-pages/medical-about-page.png',
      services: '/template-pages/medical-services-page.png',
      contact: '/template-pages/medical-contact-page.png'
    }
  },
  ecommerce: {
    name: 'E-Commerce Clean',
    industry: 'E-Commerce',
    price: 62,
    features: [
      'Apple-inspired minimal white design',
      '8 featured products with ratings',
      'Working shopping cart system',
      '4 featured categories with hover effects',
      'Trust section (shipping, returns, support)',
      'Newsletter signup & testimonials'
    ],
    includes: 'Cart functionality, Form validation, Fully responsive, Ready to deploy',
    gradient: 'from-purple-600 to-pink-600',
    pageImages: {
      home: '/template-pages/ecommerce-home-page.png',
      about: '/template-pages/ecommerce-about-page.png',
      services: '/template-pages/ecommerce-services-page.png',
      contact: '/template-pages/ecommerce-contact-page.png'
    }
  },
  agency: {
    name: 'Creative Agency Studio',
    industry: 'Creative',
    price: 59,
    features: [
      'Dark theme with purple/blue gradients',
      '4 services (Web Design, Branding, etc.)',
      '6 featured work portfolio with overlays',
      '4-step process (Discovery to Launch)',
      'Contact form with project type & budget',
      'Stats: 8+ years, 200+ projects, 50+ clients'
    ],
    includes: 'Modern creative design, Gradient accents, Fully responsive, Ready to deploy',
    gradient: 'from-pink-600 to-purple-600',
    pageImages: {
      home: '/template-pages/creative-agency-home-page.png',
      about: '/template-pages/creative-agency-about-page.png',
      services: '/template-pages/creative-agency-services-page.png',
      contact: '/template-pages/creative-agency-contact-page.png'
    }
  },
  realestate: {
    name: 'Real Estate Luxury',
    industry: 'Real Estate',
    price: 62,
    features: [
      'White background with gold accents',
      '6 featured properties with full details',
      '4 property categories (Villas, Apartments, etc.)',
      '3 agent profiles with contact buttons',
      'Property search bar & testimonials',
      'Stats: $2B+ sold, 25+ years, 50+ markets'
    ],
    includes: 'Luxury design, Premium typography, Fully responsive, Ready to deploy',
    gradient: 'from-yellow-800 to-yellow-600',
    pageImages: {
      home: '/template-pages/real-estate-home-page.png',
      about: '/template-pages/real-estate-about-page.png',
      services: '/template-pages/real-estate-services-page.png',
      contact: '/template-pages/real-estate-contact-page.png'
    }
  }
}
