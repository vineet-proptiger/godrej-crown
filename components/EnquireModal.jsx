'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { getGeo, buildTrackingFields } from '../lib/formMeta'

const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const fieldStyle = {
  width: '100%',
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '3px',
  padding: '11px 14px',
  color: '#fff',
  fontSize: '14px',
  fontFamily: F_SANS,
  outline: 'none',
  caretColor: '#C4952A',
}

const EnquireModal = ({ isOpen, setIsOpen }) => {
  const autoTriggered = useRef(false)
  const intervalRef = useRef(null)

  const [form, setForm] = useState({ fullname: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [ipAddress, setIpAddress] = useState('')
  const [geoAddress, setGeoAddress] = useState(null)

  /* ── Auto-trigger (same as before) ── */
  useEffect(() => {
    if (autoTriggered.current) return
    const initial = setTimeout(() => {
      autoTriggered.current = true
      setIsOpen(true)
      intervalRef.current = setInterval(() => setIsOpen(true), 20000)
    }, 10000)
    return () => {
      clearTimeout(initial)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [setIsOpen])

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* ── Geo fetch ── */
  useEffect(() => {
    getGeo().then(d => {
      if (!d) return
      setIpAddress(d.ip || '')
      setGeoAddress({ city: d.city, region: d.region, postal_code: d.postal_code, country: d.country })
    })
  }, [])

  const handle = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'phone' ? value.replace(/\D/g, '') : value }))
  }

  /* ── Submit — identical API call as LeadForm ── */
  const submit = async (e) => {
    e.preventDefault()
    if (!/^\d{10}$/.test(form.phone)) { setError('Please enter a valid 10-digit mobile number.'); return }
    setError(''); setLoading(true)
    const tracking = buildTrackingFields(ipAddress, geoAddress)
    const payload = new FormData()
    payload.append('fullname', form.fullname)
    payload.append('email', form.email)
    payload.append('phone', form.phone)
    payload.append('message', '')
    payload.append('website', '')          // honeypot — keep empty
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', 'Popup Modal')
    payload.append('sheet_name', SHEET_NAME)
    payload.append('secret', SECRET_KEY)
    payload.append('city', CITY_DISPLAY)
    Object.entries(tracking).forEach(([k, v]) => payload.append(k, v))
    try {
      const res = await fetch(API_ENDPOINT, { method: 'POST', body: payload })
      const data = await res.json()
      if (data.status) {
        setSuccess(true)
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || []
          const nameParts = form.fullname.trim().split(' ')
          window.dataLayer.push({
            event: 'lead_submit_success', form_name: 'Popup Modal',
            user_data: {
              email: form.email.trim() || undefined, phone: form.phone,
              first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || '',
              address: geoAddress,
            },
          })
        }
      } else {
        setError(data.msg || 'Submission failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)' }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          background: '#111111',
          width: '100%',
          maxWidth: '480px',
          borderRadius: '4px',
          border: '2px solid rgba(255,255,255,0.55)',
          position: 'relative',
          padding: '36px 28px 28px',
          maxHeight: '95vh',
          overflowY: 'auto',
          animation: 'slideInRight 0.38s cubic-bezier(0.22,1,0.36,1) forwards',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Close button ── */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute', top: '14px', right: '14px',
            background: '#fff', border: 'none', cursor: 'pointer',
            width: '26px', height: '26px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '17px', fontWeight: '700', color: '#111',
            lineHeight: 1, borderRadius: '2px',
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* ── Heading ── */}
        <h2 style={{
          color: '#fff', fontFamily: F_JOST, fontWeight: '700',
          fontSize: '22px', margin: '0 0 24px', letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          ENQUIRE NOW
        </h2>

        {/* ── Success state ── */}
        {success ? (
          <div style={{ textAlign: 'center', padding: '28px 0' }}>
            <div style={{
              width: '54px', height: '54px', borderRadius: '50%',
              background: 'rgba(196,149,42,0.15)', border: '2px solid #C4952A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}>
              <svg width="24" height="24" fill="none" stroke="#C4952A" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p style={{ color: '#fff', fontFamily: F_JOST, fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>
              Thank You!
            </p>
            <p style={{ color: '#999', fontFamily: F_SANS, fontSize: '13px' }}>
              Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={submit}>

            {/* Name */}
            <div style={{ marginBottom: '20px' }}>
              <input
                name="fullname" required value={form.fullname} onChange={handle}
                placeholder="Enter your name"
                style={fieldStyle}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <input
                name="email" type="email" value={form.email} onChange={handle}
                placeholder="Enter your email (Optional)"
                style={fieldStyle}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '20px' }}>
              <input
                name="phone" required value={form.phone} onChange={handle}
                placeholder="Enter your phone number" maxLength={10}
                style={fieldStyle}
              />
            </div>

            {error && (
              <p style={{
                color: '#f87171', fontSize: '12px', fontFamily: F_SANS,
                marginBottom: '14px',
              }}>
                {error}
              </p>
            )}

            {/* Consent */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '20px' }}>
              <input
                type="checkbox" id="popup-privacy" required defaultChecked
                style={{ accentColor: '#C4952A', marginTop: '2px', flexShrink: 0 }}
              />
              <label htmlFor="popup-privacy" style={{ fontSize: '11px', color: '#888', fontFamily: F_SANS, lineHeight: 1.6, cursor: 'pointer' }}>
                I agree to receive updates as per the{' '}
                <Link href="/privacy-policy" style={{ color: '#C4952A', textDecoration: 'underline' }}>Privacy Policy</Link>.
              </label>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                style={{
                  background: '#C4952A', color: '#fff', border: 'none',
                  padding: '13px 22px', fontFamily: F_JOST, fontWeight: '700',
                  fontSize: '13px', letterSpacing: '0.1em', cursor: loading ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase', borderRadius: '3px',
                  opacity: loading ? 0.75 : 1, flexShrink: 0,
                  transition: 'opacity 0.2s',
                }}
              >
                {loading ? 'SENDING...' : 'SUBMIT'}
              </button>

              <span style={{ color: '#666', fontFamily: F_SANS, fontSize: '13px', flexShrink: 0 }}>
                OR
              </span>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/919718344024?text=Hi%20I%20am%20interested%20in%20${encodeURIComponent(PROJECT_NAME)}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  background: '#25D366', color: '#fff',
                  padding: '13px 0', fontFamily: F_JOST, fontWeight: '700',
                  fontSize: '13px', letterSpacing: '0.08em',
                  textTransform: 'uppercase', borderRadius: '3px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '7px', textDecoration: 'none', flex: 1,
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WHATSAPP
              </a>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}

export default EnquireModal
