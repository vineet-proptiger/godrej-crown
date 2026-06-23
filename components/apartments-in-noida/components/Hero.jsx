


'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { heroImages } from '../../../lib/apartments-in-noida/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), "Open Sans", sans-serif'

const slides = [heroImages.banner, heroImages.banner2]
const INTERVAL = 5500

export default function Hero({ setIsOpen }) {
  const [cur, setCur] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  // Auto-advance
  useEffect(() => {
    startRef.current = Date.now()
    cancelAnimationFrame(rafRef.current)

    function tick() {
      const pct = Math.min((Date.now() - startRef.current) / INTERVAL * 100, 100)
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const timer = setTimeout(() => setCur(p => (p + 1) % slides.length), INTERVAL)
    return () => { clearTimeout(timer); cancelAnimationFrame(rafRef.current) }
  }, [cur])

  const goTo = (idx) => setCur(idx)

  return (
    <>
      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes heroFadeDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroRiseUp   { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes heroSlideUp  { from{opacity:0;transform:translateY(30px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes livepulse {
          0%  { box-shadow:0 0 0 0 rgba(74,222,128,0.6); }
          70% { box-shadow:0 0 0 6px rgba(74,222,128,0); }
          100%{ box-shadow:0 0 0 0 rgba(74,222,128,0); }
        }
      `}</style>

      <div style={{
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        marginTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible',
        background: '#14110D'
      }}>

        {/* ══════════════════════════════
            IMAGE STAGE — top 65%
        ══════════════════════════════ */}
        <div style={{ flex: 1, minHeight: '240px', position: 'relative', overflow: 'hidden' }}>

          {/* Carousel track */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex',
            transform: `translateX(-${cur * 100}%)`,
            transition: 'transform 1s cubic-bezier(0.86,0,0.07,1)',
          }}>
            {slides.map((src, idx) => (
              <div key={idx} style={{
                flex: '0 0 100%', height: '100%', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: '-3%',
                  transform: cur === idx ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 8s ease-out',
                }}>
                  <Image
                    src={src}
                    alt={`Godrej Crown Residences ${idx + 1}`}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    sizes="100vw"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Light bottom vignette */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', zIndex: 3,
            background: 'linear-gradient(to top, rgba(20,17,13,0.82) 0%, rgba(20,17,13,0.18) 60%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          {/* Top nav */}
          <nav
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-3 sm:p-6 lg:p-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(14,11,8,0.65) 0%, transparent 100%)',
              animation: 'heroFadeDown 0.7s 0.2s ease both',
            }}
          >


            {/* New Launch Badge — Right */}
            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto"
              style={{ animation: 'heroFadeDown 0.7s 0.2s ease both' }}
            >
              <span style={{
                fontFamily: F_SANS, fontSize: 'clamp(8px, 2vw, 10px)', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.4)',
                padding: '4px 10px', borderRadius: '2px',
                background: 'rgba(14,11,8,0.5)', backdropFilter: 'blur(8px)',
                whiteSpace: 'nowrap'
              }}
                className="px-2 py-1 sm:px-4 sm:py-1.5"
              >
                ✦ Godrej Golf Links
              </span>
            </div>
          </nav>

          {/* Project title overlaid on image */}
          <div className="px-5 pb-5 sm:px-10 sm:pb-[22px]" style={{
            position: 'absolute', bottom: 0, left: 0, zIndex: 5,
            animation: 'heroRiseUp 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ display: 'block', width: '28px', height: '1px', background: 'var(--color-gold)', opacity: 0.8 }} />
              {/* <span style={{ fontFamily: F_SANS, fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#4ade80' }}>
                Endless Greens, Limitless Luxury
              </span> */}
            </div>
            <h1 style={{
              fontFamily: F_JOST,
              fontSize: 'clamp(22px, 3.4vw, 52px)',
              fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em',
            }}>
              Godrej Crown <span style={{ color: '#ffffff' }}>Residences</span>
            </h1>
            <p style={{
              fontFamily: F_SANS,
              fontSize: 'clamp(11px, 1.2vw, 17px)',
              color: 'rgba(255,255,255,0.85)',
              marginTop: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              letterSpacing: '0.03em'
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Sector 27, Pari Chowk, Greater Noida
            </p>
          </div>

          {/* Pip dots */}
          <div style={{ position: 'absolute', bottom: '20px', right: '40px', zIndex: 6, display: 'flex', gap: '7px' }}>
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => goTo(idx)} style={{
                height: '2px', border: 'none', borderRadius: '1px', cursor: 'pointer', padding: 0,
                width: cur === idx ? '40px' : '22px',
                background: cur === idx ? 'var(--color-gold)' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.4s ease',
              }} />
            ))}
          </div>

          {/* Progress bar removed */}
        </div>

        {/* ══════════════════════════════
            INFO STRIP — bottom 35%
        ══════════════════════════════ */}
        <div className="flex flex-col lg:flex-row" style={{
          flex: '0 0 auto',
          background: 'var(--color-bg, #F8F4EE)',
          animation: 'heroSlideUp 0.8s 0.5s cubic-bezier(0.16,1,0.3,1) both',
        }}>

          {/* A — Project name */}
          <div className="w-full lg:w-[320px]" style={{
            flex: '0 0 auto',
            padding: '24px 32px',
            background: 'var(--color-dark, #14110D)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}>
            <p style={{ fontFamily: F_SANS, fontSize: '13px', lineHeight: 1.6, color: '#ffffff', fontWeight: 300 }}>
              A thoughtfully crafted residential development by{' '}
              <span style={{ color: '#4ade80', fontWeight: 600 }}>Godrej Properties</span> — endless greens, limitless luxury and
              apartments at{' '}
              <span style={{ color: '#4ade80', fontWeight: 600 }}>Greater Noida Yamuna Expressway</span>.
            </p>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
              {[
                { icon: '🎧', label: 'Call\nBack' },
                { icon: '🚗', label: 'Site\nVisit' },
                { icon: '🏷️', label: 'Best\nPrice' },
              ].map((b, i) => (
                <div key={i} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                  padding: '14px 8px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.04)',
                }}>
                  <span style={{ fontSize: '13px', lineHeight: 1 }}>{b.icon}</span>
                  <span style={{ fontFamily: F_SANS, fontSize: '9px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 1.2, whiteSpace: 'pre-line' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* B — Specs 2×2 */}
          <div className="w-full lg:w-[360px]" style={{
            flex: '0 0 auto',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            borderRight: '1px solid rgba(20,17,13,0.1)',
          }}>
            {[
              { val: '100', lbl: 'Acre Golf\nResidences' },
              { val: '50%', lbl: 'Golf Course\nFacing Units' },
              { val: '60m', lbl: 'Wide Road\nAccess' },
              { val: '₹ 2.85 Cr*', lbl: 'Starting\nPrice' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '22px 28px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                borderRight: i % 2 === 0 ? '1px solid rgba(20,17,13,0.1)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(20,17,13,0.1)' : 'none',
                background: 'var(--color-bg, #F8F4EE)',
                cursor: 'default',
              }}>
                <p style={{ fontFamily: F_JOST, fontSize: '20px', fontWeight: 700, color: 'var(--color-dark)', lineHeight: 1, marginBottom: '8px' }}>{s.val}</p>
                <p style={{ fontFamily: F_SANS, fontSize: '9px', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--color-muted, #7A7268)', lineHeight: 1.35, whiteSpace: 'pre-line' }}>{s.lbl}</p>
              </div>
            ))}
          </div>

          {/* C — Advantages */}
          <div style={{
            flex: 1, padding: '16px 24px',
            borderRight: '1px solid rgba(20,17,13,0.1)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px',
          }}>
            <p style={{ fontFamily: F_JOST, fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-gold-dark, #8A6E28)', marginBottom: '8px' }}>
              Project Highlights
            </p>
            {[
              '18-Acre Dedicated 9-Hole Golf Course.',
              '5000+ Trees Within The Development',
              'Adjacent To A 10-Acre Viva Terra Landscape.',
              '90,000+ Sq. Ft. Master Clubhouse With Amenities',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0, opacity: 0.8 }} />
                <span style={{ fontFamily: F_SANS, fontSize: '13.5px', fontWeight: 500, color: 'var(--color-dark)' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* D — Price + CTA */}
          <div className="w-full lg:w-[300px]" style={{
            flex: '0 0 auto', padding: '24px 32px',
            background: 'var(--color-dark, #14110D)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: F_SANS, fontSize: '15px', fontWeight: 700, color: '#FFD700', letterSpacing: '0.05em', marginBottom: '6px' }}>
                EOI Window Now Open With
              </p>
              <p style={{ fontFamily: F_SANS, fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                Priority Allotment
              </p>
              <p className="blink-price" style={{ fontFamily: F_JOST, fontSize: '26px', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>
                ₹10 Lacs*
              </p>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              style={{
                width: '100%', padding: '12px',
                background: 'var(--color-gold)', color: '#fff',
                border: 'none', borderRadius: '6px',
                fontFamily: F_JOST, fontSize: '12.5px', fontWeight: 700,
                letterSpacing: '0.10em', textTransform: 'uppercase', cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(201,168,76,0.4)',
                transition: 'opacity 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Request Brochure
            </button>

          </div>

        </div>
      </div>
    </>
  )
}
