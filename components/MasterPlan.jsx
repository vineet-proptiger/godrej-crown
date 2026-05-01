'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { masterplanImages } from '../lib/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const plans = [
  { label: '3 BHK XL', img: masterplanImages.floorPlan },
  { label: '3 BHK',    img: masterplanImages.masterPlan },
  { label: '4 BHK',    img: masterplanImages.floorPlan },
  { label: '4 BHK + U',img: masterplanImages.masterPlan },
]

const MasterPlan = ({ setIsOpen }) => {
  const [page, setPage] = useState(0)

  // show 2 at a time
  const pairs = []
  for (let i = 0; i < plans.length; i += 2) pairs.push([plans[i], plans[i + 1]].filter(Boolean))
  const current = pairs[page] || pairs[0]

  return (
    <section id="masterplan" style={{ padding: '72px 0', background: '#ffffff' }}>
      <div className="container mx-auto px-4 md:px-8">

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
          FLOOR PLANS
        </h2>

        {/* Two side-by-side floor plans */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}
          className="grid-cols-1 sm:grid-cols-2"
          data-aos="fade-up"
        >
          {current.map((plan, i) => (
            <div
              key={i}
              onClick={() => setIsOpen(true)}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Blurred floor plan image */}
              <Image
                src={plan.img} alt={plan.label} fill
                className="object-cover"
                style={{ filter: 'blur(6px)', transform: 'scale(1.06)' }}
                sizes="(max-width:768px) 100vw, 50vw"
              />

              {/* Light overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(255,255,255,0.28)',
              }} />

              {/* Gold label — centered */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 5,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  background: '#C4952A',
                  padding: '10px 28px',
                  borderRadius: '3px',
                }}>
                  <span style={{
                    fontFamily: F_JOST, fontWeight: '700', fontSize: '16px',
                    color: '#ffffff', letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    {plan.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '28px' }}>
          {pairs.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: page === i ? '#C4952A' : '#ccc',
                border: 'none', cursor: 'pointer',
                transition: 'background 0.3s, transform 0.3s',
                transform: page === i ? 'scale(1.25)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '36px' }} data-aos="fade-up">
          <p style={{
            fontFamily: F_SANS, fontSize: '13px', color: '#666',
            margin: '0 0 16px', letterSpacing: '0.02em',
          }}>
            Register to receive detailed floor plans directly to your inbox.
          </p>
          <button onClick={() => setIsOpen(true)} className="btn-gold" style={{ padding: '13px 44px' }}>
            UNLOCK FLOOR PLAN
          </button>
        </div>

      </div>
    </section>
  )
}

export default MasterPlan
