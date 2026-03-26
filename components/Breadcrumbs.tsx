"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null;
  
  const paths = pathname.split('/').filter(Boolean);
  
  // Format path segment to title case
  const formatSegment = (segment: string) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <nav 
      className="flex items-center gap-2 text-sm text-white/60 mb-8 px-4"
      aria-label="Breadcrumb"
    >
      {/* Home */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-white transition-colors group"
          aria-label="Home"
        >
          <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Home</span>
        </Link>
      </motion.div>
      
      {/* Path segments */}
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        
        return (
          <motion.div
            key={href}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <ChevronRight className="w-4 h-4 text-white/40" />
            {isLast ? (
              <span 
                className="text-white font-medium"
                aria-current="page"
              >
                {formatSegment(path)}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-white transition-colors"
              >
                {formatSegment(path)}
              </Link>
            )}
          </motion.div>
        );
      })}
    </nav>
  );
};
