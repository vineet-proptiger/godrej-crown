'use client'
import React, { useState } from 'react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const amenities = [
  {
    label: 'Swimming Pool',
    icon: (hovered) => (
      <svg width="72" height="72" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : '#1a1a1a'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 38c3 0 5-2 8-2s5 2 8 2 5-2 8-2 5 2 8 2" />
        <path d="M6 44c3 0 5-2 8-2s5 2 8 2 5-2 8-2 5 2 8 2" />
        <rect x="18" y="10" width="6" height="20" rx="3" />
        <rect x="28" y="10" width="6" height="20" rx="3" />
        <path d="M18 20h16" />
      </svg>
    ),
  },
  {
    label: 'Yoga',
    icon: (hovered) => (
      <svg width="72" height="72" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : '#1a1a1a'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="26" cy="12" r="4" />
        <path d="M26 16v12" />
        <path d="M18 22l8 4 8-4" />
        <path d="M26 28l-6 8M26 28l6 8" />
        <line x1="10" y1="44" x2="42" y2="44" />
      </svg>
    ),
  },
  {
    label: 'Mini Theatre',
    icon: (hovered) => (
      <svg width="72" height="72" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : '#1a1a1a'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="36" height="24" rx="2" />
        <path d="M8 20h36M8 32h36M26 14v24" />
        <path d="M14 20v12M38 20v12" />
      </svg>
    ),
  },
  {
    label: "Kid's Play Area",
    icon: (hovered) => (
      <svg width="72" height="72" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : '#1a1a1a'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14l8 12h-4l8 14" />
        <line x1="12" y1="14" x2="12" y2="40" />
        <path d="M28 40h12" />
        <circle cx="36" cy="36" r="4" />
        <path d="M36 32v-8l6-6" />
      </svg>
    ),
  },
  {
    label: 'GYM',
    icon: (hovered) => (
      <svg width="72" height="72" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : '#1a1a1a'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="26" x2="44" y2="26" />
        <rect x="4"  y="22" width="8"  height="8" rx="2" />
        <rect x="40" y="22" width="8"  height="8" rx="2" />
        <rect x="14" y="18" width="6"  height="16" rx="3" />
        <rect x="32" y="18" width="6"  height="16" rx="3" />
      </svg>
    ),
  },
  {
    label: 'Sports Area',
    icon: (hovered) => (
      <svg width="72" height="72" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : '#1a1a1a'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="36" height="24" rx="2" />
        <line x1="26" y1="14" x2="26" y2="38" />
        <circle cx="26" cy="26" r="6" />
        <path d="M8 20h4M8 32h4M40 20h4M40 32h4" />
      </svg>
    ),
  },
  {
    label: 'Jogging Track',
    icon: (hovered) => (
      <svg width="72" height="72" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : '#1a1a1a'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="30" cy="12" r="4" />
        <path d="M24 20l4 6 6-4" />
        <path d="M28 26l-4 8" />
        <path d="M24 34l-4 4M32 26l4 8" />
        <path d="M10 44h32" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    label: 'Clubhouse',
    icon: (hovered) => (
      <svg width="72" height="72" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : '#1a1a1a'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 26L26 12l16 14" />
        <rect x="14" y="26" width="24" height="16" />
        <rect x="21" y="32" width="10" height="10" />
        <line x1="10" y1="26" x2="42" y2="26" />
      </svg>
    ),
  },
  {
    label: 'Multipurpose Hall',
    icon: (hovered) => (
      <svg width="72" height="72" viewBox="0 0 52 52" fill="none" stroke={hovered ? '#ffffff' : '#1a1a1a'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="16" width="36" height="24" rx="2" />
        <path d="M8 24h36" />
        <path d="M18 24v16M34 24v16" />
        <circle cx="26" cy="20" r="2" />
      </svg>
    ),
  },
]

const VISIBLE = 3

const AmenityCard = ({ item, index, start }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      key={`${start}-${index}`}
      data-aos="fade-up"
      data-aos-delay={index * 60}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#111111' : '#ffffff',
        borderRadius: '4px',
        padding: '36px 20px 28px',
        textAlign: 'center',
        border: hovered ? '1px solid #111' : '1px solid #e8e8e8',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.35)' : '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
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
        fontFamily: F_JOST, fontWeight: '600', fontSize: '14px',
        color: hovered ? '#ffffff' : '#1a1a1a',
        margin: '0 0 12px', letterSpacing: '0.02em',
        transition: 'color 0.3s',
      }}>
        {item.label}
      </p>

      {/* Gold underline */}
      <div style={{
        width: '36px', height: '2px',
        background: '#C4952A',
        margin: '0 auto',
        borderRadius: '1px',
      }} />
    </div>
  )
}

const Amenities = ({ setIsOpen }) => {
  const [start, setStart] = useState(0)

  const prev = () => setStart(s => (s - 1 + amenities.length) % amenities.length)
  const next = () => setStart(s => (s + 1) % amenities.length)

  const visible = Array.from({ length: VISIBLE }, (_, i) => amenities[(start + i) % amenities.length])

  return (
    <section id="amenities" style={{ padding: '72px 0', background: '#f5f5f5' }}>
      <div style={{ padding: '0 clamp(16px, 4vw, 48px)' }}>

        {/* Heading */}
        <h2
          data-aos="fade-up"
          style={{
            fontFamily: F_JOST, fontWeight: '800',
            fontSize: 'clamp(28px,4vw,40px)',
            color: '#1a1a1a', textAlign: 'center',
            textTransform: 'uppercase', letterSpacing: '0.04em',
            margin: '0 0 48px',
          }}
        >
          AMENITIES
        </h2>

        {/* Slider row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* Left arrow */}
          <button
            onClick={prev}
            style={{
              flexShrink: 0, width: '44px', height: '44px',
              background: '#C4952A', border: 'none', borderRadius: '2px',
              color: '#fff', fontSize: '22px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#9A7518')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C4952A')}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Cards */}
          <div style={{
            flex: 1,
            display: 'grid',
            gap: '16px',
          }}
            className="grid grid-cols-1 sm:grid-cols-3">
            {visible.map((item, i) => (
              <AmenityCard key={`${start}-${i}`} item={item} index={i} start={start} />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            style={{
              flexShrink: 0, width: '44px', height: '44px',
              background: '#C4952A', border: 'none', borderRadius: '2px',
              color: '#fff', fontSize: '22px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#9A7518')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C4952A')}
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
          {amenities.map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(i)}
              style={{
                width: start === i ? '24px' : '8px',
                height: '4px',
                background: start === i ? '#C4952A' : '#ccc',
                border: 'none', borderRadius: '2px', cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Amenities
