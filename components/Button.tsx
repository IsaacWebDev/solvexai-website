'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'large';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'default',
  href,
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 btn-hover-scale inline-flex items-center justify-center';
  
  const sizeStyles = {
    default: 'px-8 py-3 text-base',
    large: 'px-12 py-4 text-lg'
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-white shadow-[0_4px_16px_rgba(0,102,255,0.3)] hover:shadow-[0_8px_24px_rgba(0,240,255,0.5)] neon-glow',
    secondary: 'bg-transparent border-2 border-[#00F0FF]/40 text-white hover:bg-[#00F0FF]/10 hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]'
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {content}
    </button>
  );
}
