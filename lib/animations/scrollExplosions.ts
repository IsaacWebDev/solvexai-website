'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, RefObject } from 'react';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Applies explosive reveal animation to an element on scroll
 */
export function useScrollExplosion(
  ref: RefObject<HTMLElement>,
  options: {
    start?: string;
    end?: string;
    once?: boolean;
    delay?: number;
  } = {}
) {
  const {
    start = 'top 80%',
    end = 'top 50%',
    once = true,
    delay = 0,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.fromTo(
      element,
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: false,
          once,
          markers: false, // Set to true for debugging
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [ref, start, end, once, delay]);
}

/**
 * Applies staggered explosion to multiple children
 */
export function useStaggeredExplosion(
  ref: RefObject<HTMLElement>,
  options: {
    start?: string;
    childSelector?: string;
    stagger?: number;
  } = {}
) {
  const {
    start = 'top 80%',
    childSelector = '> *',
    stagger = 0.1,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const children = element.querySelectorAll(childSelector);

    gsap.fromTo(
      children,
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: 'back.out(2)',
        stagger,
        scrollTrigger: {
          trigger: element,
          start,
          once: true,
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [ref, start, childSelector, stagger]);
}
