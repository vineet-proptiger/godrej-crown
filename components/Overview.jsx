'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { getGeo, buildTrackingFields } from '../lib/formMeta'
import { overviewImage } from '../lib/images'
import Link from 'next/link'

const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const stats = [
  { value: '55 of 2023#', label: 'RERA No.' },
  { value: '10 Acres*',   label: 'Total Land Area' },
  { value: '500 Homes*',  label: 'No. of Units' },
  { value: '05 Towers*',  label: 'No. of Towers' },
  { value: 'G + 30 Floors*', label: 'No. of Floors' },
  { value: '3 & 4 BHK',  label: 'Unit Variants' },
]

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  border: '1.5px solid #e5e7eb',
  borderRadius: '6px',
  outline: 'none',
  fontSize: '14px',
  color: '#374151',
  background: '#ffffff',
  fontFamily: F_SANS,
  transition: 'border-color 0.25s, box-shadow 0.25s',
}

const EarlyForm = () => {
  const [form, setForm]         = useState({ fullname: '', phone: '', email: '' })
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')
  const [ipAddress, setIp]      = useState('')
  const [geoAddress, setGeo]    = useState(null)
  const [focused, setFocused]   = useState('')

  useEffect(() => {
    getGeo().then(d => {
      if (!d) return
      setIp(d.ip || '')
      setGeo({ city: d.city, region: d.region, postal_code: d.postal_code, country: d.country })
    })
  }, [])

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    if (form.phone.replace(/\D/g, '').length < 10) { setError('Enter valid 10-digit number'); return }
    setError(''); setLoading(true)
    const tracking = buildTrackingFields(ipAddress, geoAddress)
    const payload  = new FormData()
    payload.append('fullname', form.fullname)
    payload.append('email', form.email)
    payload.append('phone', form.phone)
    payload.append('website', '')
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', 'Overview Form')
    payload.append('sheet_name', SHEET_NAME)
    payload.append('secret', SECRET_KEY)
    payload.append('city', CITY_DISPLAY)
    Object.entries(tracking).forEach(([k, v]) => payload.append(k, v))
    try {
      const res  = await fetch(API_ENDPOINT, { method: 'POST', body: payload })
      const data = await res.json()
      if (data.status) setSuccess(true)
      else setError(data.msg || 'Something went wrong.')
    } catch { setError('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  if (success) return (
    <div style={{ textAlign: 'center', padding: '28px 0' }}>
      <div style={{
        width: '52px', height: '52px', borderRadius: '50%',
        background: 'rgba(196,149,42,0.12)', border: '2px solid #C4952A',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
      }}>
        <svg width="24" height="24" fill="none" stroke="#C4952A" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p style={{ fontWeight: '700', fontSize: '17px', color: '#1a1a1a', fontFamily: F_JOST }}>Thank You!</p>
      <p style={{ color: '#666', fontSize: '13px', marginTop: '6px', fontFamily: F_SANS }}>Our team will contact you shortly.</p>
    </div>
  )

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <input
        name="fullname" required value={form.fullname} onChange={handle}
        placeholder="Full Name *"
        onFocus={() => setFocused('fullname')} onBlur={() => setFocused('')}
        style={{ ...inputStyle, borderColor: focused === 'fullname' ? '#C4952A' : '#e5e7eb' }}
      />
      <input
        name="email" value={form.email} onChange={handle}
        placeholder="Email Address (optional)"
        onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
        style={{ ...inputStyle, borderColor: focused === 'email' ? '#C4952A' : '#e5e7eb' }}
      />
      <input
        name="phone" required value={form.phone} onChange={handle}
        placeholder="Mobile Number *" maxLength={10}
        onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
        style={{ ...inputStyle, borderColor: focused === 'phone' ? '#C4952A' : '#e5e7eb' }}
      />
      {error && <p style={{ color: '#ef4444', fontSize: '12px', fontFamily: F_SANS }}>{error}</p>}
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
        <input type="checkbox" required defaultChecked style={{ accentColor: '#C4952A', marginTop: '3px', flexShrink: 0 }} />
        <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: F_SANS, lineHeight: 1.6 }}>
          I agree to the <Link href="/privacy-policy" style={{ color: '#C4952A', textDecoration: 'underline' }}>Privacy Policy</Link>.
        </span>
      </label>
      <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', padding: '13px' }}>
        {loading ? 'SUBMITTING...' : 'BOOK FREE SITE VISIT'}
      </button>
    </form>
  )
}

const Overview = () => (
  <section id="overview" style={{ padding: '72px 0', background: '#f5f5f5' }}>
    <div className="container mx-auto px-4 md:px-8">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

        {/* LEFT — text + stats */}
        <div className="w-full lg:w-1/2" data-aos="fade-right">

          <h2 style={{
            fontFamily: F_JOST, fontWeight: '800', fontSize: 'clamp(28px,4vw,40px)',
            color: '#1a1a1a', margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.02em',
          }}>
            OVERVIEW
          </h2>

          <p style={{
            fontFamily: F_SANS, fontSize: '14.5px', color: '#444444',
            lineHeight: 1.9, margin: '0 0 32px',
          }}>
            Godrej Crown Residences (Godrej Golf Links) in Sector 49, Gurugram is a forest-themed
            ultra-luxury development by Godrej Properties spanning 10 acres. It offers well-appointed
            3 and 4 BHK apartments with Italian marble, smart home systems, and access to world-class
            amenities including a forest clubhouse, spa, gym, infinity pool — all in a serene, green
            setting with excellent connectivity.
          </p>

          {/* Stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '1px solid #ddd',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '18px 14px',
                borderRight: (i + 1) % 3 !== 0 ? '1px solid #ddd' : 'none',
                borderBottom: i < 3 ? '1px solid #ddd' : 'none',
                background: '#fff',
              }}>
                <p style={{
                  fontFamily: F_JOST, fontWeight: '800',
                  fontSize: 'clamp(13px,1.8vw,17px)', color: '#1a1a1a',
                  margin: '0 0 4px', letterSpacing: '0.01em',
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontFamily: F_SANS, fontSize: '11px',
                  color: '#888', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — image + form */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6" data-aos="fade-left">

          {/* Image */}
          <div style={{
            position: 'relative', width: '100%', aspectRatio: '4/3',
            borderRadius: '12px', overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
          }}>
            <Image
              src={overviewImage} alt="Godrej Crown Residences" fill
              className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority
            />
          </div>

          {/* Form */}
          <div style={{
            background: '#fff', borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}>
            <div style={{
              background: '#1a1a1a', padding: '16px 20px',
              borderBottom: '3px solid #C4952A',
            }}>
              <h3 style={{
                fontFamily: F_JOST, fontWeight: '700', fontSize: '16px',
                color: '#fff', margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                Book Free Site Visit
              </h3>
              <p style={{ fontFamily: F_SANS, fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: '3px 0 0' }}>
                Register now to get the best deal
              </p>
            </div>
            <div style={{ padding: '20px' }}>
              <EarlyForm />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
)

export default Overview
