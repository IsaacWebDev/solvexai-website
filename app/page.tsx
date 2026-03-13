'use client'

import React from 'react'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* HERO */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 8rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
          lineHeight: 1.1
        }}>
          We save businesses{' '}
          <span style={{ color: '#22d3ee' }}>20+ hours/week</span>
          {' '}with AI
        </h1>
        
        <p style={{
          fontSize: 'clamp(1.25rem, 3vw, 2rem)',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '3rem',
          textAlign: 'center',
          maxWidth: '48rem'
        }}>
          Transform your website into a 24/7 sales machine with intelligent automation
        </p>
        
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="#services"
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(to right, #2563eb, #22d3ee)',
              borderRadius: '0.5rem',
              fontSize: '1.25rem',
              fontWeight: '600',
              textDecoration: 'none',
              color: '#fff',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            View Templates
          </a>
          <a
            href="#contact"
            style={{
              padding: '1rem 2rem',
              border: '2px solid #22d3ee',
              borderRadius: '0.5rem',
              fontSize: '1.25rem',
              fontWeight: '600',
              textDecoration: 'none',
              color: '#fff',
              transition: 'all 0.2s',
              cursor: 'pointer',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Book Consultation
          </a>
        </div>
      </section>
      
      {/* SERVICES */}
      <section id="services" style={{ minHeight: '100vh', padding: '6rem 1rem' }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          Our Services
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '75rem',
          margin: '0 auto'
        }}>
          <ServiceCard
            title="Website Templates"
            description="Industry-specific sites in 48 hours"
            price="From $297"
            features={[
              'Restaurant, Law, Fitness, Real Estate',
              'Fully responsive & SEO optimized',
              'Easy customization'
            ]}
          />
          <ServiceCard
            title="Custom Development"
            description="Tailored solutions for scale"
            price="From $1,997"
            features={[
              'Bespoke design & architecture',
              'Advanced integrations',
              'Dedicated support'
            ]}
            featured
          />
          <ServiceCard
            title="AI Receptionist"
            description="24/7 intelligent support"
            price="From $1,997"
            features={[
              'Natural voice (ElevenLabs)',
              'Smart call routing',
              'CRM integration'
            ]}
          />
        </div>
      </section>
      
      {/* STATS */}
      <section style={{
        minHeight: '100vh',
        padding: '6rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '75rem', width: '100%' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            Why Choose Us
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 'bold',
                color: '#22d3ee',
                marginBottom: '1rem'
              }}>
                20+
              </div>
              <div style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)' }}>
                Hours Saved Weekly
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 'bold',
                color: '#22d3ee',
                marginBottom: '1rem'
              }}>
                100+
              </div>
              <div style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)' }}>
                Websites Built
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 'bold',
                color: '#22d3ee',
                marginBottom: '1rem'
              }}>
                24/7
              </div>
              <div style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)' }}>
                AI Availability
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 'bold',
            marginBottom: '2rem',
            lineHeight: 1.2
          }}>
            Ready to transform<br />your business?
          </h2>
          <p style={{
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '3rem',
            maxWidth: '40rem',
            margin: '0 auto 3rem'
          }}>
            Join businesses saving 20+ hours weekly with AI automation
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '1.5rem 3rem',
              background: 'linear-gradient(to right, #2563eb, #22d3ee)',
              borderRadius: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: '600',
              textDecoration: 'none',
              color: '#fff',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Start Your Journey
          </a>
        </div>
      </section>
    </main>
  )
}

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  featured?: boolean;
}

function ServiceCard({ title, description, price, features, featured }: ServiceCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: '1rem',
        border: featured ? '2px solid #22d3ee' : '2px solid rgba(34,211,238,0.2)',
        background: featured ? 'rgba(37,99,235,0.2)' : 'rgba(37,99,235,0.1)',
        transition: 'all 0.3s',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        {title}
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
        {description}
      </p>
      <p style={{ color: '#22d3ee', fontWeight: '600', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
        {price}
      </p>
      
      <ul style={{ marginBottom: '1.5rem', padding: 0, listStyle: 'none' }}>
        {features.map((feature, i) => (
          <li key={i} style={{
            color: 'rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '0.5rem'
          }}>
            <span style={{ color: '#22d3ee', marginRight: '0.5rem' }}>✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button style={{
        width: '100%',
        padding: '0.75rem 1.5rem',
        background: 'linear-gradient(to right, #2563eb, #22d3ee)',
        borderRadius: '0.5rem',
        fontWeight: '600',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'transform 0.2s'
      }}>
        Get Started
      </button>
    </div>
  )
}


