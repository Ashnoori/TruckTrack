import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Mono, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
})

const dmMono = DM_Mono({ 
  subsets: ["latin"],
  weight: ['300', '400', '500'],
  variable: '--font-mono'
})

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-display'
})

export const metadata: Metadata = {
  title: 'TruckTrack | Find Food Trucks in Ottawa',
  description: 'Discover the best food trucks in Ottawa. Follow your favourites, collect loyalty stamps, and never miss a special.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F0F0F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable} ${bebasNeue.variable} bg-app-black`}>
      <body className="font-sans antialiased bg-app-black text-warm-cream">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
