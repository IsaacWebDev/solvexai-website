'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallback?: React.ReactNode
}

/**
 * Image component with error handling
 * Displays fallback UI if image fails to load
 * Improves UX and prevents broken image icons
 */
export function SafeImage({ fallback, alt, ...props }: SafeImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return fallback || (
      <div 
        className="bg-gray-800 flex items-center justify-center text-gray-500 text-sm rounded"
        style={{ 
          width: typeof props.width === 'number' ? props.width : '100%', 
          height: typeof props.height === 'number' ? props.height : 'auto'
        }}
      >
        {alt}
      </div>
    )
  }

  return (
    <Image
      {...props}
      alt={alt}
      onError={() => setError(true)}
    />
  )
}
