# SolveXAI Website

**AI Automation & Web Development Agency**

A stunning, high-performance website built with Next.js 14, Tailwind CSS, and Framer Motion.

---

## 🚀 Features

- ⚡ **Next.js 14** (App Router) - Modern React framework
- 🎨 **Tailwind CSS** - Utility-first styling
- 🎭 **Framer Motion** - Smooth animations
- 🌟 **Glass Morphism** - Premium card designs
- 🎯 **Particle Background** - Interactive canvas animations
- 📱 **Fully Responsive** - Mobile-first design
- 🔥 **Performance Optimized** - Fast loading, lazy loading
- ♿ **SEO Ready** - Semantic HTML, meta tags

---

## 📁 Project Structure

```
solvexai-website/
├── app/
│   ├── layout.tsx          # Root layout with navbar/footer
│   ├── page.tsx            # Homepage
│   ├── services/page.tsx   # Services page
│   ├── contact/page.tsx    # Contact page
│   ├── globals.css         # Global styles
│   └── api/
│       └── contact/route.ts # Contact form API
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── ServiceCard.tsx
│   ├── ParticleBackground.tsx
│   └── AnimatedGraphic.tsx
├── public/
│   ├── solvexai-hero.png
│   └── solvexai-services.png
└── tailwind.config.ts
```

---

## 🎨 Design System

### Colors
- **Primary Blue:** `#0066FF`
- **Accent Cyan:** `#00F0FF`
- **Background Dark:** `#0a0a0a` with gradients
- **Text White:** `#ffffff`

### Typography
- **Font:** Inter (system fallback)
- **Hero:** 4-7rem bold, gradient text
- **Headings:** 2.5-4rem semi-bold
- **Body:** 1.125rem, line-height 1.6

### Effects
- Glass morphism cards with backdrop blur
- Neon glow borders on buttons
- Particle canvas background
- Smooth scroll animations
- Hover scale effects

---

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel deploy --prod
```

3. **Set Custom Domain:**
- Go to Vercel dashboard
- Settings → Domains
- Add `solvexai.app`

### Environment Variables

For contact form to send emails (optional):

```env
EMAIL_SERVICE_API_KEY=your_sendgrid_or_resend_key
CONTACT_EMAIL=contact@solvexai.app
```

---

## ✅ Success Criteria

- [x] Stunning visual design (matches mockups)
- [x] Smooth animations (Framer Motion)
- [x] Fast load (<2s)
- [x] Mobile responsive
- [x] Contact form working
- [x] SEO optimized
- [x] TypeScript build passing
- [ ] Deployed on Vercel
- [ ] Lighthouse 90+ (Performance, Accessibility, SEO)

---

## 🎯 Pages

### Homepage (`/`)
- Hero section with animated graphic
- Services grid (3 cards)
- Social proof stats
- Final CTA

### Services (`/services`)
- Detailed service breakdown
- Website template pricing tiers
- Custom development process
- AI Receptionist ROI calculator

### Contact (`/contact`)
- Contact form with validation
- Business information
- Social links
- Calendly integration option

---

## 🔧 Next Steps

1. **Email Integration:**
   - Configure SendGrid/Resend for contact form
   - Set up email templates

2. **Analytics:**
   - Add Vercel Analytics
   - Google Analytics 4
   - Conversion tracking

3. **Content:**
   - Add portfolio/case studies
   - Blog section
   - Testimonials

4. **Features:**
   - Live chat widget
   - Template previews
   - Pricing calculator

---

## 📊 Performance

Target metrics:
- **Performance:** 90+
- **Accessibility:** 95+
- **SEO:** 95+
- **Best Practices:** 90+

Optimizations:
- Image lazy loading
- Code splitting
- Minimal dependencies
- Optimized animations

---

## 🤝 Support

For issues or questions:
- **Email:** contact@solvexai.app
- **Documentation:** [Next.js Docs](https://nextjs.org/docs)

---

Built with ❤️ by SolveXAI
