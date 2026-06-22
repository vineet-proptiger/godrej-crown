'use client'
import React, { useState } from 'react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const amenities = [
  {
    label: '1,00,000 Sq.Ft. Grand Clubhouse',
    icon: (hovered) => (
      <svg width="64" height="64" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : 'var(--color-gold)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 26L26 12l16 14" />
        <rect x="14" y="26" width="24" height="16" />
        <rect x="21" y="32" width="10" height="10" />
        <line x1="10" y1="26" x2="42" y2="26" />
      </svg>
    ),
  },
  {
    label: 'Wellness Café',
    icon: (hovered) => (
      <svg width="64" height="64" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : 'var(--color-gold)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="36" height="24" rx="2" />
        <path d="M8 20h36M8 32h36M26 14v24" />
        <path d="M14 20v12M38 20v12" />
      </svg>
    ),
  },
  {
    label: 'Pilates Studio',
    icon: (hovered) => (
      <svg width="64" height="64" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : 'var(--color-gold)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="26" cy="12" r="4" />
        <path d="M26 16v12" />
        <path d="M18 22l8 4 8-4" />
        <path d="M26 28l-6 8M26 28l6 8" />
        <line x1="10" y1="44" x2="42" y2="44" />
      </svg>
    ),
  },
  {
    label: 'Hydrotherapy Cove',
    icon: (hovered) => (
      <svg width="64" height="64" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : 'var(--color-gold)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 38c3 0 5-2 8-2s5 2 8 2 5-2 8-2 5 2 8 2" />
        <path d="M6 44c3 0 5-2 8-2s5 2 8 2 5-2 8-2 5 2 8 2" />
        <rect x="18" y="10" width="6" height="20" rx="3" />
        <rect x="28" y="10" width="6" height="20" rx="3" />
        <path d="M18 20h16" />
      </svg>
    ),
  },
  {
    label: 'Indoor & Outdoor Sports',
    icon: (hovered) => (
      <svg width="64" height="64" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : 'var(--color-gold)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="36" height="24" rx="2" />
        <line x1="26" y1="14" x2="26" y2="38" />
        <circle cx="26" cy="26" r="6" />
        <path d="M8 20h4M8 32h4M40 20h4M40 32h4" />
      </svg>
    ),
  },
  {
    label: '"Living Leaf" Landscapes',
    icon: (hovered) => (
      <svg width="64" height="64" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : 'var(--color-gold)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14l8 12h-4l8 14" />
        <line x1="12" y1="14" x2="12" y2="40" />
        <path d="M28 40h12" />
        <circle cx="36" cy="36" r="4" />
        <path d="M36 32v-8l6-6" />
      </svg>
    ),
  },
]

const AmenityCard = ({ item, index }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 60}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))' : '#ffffff',
        borderRadius: '16px',
        padding: '36px 20px 28px',
        textAlign: 'center',
        border: hovered ? '1px solid var(--color-gold)' : '1px solid var(--color-gold-light)',
        boxShadow: hovered ? '0 10px 30px var(--color-shadow-inner)' : '0 4px 16px rgba(0,0,0,0.04)',
        transition: 'all 0.3s ease',
        cursor: 'default',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
    >
      {/* Icon */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '18px',
      }}>
        {item.icon(hovered)}
      </div>

      {/* Label */}
      <p style={{
        fontFamily: F_JOST, fontWeight: '700', fontSize: '15px',
        color: hovered ? '#ffffff' : '#111827',
        margin: '0 0 12px', letterSpacing: '0.02em',
        transition: 'color 0.3s',
      }}>
        {item.label}
      </p>

      {/* Gold underline */}
      <div style={{
        width: '36px', height: '3px',
        background: hovered ? '#ffffff' : 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
        margin: '0 auto',
        borderRadius: '2px',
      }} />
    </div>
  )
}

const Amenities = ({ setIsOpen }) => {
  return (
    <section id="amenities" style={{ padding: '56px 0', background: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
      <div className="container mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div style={{ marginBottom: '36px', textAlign: 'center' }} data-aos="fade-up">
          <span style={{
            display: 'inline-block', padding: '4px 16px',
            background: 'var(--color-gold-bg)', borderRadius: '50px',
            fontSize: '11px', fontWeight: '700', color: 'var(--color-gold)',
            fontFamily: F_JOST, letterSpacing: '0.1em', textTransform: 'uppercase',
            border: '1px solid var(--color-gold-light)', marginBottom: '10px',
          }}>Godrej Crown Residences — World-Class Amenities</span>
          <h2 style={{
            fontFamily: F_JOST, fontWeight: '800', fontSize: '26px',
            color: '#111827', margin: '0 0 6px', letterSpacing: '-0.01em',
          }}>
            Lifestyle &amp;{' '}
            <span style={{ color: 'var(--color-gold)' }}>Wellness Amenities</span>
          </h2>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', borderRadius: '2px', margin: '8px auto 12px' }} />
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {amenities.map((item, i) => (
            <AmenityCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }} data-aos="fade-up">
          <button onClick={() => setIsOpen(true)} className="btn-gold"
            style={{ padding: '13px 44px', letterSpacing: '0.08em' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '8px', position: 'relative', top: '-1px' }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Enquire Now
          </button>
        </div>

      </div>
    </section>
  )
}

export default Amenities
