'use client'
import Link from 'next/link'
import { LiquidGlassButton } from '@/components/ui'

export function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#020A12]/80 backdrop-blur-md border-t border-white/10">
      <LiquidGlassButton variant="primary" size="md" className="w-full min-h-[48px]">
        <Link href="/contact" className="block w-full text-center">
          Book Discovery Call
        </Link>
      </LiquidGlassButton>
    </div>
  )
}
