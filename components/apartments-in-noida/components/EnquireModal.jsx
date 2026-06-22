'use client'
import React, { useEffect, useRef } from 'react'
// import Image from 'next/image'
import { X } from 'lucide-react'
import LeadForm from './LeadForm'
// import { popupImage } from '../../../lib/apartments-in-noida/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const EnquireModal = ({ isOpen, setIsOpen }) => {
  const autoTriggered = useRef(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (autoTriggered.current) return
    const initial = setTimeout(() => {
      autoTriggered.current = true
      setIsOpen(true)
      intervalRef.current = setInterval(() => setIsOpen(true), 30000)
    }, 30000)
    return () => {
      clearTimeout(initial)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [setIsOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative bg-white w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row"
        style={{
          maxWidth: '400px',
          width: '92vw',
          maxHeight: '90vh',
          animation: 'slideInRight 0.45s cubic-bezier(0.22,1,0.36,1) forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT - Image */}
        {/* <div className="hidden sm:block sm:w-[44%] shrink-0 relative" style={{ background: '#0d1117', minHeight: '100%' }}>
          <Image src={popupImage} alt="Godrej Crown Residences" fill className="object-cover" sizes="(max-width: 768px) 0vw, 45vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <p className="text-[10px] font-semibold tracking-[3px] uppercase opacity-80 mb-1" style={{ fontFamily: F_SANS, color: 'var(--color-gold)' }}>Godrej Crown Residences</p>
            <p style={{ fontFamily: F_JOST, fontSize: '13px', fontWeight: 500, opacity: 0.85 }}>3 &amp; 4 BHK · Starting ₹2.85 Cr* · Greater Noida</p>
          </div>
        </div> */}

        {/* RIGHT - Form */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 z-10 text-gray-500 hover:text-gray-900 transition-colors bg-white rounded-full w-8 h-8 flex items-center justify-center shadow border border-gray-100"
          >
            <X size={16} />
          </button>

          {/* Mobile strip */}
          {/* <div className="sm:hidden w-full h-56 relative shrink-0">
            <Image src={popupImage} alt="Godrej Crown Residences" fill className="object-cover" style={{ objectPosition: 'top' }} sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 flex flex-col justify-end p-5">
              <div className="bg-black/20 backdrop-blur-md p-3 rounded-lg border border-white/10">
              <p className="text-[9px] uppercase tracking-[2px] opacity-80" style={{ fontFamily: F_SANS }}>Godrej Crown Residences</p>
              <p className="text-[11px] font-medium opacity-85" style={{ fontFamily: F_JOST }}>3 &amp; 4 BHK · Starting ₹2.85 Cr* · Greater Noida</p>
            </div>
          </div> */}

          <div className="p-4 sm:p-5 pt-8 sm:pt-10 flex flex-col justify-center flex-1">
            <div className="text-center mb-3">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug tracking-tight" style={{ fontFamily: F_JOST }}>
                Book a free site visit
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
                <span style={{
                  display: 'block', width: '28px', height: '2px',
                  background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                  borderRadius: '2px',
                }} />
              </div>
            </div>

            <LeadForm formName="Popup Modal" btnText="Submit Details" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnquireModal
