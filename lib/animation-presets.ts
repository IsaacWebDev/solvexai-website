/**
 * Reusable Animation Presets
 * 
 * For Framer Motion and GSAP
 */

import { Variants } from 'framer-motion'

/**
 * Framer Motion Variants
 */
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    }
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    }
  },
}

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    }
  },
}

export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -40 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    }
  },
}

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 40 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    }
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * GSAP Timeline Presets
 */
export const gsapPresets = {
  // Smooth ease
  ease: 'power3.inOut',
  
  // Durations
  fast: 0.3,
  medium: 0.6,
  slow: 1.2,
  
  // Stagger config
  stagger: {
    each: 0.1,
    from: 'start',
    ease: 'power2.out',
  },
  
  // Arrow animation (for workflow diagram)
  arrow: {
    duration: 1.5,
    ease: 'power2.inOut',
    repeat: -1,
    yoyo: true,
  },
  
  // Pulse animation
  pulse: {
    scale: 1.05,
    duration: 1,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true,
  },
}

/**
 * Cursor-following animation config
 */
export const cursorFollowConfig = {
  damping: 0.1, // Smooth lag effect (0.1 = slow, 1 = instant)
  stiffness: 100, // Spring stiffness
  mass: 1, // Mass for physics
  velocityFactor: 0.5, // Velocity influence
}

/**
 * Carousel config
 */
export const carouselConfig = {
  autoPlayDelay: 5000, // 5 seconds
  transitionDuration: 500, // 0.5s
  loop: true,
  dragFree: false,
  slidesToScroll: 1,
}

/**
 * Scroll reveal config
 */
export const scrollRevealConfig = {
  threshold: 0.1, // Trigger when 10% visible
  rootMargin: '-50px', // Start 50px before entering viewport
}

/**
 * CSS keyframe animations (for Tailwind)
 */
export const cssKeyframes = {
  'pulse-glow': `
    @keyframes pulse-glow {
      0%, 100% {
        opacity: 0.6;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
    }
  `,
  'float': `
    @keyframes float {
      0%, 100% {
        transform: translateY(0px) translateX(0px);
      }
      33% {
        transform: translateY(-20px) translateX(10px);
      }
      66% {
        transform: translateY(-10px) translateX(-10px);
      }
    }
  `,
  'slide-arrow': `
    @keyframes slide-arrow {
      0% {
        transform: translateX(-10px);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translateX(10px);
        opacity: 0;
      }
    }
  `,
  'rotate-slow': `
    @keyframes rotate-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
}
