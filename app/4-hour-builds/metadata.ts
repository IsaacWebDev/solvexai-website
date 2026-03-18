import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '4-Hour Site Builds | Production-Ready Sites in Hours, Not Weeks | SolveXAI',
  description: 'Get a production-ready luxury website in 4 hours, not 4 weeks. 10-agent parallel execution, 10 quality gates, fixed pricing. See our Montrez case study.',
  keywords: 'fast website development, 4-hour website, luxury website design, e-commerce development, emergency website rebuild, quick site launch',
  openGraph: {
    title: '4-Hour Site Builds - Production Ready in Hours',
    description: 'We rebuilt Montrez luxury e-commerce site in 4 hours. See the case study.',
    url: 'https://solvexai-website.vercel.app/4-hour-builds',
    type: 'website',
    images: [
      {
        url: '/og-4-hour-builds.jpg',
        width: 1200,
        height: 630,
        alt: '4-Hour Site Builds by SolveXAI'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '4-Hour Site Builds - 10x Faster Development',
    description: 'Production-ready sites in 4 hours. Real case study: Montrez luxury e-commerce.',
    images: ['/og-4-hour-builds.jpg']
  },
  alternates: {
    canonical: 'https://solvexai-website.vercel.app/4-hour-builds'
  }
}
