import './apartments.css'
import { Open_Sans, Montserrat, Cormorant_Garamond } from 'next/font/google'
import { CITY_DISPLAY } from '../../lib/apartments-in-noida/config'
import localFont from 'next/font/local'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const nephilm = localFont({
  src: '../../public/fonts/Nephilm.otf',
  variable: '--font-nephilm',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://godrejcrowngolfresidences.in'),
  title: 'Godrej Crown Residences | 3 & 4 BHK in Sector 150 Noida',
  description: 'Godrej Crown Residences — Spacious 3 & 4 BHK Apartments at Sector 150 Noida. By Godrej Properties. Premium amenities, lush greens, excellent connectivity. Enquire Now.',
  icons: {
    icon: '/apartments-in-noida/images/logo/logo1.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Godrej Crown Residences | 3 & 4 BHK in Sector 150 Noida',
    description: 'Godrej Crown Residences — Spacious 3 & 4 BHK Apartments at Sector 150 Noida. By Godrej Properties.',
    images: ['/apartments-in-noida/images/hero/desktop.webp'],
  },
}

export default function ApartmentsLayout({ children }) {
  return (
    <div className={`${openSans.variable} ${montserrat.variable} ${cormorant.variable} ${nephilm.variable} font-sans text-dark antialiased`}>
      <GoogleTagManager gtmId="GTM-575H8R87" />
      <Script
        id="json-ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://godrejcrowngolfresidences.in/"
            },
            "headline": "Godrej Crown Residences | Spacious 3 & 4 BHK Apartments — Sector 150 Noida",
            "description": "Godrej Crown Residences — Spacious 3 & 4 BHK Apartments at Sector 150 Noida. By Godrej Properties. Premium amenities, lush greens, excellent connectivity.",
            "image": "https://godrejcrowngolfresidences.in/_next/image?url=%2Fapartments-in-noida%2Fimages%2Fhero%2Fdesktop.webp&w=1200&q=75",
            "author": {
              "@type": "Organization",
              "name": "Proptiger Marketing Services Pvt Ltd",
              "url": "https://www.proptiger.com/noida/sector-150/godrej-properties-crown"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Proptiger",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.proptiger.com/"
              }
            },
            "datePublished": "2026-04-22"
          })
        }}
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ 'city': '${CITY_DISPLAY}' });
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
      </Script>
      {children}
    </div>
  )
}
