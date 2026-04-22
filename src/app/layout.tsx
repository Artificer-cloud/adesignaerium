import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { DM_Sans, Syne_Mono, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'

const dmSans = DM_Sans({
  subsets: ['latin'], weight: ['300', '400', '500'],
  style: ['normal', 'italic'], variable: '--font-body', display: 'swap',
})
const syneMono = Syne_Mono({
  subsets: ['latin'], weight: ['400'],
  variable: '--font-mono', display: 'swap',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  style: ['italic'], variable: '--font-script', display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Abhijeeth Subhash — Creative Designer Dubai', template: '%s | Abhijeeth Subhash' },
  description: 'Senior Creative Designer specialising in Branding, UI/UX, AI Visual Design, Motion & Photography. Based in Dubai, UAE.',
  keywords: ['creative designer', 'UI/UX designer', 'branding', 'Dubai', 'AI design', 'Midjourney', 'Figma', 'Abhijeeth Subhash'],
  metadataBase: new URL('https://adesignaerium.com'),
  alternates: { canonical: 'https://adesignaerium.com' },
  openGraph: {
    title: 'Abhijeeth Subhash — Creative Designer Dubai',
    description: 'Senior Creative Designer based in Dubai. Branding, UI/UX, AI Visual Design.',
    url: 'https://adesignaerium.com', type: 'website', siteName: 'ADesignAerium',
  },
  twitter: { card: 'summary_large_image', title: 'Abhijeeth Subhash — Creative Designer Dubai' },
  robots: { index: true, follow: true },
}

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', t);
    } catch(e) {}
  })();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`grain ${dmSans.variable} ${syneMono.variable} ${cormorant.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Analytics />
        <SpeedInsights />
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  )
}