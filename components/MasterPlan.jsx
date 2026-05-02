'use client'
import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    const timer = setInterval(() => {
      setPage(prev => (prev + 1) % pairs.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [pairs.length])

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

        {/* Sliding Carousel Wrapper */}
        <div style={{ overflow: 'hidden', margin: '0 -10px' }} data-aos="fade-up">
          <div
            style={{
              display: 'flex',
              transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(-${page * 100}%)`,
            }}
          >
            {pairs.map((pair, idx) => (
              <div
                key={idx}
                style={{
                  flex: '0 0 100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '20px',
                  padding: '10px',
                }}
              >
                {pair.map((plan, i) => (
                  <div
                    key={i}
                    onClick={() => setIsOpen(true)}
                    style={{
                      position: 'relative',
                      aspectRatio: '16/10',
                      border: '2px solid #1a1a1a',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Blurred floor plan image */}
                    <Image
                      src={plan.img} alt={plan.label} fill
                      className="object-cover"
                      style={{ filter: 'blur(5px)', transform: 'scale(1.04)' }}
                      sizes="(max-width:768px) 100vw, 50vw"
                    />

                    {/* Light overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(255,255,255,0.3)',
                    }} />

                    {/* Gold label — centered */}
                    <div style={{
                      position: 'absolute', inset: 0, zIndex: 5,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{
                        background: '#C4952A',
                        padding: '10px 24px',
                        borderRadius: '4px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }}>
                        <span style={{
                          fontFamily: F_JOST, fontWeight: '700', fontSize: '15px',
                          color: '#ffffff', letterSpacing: '0.04em', textTransform: 'uppercase',
                        }}>
                          {plan.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dot pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '28px' }}>
          {pairs.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: page === i ? '#1a1a1a' : '#bbbbbb',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
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
