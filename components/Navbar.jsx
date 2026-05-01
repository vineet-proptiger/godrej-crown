'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { logoImages } from '../lib/images'

const PHONE = '9899055893'
const PHONE_DISPLAY = '9899 055 893'

const navLinks = [
  { name: 'HOME',        href: '#' },
  { name: 'OVERVIEW',   href: '#overview' },
  { name: 'HIGHLIGHTS', href: '#highlights' },
  { name: 'GALLERY',    href: '#gallery' },
  { name: 'PRICE LIST', href: '#pricing' },
  { name: 'AMENITIES',  href: '#amenities' },
  { name: 'LOCATION',   href: '#location' },
  { name: 'FLOOR PLANS',href: '#masterplan' },
]

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const Navbar = ({ setIsOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        background: '#1a1a1a',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[88px]">

          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <img
              src={logoImages.main}
              alt="Godrej Crown Residences"
              style={{ height: '52px', width: 'auto', objectFit: 'contain', maxWidth: '220px' }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontFamily: F_JOST,
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#cccccc',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => (e.target.style.color = '#C4952A')}
                onMouseLeave={e => (e.target.style.color = '#cccccc')}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Phone — Desktop */}
          <a
            href={`tel:${PHONE}`}
            className="hidden lg:block"
            style={{
              fontFamily: F_JOST,
              fontSize: '20px',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '0.02em',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.target.style.color = '#C4952A')}
            onMouseLeave={e => (e.target.style.color = '#ffffff')}
          >
            {PHONE_DISPLAY}
          </a>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href={`tel:${PHONE}`}
              style={{ color: '#ffffff', fontFamily: F_JOST, fontSize: '14px', fontWeight: '700' }}
            >
              {PHONE_DISPLAY}
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: '#fff', padding: '4px', background: 'none', border: 'none' }}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: '#111111', borderTop: '1px solid #2a2a2a' }}>
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '14px 24px',
                fontFamily: F_JOST,
                fontSize: '13px',
                fontWeight: '600',
                color: '#cccccc',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderBottom: '1px solid #1f1f1f',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C4952A'; e.currentTarget.style.background = '#1f1f1f' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#cccccc'; e.currentTarget.style.background = 'transparent' }}
            >
              {link.name}
            </a>
          ))}
          <div style={{ padding: '16px 24px' }}>
            <button
              onClick={() => { setIsOpen(true); setMobileOpen(false) }}
              className="btn-gold w-full"
              style={{ padding: '12px', fontSize: '13px' }}
            >
              ENQUIRE NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
