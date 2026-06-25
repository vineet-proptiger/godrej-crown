'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'

import { PROJECT_NAME } from '../../lib/config'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'

const Overview = dynamic(() => import('../../components/Overview'), { ssr: true })
const Highlights = dynamic(() => import('../../components/Highlights'), { ssr: true })
const Pricing = dynamic(() => import('../../components/Pricing'), { ssr: true })
const Amenities = dynamic(() => import('../../components/Amenities'), { ssr: true })
const Location = dynamic(() => import('../../components/Location'), { ssr: true })
const MasterPlan = dynamic(() => import('../../components/MasterPlan'), { ssr: true })
const Downloads = dynamic(() => import('../../components/Downloads'), { ssr: true })
const AboutGodrej = dynamic(() => import('../../components/AboutGodrej'), { ssr: true })
const VirtualTour = dynamic(() => import('../../components/VirtualTour'), { ssr: true })
const Footer = dynamic(() => import('../../components/Footer'), { ssr: true })

const Gallery = dynamic(() => import('../../components/Gallery'), { ssr: false })
const EnquireModal = dynamic(() => import('../../components/EnquireModal'), { ssr: false })
const AosInit = dynamic(() => import('../../components/AosInit'), { ssr: false })

export default function NewLaunch() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="relative min-h-screen bg-white">
      <AosInit />
      <Navbar setIsOpen={setIsOpen} />
      <Hero />
      <Overview setIsOpen={setIsOpen} />
      <Highlights setIsOpen={setIsOpen} />
      <Gallery setIsOpen={setIsOpen} />
      <Pricing setIsOpen={setIsOpen} />
      <Amenities setIsOpen={setIsOpen} />
      <Location />
      <MasterPlan setIsOpen={setIsOpen} />
      <Downloads setIsOpen={setIsOpen} />
      <AboutGodrej />
      <VirtualTour setIsOpen={setIsOpen} />
      <Footer />
      <EnquireModal isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Floating vertical Enquire tab — desktop only */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex btn-floating-tab"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          letterSpacing: '2px',
        }}
      >
        ENQUIRE NOW
      </button>

      {/* Mobile sticky bottom bar (WhatsApp icon removed for new-launch) */}
      <div className="sticky-bottom-bar">
        <a
          id="mobile-call"
          href="tel:+919718344024"
          className="flex-1 flex flex-col items-center justify-center py-2 gap-1 text-white"
          style={{ background: '#1a1a1a', borderRight: '1px solid #333' }}
        >
          <svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.04em', fontFamily: 'var(--font-jost)' }}>Call Us</span>
        </a>
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-1 text-white"
          style={{ background: '#C4952A' }}
        >
          <svg width="22" height="22" fill="none" stroke="#ffffff" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.04em', fontFamily: 'var(--font-jost)' }}>ENQUIRE</span>
        </button>
      </div>

      <div className="h-12 lg:hidden" />
    </main>
  )
}
