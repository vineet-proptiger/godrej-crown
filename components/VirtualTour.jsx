'use client'
import React from 'react'
import Image from 'next/image'
import { virtualTourImage } from '../lib/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const VirtualTour = ({ setIsOpen }) => {
  return (
    <section 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '80vh', 
        minHeight: '400px',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
      onClick={() => setIsOpen(true)}
      data-aos="fade-up"
    >
      <Image
        src={virtualTourImage}
        alt="Godrej Crown Virtual Tour"
        fill
        className="object-cover"
        style={{ filter: 'brightness(0.85)' }}
      />
      
      {/* Dark Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.25)',
      }} />

      {/* Center Content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 5, gap: '24px'
      }}>
        {/* Play Button */}
        <div style={{
          width: 'clamp(80px, 10vw, 110px)',
          height: 'clamp(80px, 10vw, 110px)',
          background: '#fff',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '4px solid #C4952A',
          boxShadow: '0 0 40px rgba(0,0,0,0.4)',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="45" height="45" viewBox="0 0 24 24" fill="#C4952A">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Text */}
        <h2 style={{
          fontFamily: F_JOST,
          fontWeight: '800',
          fontSize: 'clamp(22px, 4vw, 44px)',
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          textShadow: '0 2px 15px rgba(0,0,0,0.6)',
          margin: 0
        }}>
          VIRTUAL TOUR
        </h2>
      </div>
    </section>
  )
}

export default VirtualTour
