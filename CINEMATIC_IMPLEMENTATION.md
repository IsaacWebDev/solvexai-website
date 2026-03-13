# SolveXAI Cinematic Website - Implementation Plan

## Architecture Overview

### Master Scroll Timeline System
- 5 scenes, each occupying 20% of total scroll height (100vh each)
- GSAP ScrollTrigger with scrub: 1 for smooth, timeline-driven animations
- Scene transitions using opacity, scale, and position transforms
- GPU-accelerated (transform/opacity only)

### Scene Breakdown

**Scene 1 (0-20%):** Hero Environment
- DNA helix background (Three.js animated)
- Particle field (200 particles desktop, 50 mobile)
- Hero text with fade + zoom animation
- Magnetic CTAs with glow
- Mouse parallax on helix and particles

**Scene 2 (20-40%):** Interactive 3D Object World
- Neural network sphere (Three.js)
- Rotates 360° as user scrolls
- Camera orbits around object
- Info panels slide in at 25%, 50%, 75%

**Scene 3 (40-60%):** Feature Reveal
- 3 service cards assemble from fragments
- SVG connection lines animate
- Glass morphism cards with 3D icons
- Staggered assembly: 0-33%, 33-66%, 66-100%

**Scene 4 (60-80%):** Dynamic Network
- Canvas-based node network (100 nodes)
- Forms "AI" pattern on scroll
- Mouse parallax interaction
- Animated stats (count-up)

**Scene 5 (80-100%):** CTA Cinematic Close
- DNA helix returns (callback, slower)
- Light sweep effect
- Mega glowing CTA button
- Particle burst on hover

## Tech Stack
- GSAP 3.14.2 + ScrollTrigger
- Three.js 0.183.2 + React Three Fiber 9.5.0
- Framer Motion 12.36.0
- Lenis 1.3.18 (smooth scroll)
- Next.js 16.1.6

## Implementation Steps

### Phase 1: Architecture (1-2h)
1. Create scene management system
2. Set up master GSAP timeline
3. Implement smooth scroll (Lenis)
4. Create scene transition hooks

### Phase 2: Scene Components (4-6h)
1. DNAHelix component (Three.js)
2. ParticleField component
3. ScrollControlled3DObject (neural network)
4. AssemblingCard components
5. NetworkVisualization (Canvas)
6. LightSweep effect
7. ParticleBurst effect

### Phase 3: Interactions (1-2h)
1. Mouse parallax system (gsap.quickTo)
2. Magnetic buttons enhancement
3. Glow effects (CSS + animations)
4. Hover states

### Phase 4: Performance (1-2h)
1. Mobile detection and degradation
2. Lazy loading heavy scenes
3. GPU acceleration verification
4. Bundle optimization

### Phase 5: Testing & Polish (1h)
1. Cross-browser testing
2. Mobile testing
3. Frame rate verification (60 FPS)
4. Final adjustments

## Performance Targets
- 60 FPS animations (mandatory)
- Lighthouse Performance: 90+
- FCP: < 1.5s
- TTI: < 3.5s
- Bundle: < 500KB initial

## Mobile Strategy
- Detect: window.innerWidth < 768
- Remove: Heavy 3D objects
- Reduce: Particle count (200 → 50)
- Disable: Mouse parallax
- Simplify: Transitions

## Color Palette
- Primary Blue: #00F0FF
- Background: #0a0a0a
- Accent: rgba(0, 240, 255, 0.6)
- Glass: rgba(255, 255, 255, 0.05)

## Status
🚧 **IN PROGRESS** - Full engineering division deployed
