"use client";

/**
 * Liquid Glass Component Showcase
 * 
 * Visual demonstration of all 5 liquid glass components.
 * Copy this file to your pages directory to see components in action.
 * 
 * Usage:
 * 1. Copy to app/showcase/page.tsx
 * 2. Run: npm run dev
 * 3. Visit: http://localhost:3000/showcase
 */

import { useState } from "react";
import { Gem } from "lucide-react";
import {
  LiquidGlassCard,
  LiquidGlassButton,
  LiquidCursor,
  LiquidScrollProgress,
  LiquidLoader,
} from "./index";

export default function LiquidGlassShowcase() {
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      {/* Global effects */}
      <LiquidCursor />
      <LiquidScrollProgress />

      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 flex items-center justify-center gap-4">
            <Gem className="w-12 h-12 text-cyan-400" />
            Liquid Glass Components
          </h1>
          <p className="text-gray-400 text-xl">
            Premium frosted glass design system
          </p>
        </div>

        {/* 1. LiquidGlassCard - Light */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4">1. LiquidGlassCard - Light</h2>
          <p className="text-gray-400 mb-6">
            Subtle blur, minimal opacity - perfect for overlays
          </p>
          <LiquidGlassCard intensity="light" className="p-8 max-w-2xl">
            <h3 className="text-2xl font-bold mb-2">Light Intensity</h3>
            <p className="text-gray-300">
              Hover over this card to see the mouse glow and liquid shine
              effect. The glass is subtle and elegant.
            </p>
          </LiquidGlassCard>
        </section>

        {/* 2. LiquidGlassCard - Medium */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4">
            2. LiquidGlassCard - Medium (Default)
          </h2>
          <p className="text-gray-400 mb-6">
            Balanced blur and opacity - ideal for content cards
          </p>
          <LiquidGlassCard intensity="medium" className="p-8 max-w-2xl">
            <h3 className="text-2xl font-bold mb-2">Medium Intensity</h3>
            <p className="text-gray-300 mb-4">
              This is the default intensity level. Notice the frosted glass
              effect with 12px blur and visible translucency.
            </p>
            <div className="flex gap-3">
              <LiquidGlassButton variant="primary" size="sm">
                Primary
              </LiquidGlassButton>
              <LiquidGlassButton variant="secondary" size="sm">
                Secondary
              </LiquidGlassButton>
              <LiquidGlassButton variant="ghost" size="sm">
                Ghost
              </LiquidGlassButton>
            </div>
          </LiquidGlassCard>
        </section>

        {/* 3. LiquidGlassCard - Heavy */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4">3. LiquidGlassCard - Heavy</h2>
          <p className="text-gray-400 mb-6">
            Dramatic blur, strong glass effect - hero sections
          </p>
          <LiquidGlassCard intensity="heavy" className="p-12 max-w-2xl">
            <h3 className="text-3xl font-bold mb-4">Heavy Intensity</h3>
            <p className="text-gray-300 mb-6">
              Maximum frosted glass effect with 20px blur. Perfect for hero
              sections and prominent features. The glow is more intense.
            </p>
            <LiquidGlassButton variant="primary" size="lg">
              Get Started
            </LiquidGlassButton>
          </LiquidGlassCard>
        </section>

        {/* 4. LiquidGlassButton Variants */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4">4. LiquidGlassButton Variants</h2>
          <p className="text-gray-400 mb-6">
            Click to see ripple effect, hover for glow
          </p>
          <LiquidGlassCard intensity="medium" className="p-8 max-w-2xl">
            {/* Primary */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-3">Primary</h4>
              <div className="flex gap-3">
                <LiquidGlassButton variant="primary" size="sm">
                  Small
                </LiquidGlassButton>
                <LiquidGlassButton variant="primary" size="md">
                  Medium
                </LiquidGlassButton>
                <LiquidGlassButton variant="primary" size="lg">
                  Large
                </LiquidGlassButton>
              </div>
            </div>

            {/* Secondary */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-3">Secondary</h4>
              <div className="flex gap-3">
                <LiquidGlassButton variant="secondary" size="sm">
                  Small
                </LiquidGlassButton>
                <LiquidGlassButton variant="secondary" size="md">
                  Medium
                </LiquidGlassButton>
                <LiquidGlassButton variant="secondary" size="lg">
                  Large
                </LiquidGlassButton>
              </div>
            </div>

            {/* Ghost */}
            <div>
              <h4 className="text-xl font-semibold mb-3">Ghost</h4>
              <div className="flex gap-3">
                <LiquidGlassButton variant="ghost" size="sm">
                  Small
                </LiquidGlassButton>
                <LiquidGlassButton variant="ghost" size="md">
                  Medium
                </LiquidGlassButton>
                <LiquidGlassButton variant="ghost" size="lg">
                  Large
                </LiquidGlassButton>
              </div>
            </div>
          </LiquidGlassCard>
        </section>

        {/* 5. LiquidLoader */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4">5. LiquidLoader</h2>
          <p className="text-gray-400 mb-6">
            Animated loading indicator with staggered bounce
          </p>
          <LiquidGlassCard intensity="medium" className="p-8 max-w-2xl">
            <div className="flex flex-col items-center gap-6">
              {isLoading ? (
                <div className="py-8">
                  <LiquidLoader />
                  <p className="text-center mt-4 text-gray-400">
                    Loading... (3 seconds)
                  </p>
                </div>
              ) : (
                <div className="py-8">
                  <p className="text-center text-gray-300 mb-4">
                    Click the button to see the loader
                  </p>
                  <div className="flex justify-center">
                    <LiquidGlassButton
                      variant="primary"
                      size="md"
                      onClick={simulateLoading}
                    >
                      Simulate Loading
                    </LiquidGlassButton>
                  </div>
                </div>
              )}
            </div>
          </LiquidGlassCard>
        </section>

        {/* 6. Custom Colors */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4">6. Custom Glow Colors</h2>
          <p className="text-gray-400 mb-6">
            Customize the glow effect to match your brand
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LiquidGlassCard
              intensity="medium"
              glowColor="#8B5CF6"
              className="p-6"
            >
              <h4 className="font-bold mb-2">Purple (Default)</h4>
              <p className="text-sm text-gray-400">#8B5CF6</p>
            </LiquidGlassCard>

            <LiquidGlassCard
              intensity="medium"
              glowColor="#00F0FF"
              className="p-6"
            >
              <h4 className="font-bold mb-2">Cyan</h4>
              <p className="text-sm text-gray-400">#00F0FF</p>
            </LiquidGlassCard>

            <LiquidGlassCard
              intensity="medium"
              glowColor="#FF006E"
              className="p-6"
            >
              <h4 className="font-bold mb-2">Pink</h4>
              <p className="text-sm text-gray-400">#FF006E</p>
            </LiquidGlassCard>
          </div>
        </section>

        {/* 7. Real-World Example */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4">7. Real-World Example</h2>
          <p className="text-gray-400 mb-6">Product card with all effects</p>
          <LiquidGlassCard intensity="heavy" className="p-8 max-w-lg">
            <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-6" />
            <h3 className="text-2xl font-bold mb-2">Premium Product</h3>
            <p className="text-gray-300 mb-4">
              Experience the future of design with liquid glass components.
              Premium quality, smooth animations, and beautiful effects.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">$49</span>
              <LiquidGlassButton variant="primary" size="md">
                Add to Cart
              </LiquidGlassButton>
            </div>
          </LiquidGlassCard>
        </section>

        {/* Footer */}
        <section className="text-center py-12">
          <LiquidGlassCard intensity="light" className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to use Liquid Glass?
            </h3>
            <p className="text-gray-400 mb-6">
              Import from @/components/ui and start building premium experiences
            </p>
            <div className="flex gap-4 justify-center">
              <LiquidGlassButton variant="primary" size="lg" href="/docs">
                View Documentation
              </LiquidGlassButton>
              <LiquidGlassButton
                variant="ghost"
                size="lg"
                href="https://github.com/IsaacWebDev/solvexai-website"
              >
                GitHub
              </LiquidGlassButton>
            </div>
          </LiquidGlassCard>
        </section>

        {/* Scroll Notice */}
        <div className="h-screen flex items-center justify-center">
          <LiquidGlassCard intensity="medium" className="p-12 max-w-md text-center">
            <h3 className="text-2xl font-bold mb-4">
              Notice the scroll progress bar?
            </h3>
            <p className="text-gray-400">
              The gradient progress bar at the top tracks your scroll position
              with smooth spring physics.
            </p>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
}
