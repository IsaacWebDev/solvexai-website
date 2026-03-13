# Restaurant Delight Template - $497

**Industry:** Restaurants, Cafes, Food Services  
**Status:** ✅ PRODUCTION-READY  
**Build Time:** 4-6 hours  
**Pages:** 5 (Home, Menu, About, Contact, Online Ordering)

---

## 🎨 Design System

**Colors:**
- Primary: `#FF6B35` (Warm Orange)
- Secondary: `#F4A261` (Golden)
- Accent: `#E76F51` (Coral)
- Background: `#0a0a0a` with food imagery overlays

**Fonts:**
- Headings: Poppins (Bold, 600-700 weight)
- Body: Poppins (Regular, 400 weight)
- Accent: Playfair Display (for quotes/specials)

**Typography Scale:**
- Hero: 4-5rem
- Section Headings: 2.5-3rem
- Card Titles: 1.5rem
- Body: 1.125rem

---

## 📄 Pages Included

### 1. Home (`/`)
**Sections:**
- Hero with food photography
- Featured dishes carousel
- About snippet
- Testimonials
- Location + hours
- CTA (Reserve table)

### 2. Menu (`/menu`)
**Features:**
- Category tabs (Appetizers, Mains, Desserts, Drinks)
- Search/filter functionality
- Dish cards with:
  - High-quality photo
  - Name + description
  - Price
  - Dietary tags (vegan, gf, etc.)
- Special diet filters

### 3. About (`/about`)
**Sections:**
- Restaurant story
- Chef introduction
- Team photos
- Values/mission
- Awards/press

### 4. Contact (`/contact`)
**Features:**
- Reservation form
  - Name
  - Email
  - Phone
  - Party size
  - Date/time picker
  - Special requests
- Google Maps embed
- Operating hours
- Phone/email
- Social links

### 5. Order Online (`/order`)
**Features:**
- Menu with add-to-cart
- Cart management
- Checkout flow
- Stripe integration ready
- Pickup/delivery options

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Images:** Next.js Image optimization
- **Payment:** Stripe (ready to integrate)
- **Booking:** Calendly embed OR custom system

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd templates/restaurant-delight
npm install
```

### 2. Configure
```bash
# Copy environment template
cp .env.example .env.local

# Edit with restaurant details
nano .env.local
```

### 3. Customize Content
```javascript
// config/restaurant.ts
export const restaurantConfig = {
  name: "Bella Italia",
  tagline: "Authentic Italian Cuisine",
  logo: "/logo.png",
  colors: {
    primary: "#FF6B35",
    secondary: "#F4A261"
  },
  contact: {
    phone: "+1 234 567 8900",
    email: "info@bellaitalia.com",
    address: "123 Main St, City, State"
  },
  hours: {
    monday: "11am - 10pm",
    tuesday: "11am - 10pm",
    // ...
  },
  social: {
    instagram: "https://instagram.com/bellaitalia",
    facebook: "https://facebook.com/bellaitalia"
  }
}
```

### 4. Add Menu Items
```javascript
// data/menu.ts
export const menu = [
  {
    category: "Appetizers",
    items: [
      {
        name: "Bruschetta",
        description: "Toasted bread with tomatoes, garlic, basil",
        price: 12.99,
        image: "/images/bruschetta.jpg",
        tags: ["vegetarian", "vegan-option"]
      },
      // ...
    ]
  },
  // ...
]
```

### 5. Run Development
```bash
npm run dev
# Visit http://localhost:3000
```

### 6. Deploy
```bash
vercel deploy --prod
```

---

## 📦 What's Included

### Components
- `RestaurantNav.tsx` - Sticky navigation with menu link
- `HeroFood.tsx` - Full-screen hero with food image
- `MenuGrid.tsx` - Filterable menu display
- `DishCard.tsx` - Individual dish card with hover
- `ReservationForm.tsx` - Booking form with validation
- `HoursDisplay.tsx` - Operating hours widget
- `ChefProfile.tsx` - Team member profile
- `TestimonialSlider.tsx` - Customer reviews carousel
- `CTASection.tsx` - Call-to-action blocks

### Features
- ✅ Responsive design (mobile-first)
- ✅ Image optimization
- ✅ SEO optimized
- ✅ Fast loading (<2s)
- ✅ Accessibility (WCAG AA)
- ✅ Contact form with validation
- ✅ Google Maps integration
- ✅ Social media links
- ✅ Schema.org markup for rich snippets

### Integrations Ready
- Stripe (online ordering)
- Calendly (reservations)
- Instagram feed
- Google Analytics
- Facebook Pixel

---

## 🎯 Customization Guide

### Change Colors
```css
/* tailwind.config.ts */
theme: {
  extend: {
    colors: {
      'restaurant-primary': '#FF6B35',  // Change this
      'restaurant-secondary': '#F4A261' // And this
    }
  }
}
```

### Update Logo
```
1. Replace /public/logo.png
2. Update config/restaurant.ts → logo
```

### Modify Menu
```
1. Edit data/menu.ts
2. Add images to /public/images/dishes/
3. Categories auto-generate from data
```

### Change Fonts
```typescript
// config/fonts.ts
import { Poppins, Playfair_Display } from 'next/font/google'

export const heading = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['700']
})

export const body = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '600']
})
```

---

## 📊 Performance

**Lighthouse Scores (Target):**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Optimizations:**
- Next.js Image automatic optimization
- Code splitting by route
- Lazy loading for images below fold
- Minimal JavaScript (< 100kb)
- Font preloading

---

## 🎨 Design Variations

### Dark Mode Option
Add `dark:` variants to Tailwind classes

### Alternative Layouts
- Grid view (default)
- List view (compact)
- Card view (detailed)

---

## 💼 Client Handoff

### What to Provide Client:
1. ✅ Login credentials (Vercel, domain)
2. ✅ Content management guide
3. ✅ How to update menu
4. ✅ How to change images
5. ✅ Stripe setup guide
6. ✅ Google Analytics setup
7. ✅ Social media integration guide

### Training Video Topics:
- Updating menu items
- Adding new dishes
- Changing photos
- Managing reservations
- Viewing analytics

---

## 🔧 Maintenance

### Monthly Tasks:
- Update menu items/prices
- Add seasonal specials
- Refresh food photography
- Review analytics
- Test booking system

### Quarterly:
- Update Node.js dependencies
- Audit Lighthouse scores
- Refresh SEO keywords
- Check broken links

---

## 💰 Pricing Tiers

**Basic ($497):**
- 5 pages
- Standard features
- 1 week setup

**Pro ($797):**
- Basic + online ordering
- Custom reservations
- Instagram integration
- 2 weeks setup

**Premium ($997):**
- Pro + loyalty program
- Email marketing integration
- Advanced analytics
- Monthly maintenance

---

## 📞 Support

**Setup:** Included (1 week)
**Training:** 30-minute video call
**Maintenance:** Available (monthly retainer)
**Updates:** Free bug fixes for 30 days

---

Built for SolveXAI by [Your Team]
