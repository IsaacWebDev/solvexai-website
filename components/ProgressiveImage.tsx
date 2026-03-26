'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface ProgressiveImageProps extends Omit<ImageProps, 'onLoad'> {
  src: string
  alt: string
}

export const ProgressiveImage = ({ src, alt, className, ...props }: ProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" aria-hidden="true" />
      )}
      <Image
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className || ''}`}
        {...props}
      />
    </div>
  )
}
