'use client';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  featured?: boolean;
  delay?: number;
}

export default function ServiceCard({
  icon,
  title,
  description,
  price,
  features,
  featured = false,
  delay = 0
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      className={`relative ${featured ? 'md:-mt-8' : ''}`}
    >
      {/* Featured card glow ring */}
      {featured && (
        <motion.div
          className="absolute -inset-8 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}

      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor="#8B5CF6"
        glarePosition="all"
        scale={1.02}
        transitionSpeed={2000}
        className="h-full"
      >
        <motion.div
          className={`service-card glass-card p-8 text-center h-full flex flex-col relative overflow-hidden ${
            featured ? 'border-[#00F0FF]/30' : ''
          }`}
          whileHover={{
            y: -8,
            transition: { duration: 0.3 }
          }}
        >
          {/* Background circuit pattern */}
          <div className="absolute inset-0 circuit-bg opacity-30" />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className={`text-6xl mb-6 ${featured ? 'text-7xl' : ''}`}
              animate={{
                scale: featured ? [1, 1.05, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {icon}
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4">
              {title}
            </h3>

            {/* Description */}
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              {description}
            </p>

            {/* Price */}
            <div className="mb-6">
              <p className="text-2xl font-bold gradient-text">{price}</p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-grow">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center justify-center gap-2 text-sm text-white/80"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{}}
                  transition={{ delay: delay + 0.2 + index * 0.1 }}
                >
                  <svg
                    className="w-4 h-4 text-[#00F0FF] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.button
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                featured
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-white shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  : 'border-2 border-[#00F0FF]/40 text-white hover:bg-[#00F0FF]/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </span>
            </div>
          )}
        </motion.div>
      </Tilt>
    </motion.div>
  );
}
