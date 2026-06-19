'use client'
import Image from 'next/image'
import { heroImages } from '../lib/images'
import { Check } from 'lucide-react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const Hero = () => {

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
      {/* ── Background image ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src={heroImages.desktop}
          alt="Godrej Crown Residences"
          fill
          className="hidden lg:block object-cover"
          priority
          sizes="100vw"
          quality={100}
        />
        <Image
          src={heroImages.tab}
          alt="Godrej Crown Residences"
          fill
          className="hidden md:block lg:hidden object-cover"
          priority
          sizes="100vw"
          quality={100}
        />
        <Image
          src={heroImages.mobile}
          alt="Godrej Crown Residences"
          fill
          className="block md:hidden object-cover"
          priority
          sizes="100vw"
          quality={100}
        />
      </div>

      {/* ── Dark gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)',
      }} />

      {/* ── Center-bottom text ── */}
      <div
        className="absolute left-0 right-0 z-[2] text-center px-6 bottom-[180px] md:bottom-[90px] lg:bottom-[110px]"
        style={{ zIndex: 2 }}>
        {/* Project Tagline */}
        <div style={{ marginBottom: '14px' }}>
          <span style={{
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1.5px solid #C4952A',
            padding: '7px 28px',
            borderRadius: '50px',
            color: '#C4952A',
            fontFamily: F_JOST,
            fontSize: 'clamp(12px, 1.4vw, 15px)',
            fontWeight: '800',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            display: 'inline-block',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
          }}>
            Godrej Golf Links
          </span>
        </div>

        <h1 style={{
          fontFamily: F_JOST,
          fontSize: 'clamp(22px, 3.2vw, 46px)',
          fontWeight: '800',
          color: '#ffffff',
          margin: '0 0 8px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          GODREJ CROWN RESIDENCES
        </h1>

        {/* Location — shared wrapper */}
        <div style={{ display: 'block', textAlign: 'center' }}>
          {/* Location */}
          <div className="location-strip" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span style={{
              fontFamily: F_SANS, fontSize: 'clamp(13px, 1.8vw, 16px)', color: '#ffffff',
              fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase',
              textAlign: 'center', width: '100%'
            }}>
              Endless Greens, Limitless Luxury | Greater Noida Yamuna Expressway | Jewar Int. Airport
            </span>
          </div>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      {/* <div style={{
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
      </div> */}

      {/* ── Bottom info bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
      }}>
        {/* USP row */}
        <div style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          borderTop: '1px solid rgba(196,149,42,0.3)',
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: '3px',
        }}>
          {[
            '50% Golf Course Facing Units',
            '60m Wide Road Access',
            '100 Acre Golf Residences',
          ].map((point, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '8px', padding: '10px 12px',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#C4952A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span style={{
                fontFamily: F_SANS, fontSize: 'clamp(10px, 1.5vw, 13px)',
                fontWeight: '600', color: '#ffffff', letterSpacing: '0.02em',
              }}>
                {point}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(38,38,38,0.85) 100%)',
          backdropFilter: 'blur(12px)',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          margin: '0 auto',
          maxWidth: '1200px',
        }}>
          {[
            'PRE - LAUNCH EXCLUSIVE RESIDENCES',
            'EOI AMOUNT STARTS AT ₹ 10 Lacs*',
            'Starting From ₹ 2.85 Cr*',
          ].map((text, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: '14px 12px',
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
