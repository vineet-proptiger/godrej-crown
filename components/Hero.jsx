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
        position: 'absolute', bottom: '160px', left: 0, right: 0,
        zIndex: 2, textAlign: 'center', padding: '0 16px',
      }}>
        {/* Project Tagline */}
        <div style={{ marginBottom: '12px' }}>
          <span style={{
            background: 'rgba(196,149,42,0.12)',
            border: '1px solid rgba(196,149,42,0.4)',
            padding: '6px 24px',
            borderRadius: '50px',
            color: '#C4952A',
            fontFamily: F_JOST,
            fontSize: 'clamp(10px, 1.2vw, 13px)',
            fontWeight: '700',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'inline-block',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            Godrej Golf Links
          </span>
        </div>

        <h1 style={{
          fontFamily: F_JOST,
          fontSize: 'clamp(22px, 3.2vw, 46px)',
          fontWeight: '800',
          color: '#ffffff',
          margin: '0 0 16px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          GODREJ CROWN RESIDENCES
        </h1>

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
        position: 'absolute', bottom: '110px', left: '50%',
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
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(38,38,38,0.85) 100%)',
          backdropFilter: 'blur(12px)',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '16px 16px 0 0',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          margin: '0 auto',
          maxWidth: '1200px',
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
                padding: '24px 12px',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}
            >
              <span style={{
                fontFamily: F_JOST,
                fontSize: 'clamp(11px, 1.8vw, 16px)',
                fontWeight: '700',
                color: '#ffffff',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
