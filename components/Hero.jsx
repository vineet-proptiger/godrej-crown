'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { heroImages } from '../lib/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const slides = [heroImages.banner, heroImages.banner2]

const Hero = ({ setIsOpen }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '560px',
        overflow: 'hidden',
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {/* ── Background image carousel ── */}
      {slides.map((src, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute', inset: 0,
            opacity: current === idx ? 1 : 0,
            transition: 'opacity 1s ease',
            zIndex: 0,
          }}
        >
          <Image
            src={src}
            alt={`Godrej Crown Residences ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── Dark gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.10) 100%)',
      }} />

      {/* ── Center-bottom text ── */}
      <div style={{
        position: 'absolute', bottom: '120px', left: 0, right: 0,
        zIndex: 2, textAlign: 'center', padding: '0 16px',
      }}>
        <h1 style={{
          fontFamily: F_JOST,
          fontSize: 'clamp(32px, 5.5vw, 68px)',
          fontWeight: '800',
          color: '#ffffff',
          margin: '0 0 6px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          GODREJ CROWN RESIDENCES
        </h1>
        <p style={{
          fontFamily: F_JOST,
          fontSize: 'clamp(13px, 1.8vw, 20px)',
          fontWeight: '500',
          color: '#C4952A',
          margin: '0 0 14px',
          letterSpacing: '0.08em',
          textShadow: '0 1px 8px rgba(0,0,0,0.5)',
        }}>
          ( Godrej Golf Links )
        </p>

        {/* Location */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{
            fontFamily: F_SANS, fontSize: '16px', color: '#ffffff',
            fontWeight: '500', letterSpacing: '0.04em',
          }}>
            Sector 49, Gurgaon
          </span>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div style={{
        position: 'absolute', bottom: '88px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', gap: '8px',
      }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: current === idx ? '28px' : '8px',
              height: '4px',
              background: current === idx ? '#C4952A' : 'rgba(255,255,255,0.5)',
              border: 'none', borderRadius: '2px', cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* ── Bottom info bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        background: 'rgba(26,26,26,0.92)',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        borderTop: '1px solid rgba(196,149,42,0.3)',
      }}>
        {[
          'UNDER CONSTRUCTION',
          '3 & 4 BHK APARTMENTS',
          '₹ 4.50 CR* ONWARDS',
        ].map((text, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              padding: '18px 12px',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          >
            <span style={{
              fontFamily: F_JOST,
              fontSize: 'clamp(11px, 2vw, 15px)',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero
