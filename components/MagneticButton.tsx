'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href: string;
  className?: string;
}

export default function MagneticButton({ 
  children, 
  variant = 'primary', 
  href,
  className = ''
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    
    if (!buttonRef.current) return;
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const baseStyles = `
    relative inline-flex items-center justify-center
    px-8 py-4 rounded-full font-semibold text-lg
    transition-all duration-300 overflow-hidden
    border-2
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-[#0066FF] to-[#00F0FF]
      border-transparent
      text-white
      shadow-[0_0_20px_rgba(0,240,255,0.3)]
      hover:shadow-[0_0_40px_rgba(0,240,255,0.5)]
    `,
    secondary: `
      bg-transparent
      border-[#00F0FF]
      text-[#00F0FF]
      hover:bg-[#00F0FF]/10
      hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]
    `
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shimmer effect */}
      {isHovering && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite]">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}
      
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
