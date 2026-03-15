const { sessions_spawn } = require('openclaw');

async function spawnTeams() {
  console.log('Spawning TEAM A: ui-designer...');
  const teamA = await sessions_spawn({
    agentId: 'ui-designer',
    task: `**SolveXAI - TEAM A: UI Design Foundation**

**Project:** C:\\Users\\isaac\\.openclaw\\workspace\\solvexai-website
**GitHub:** https://github.com/IsaacWebDev/solvexai-website

**Foundation files already exist (USE THESE):**
- lib/claymorph-styles.ts
- lib/theme-config.ts
- lib/animation-presets.ts

**YOUR DELIVERABLES (MUST CREATE):**

1. **Claymorphic Card System** (6h)
   - File: components/ui/ClayCard.tsx
   - Multi-layer shadows using claymorph-styles.ts
   - Props: variant (soft/hard/inset), elevation (sm/md/lg), hover effects
   - TypeScript + React
   
   - File: components/ui/ClayButton.tsx
   - Clay-styled buttons (primary/secondary/ghost)
   - Realistic press animation
   - Accessibility (ARIA, keyboard nav)

2. **Enhanced Hero Orb** (4h)
   - File: components/FloatingOrb.tsx (UPDATE EXISTING)
   - Add cursor-following logic (smooth lerp)
   - Add pulsing animation (2s interval)
   - Multi-layer glow (3+ layers)
   - Use animation-presets.ts

3. **Trust Badges** (5h)
   - File: components/trust/TrustBadges.tsx
   - 4 badges:
     * "30-Day Money-Back Guarantee"
     * "Enterprise-Grade Security"
     * "AI-Powered Intelligence"
     * "2-Year Track Record"
   - Skeuomorphic style with realistic shadows
   - Icons (lucide-react)
   - Responsive grid

**CRITICAL REQUIREMENTS:**
- All files MUST be created in workspace
- Use TypeScript with proper types
- Follow Next.js 15 + Tailwind conventions
- Import from foundation files
- Test components compile
- DO NOT just create plans - CREATE THE FILES

**After completion:**
- Verify all 3 deliverables exist
- Report file paths created`,
    mode: 'run'
  });
  console.log('TEAM A spawned:', teamA.runId);

  console.log('Spawning TEAM B: frontend...');
  const teamB = await sessions_spawn({
    agentId: 'frontend',
    task: `**SolveXAI - TEAM B: Interactive Components**

**Project:** C:\\Users\\isaac\\.openclaw\\workspace\\solvexai-website
**GitHub:** https://github.com/IsaacWebDev/solvexai-website

**Foundation files available:**
- lib/claymorph-styles.ts
- lib/theme-config.ts
- lib/animation-presets.ts

**YOUR DELIVERABLES (MUST CREATE):**

1. **Testimonial Carousel** (5h)
   - File: components/sections/TestimonialCarousel.tsx
   - 5-star rating display
   - Auto-rotate every 5 seconds
   - Show 3-4 testimonials visible
   - Smooth transitions
   - Sample testimonials (3-5 realistic ones)
   - Company logos (placeholder or lucide icons)
   - Responsive (mobile: 1, tablet: 2, desktop: 3)

2. **Animated Workflow Diagram** (5h)
   - File: components/sections/AnimatedWorkflow.tsx
   - "How It Works" section
   - 4 steps with icons:
     * Step 1: Upload Problem
     * Step 2: AI Analysis
     * Step 3: Solution Generation
     * Step 4: Download Results
   - Animated arrows between steps (GSAP or Framer Motion)
   - Progressive reveal on scroll
   - Responsive layout

3. **Advanced Pricing Section** (10h)
   - File: components/sections/PricingSimple.tsx (UPDATE EXISTING)
   - Add annual/monthly toggle (save 20% annually)
   - 3 tiers: Free, Pro ($29/mo), Enterprise (Custom)
   - Feature comparison matrix (8-10 features)
   - Highlight popular tier
   - CTA buttons
   - Pricing animation on toggle

**CRITICAL REQUIREMENTS:**
- Install dependencies if needed: gsap or framer-motion
- All files MUST be created
- Use TypeScript with proper types
- Responsive design (mobile-first)
- Accessibility (ARIA labels)
- DO NOT just create plans - CREATE THE FILES

**After completion:**
- Verify all 3 deliverables exist
- Test in dev server if possible
- Report file paths created`,
    mode: 'run'
  });
  console.log('TEAM B spawned:', teamB.runId);

  console.log('Spawning TEAM C: senior-dev...');
  const teamC = await sessions_spawn({
    agentId: 'senior-dev',
    task: `**SolveXAI - TEAM C: Dark Mode + Site-Wide Claymorphism**

**Project:** C:\\Users\\isaac\\.openclaw\\workspace\\solvexai-website
**GitHub:** https://github.com/IsaacWebDev/solvexai-website

**Foundation files available:**
- lib/claymorph-styles.ts
- lib/theme-config.ts
- lib/animation-presets.ts

**YOUR DELIVERABLES (MUST CREATE):**

1. **Dark Mode System** (14h)
   - File: components/theme/ThemeProvider.tsx
     * Context provider for theme state
     * localStorage persistence
     * System preference detection
     * Toggle function
   
   - File: components/theme/ThemeSwitcher.tsx
     * UI toggle component (sun/moon icon)
     * Smooth transition animation
     * Accessible button
   
   - Update ALL existing components for dark mode:
     * Scan components/ directory
     * Add dark: variants to Tailwind classes
     * Ensure clay shadows work in dark mode
     * Update theme-config.ts with dark colors

2. **Site-Wide Claymorphism Plugin** (12h)
   - File: plugins/claymorphism.ts
     * Tailwind plugin
     * Utilities: clay-card, clay-button, clay-input
     * Variants: soft, hard, inset
     * Elevation levels: sm, md, lg, xl
   
   - File: tailwind.config.ts (UPDATE EXISTING)
     * Import and register plugin
     * Add clay color palette
     * Configure dark mode: 'class'
   
   - Apply clay styles to existing cards:
     * Identify all card components
     * Replace standard shadows with clay utilities
     * Ensure consistency

**CRITICAL REQUIREMENTS:**
- Test dark mode toggle works
- Verify all components support dark mode
- Ensure plugin compiles with Tailwind
- Check no visual regressions
- DO NOT just create plans - CREATE THE FILES

**After completion:**
- Run: npm run build (verify no errors)
- Verify all deliverables exist
- Report file paths created
- List components updated for dark mode`,
    mode: 'run'
  });
  console.log('TEAM C spawned:', teamC.runId);

  console.log('\n=== ALL TEAMS SPAWNED ===');
  console.log('TEAM A (ui-designer):', teamA.runId);
  console.log('TEAM B (frontend):', teamB.runId);
  console.log('TEAM C (senior-dev):', teamC.runId);
  console.log('\nResults will auto-announce when complete.');
}

spawnTeams().catch(console.error);
