import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FixedDonationButton } from '@/components/fixed-donation-button'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Propina Ya',
    template: '%s | Propina Ya'
  },
  description: 'Calculadora de propinas online gratuita para Argentina. Calcula pagos mensuales, intereses, costo total y fecha de finalización de tus préstamos. Herramienta 100% gratuita y sin registro.',
  keywords: [
    'calculadora propinas', 'calculadora préstamos', 'simulador propinas', 'calculadora intereses',
    'cuota mensual', 'tasa interés', 'propinas personales', 'financiación', 'crédito',
    'calculadora propinas argentina', 'simulador propinas argentina', 'calcular propinas online',
    'calculadora propinas gratis', 'propinas sin interés', 'calculadora financiera',
    'propina ya', 'propina online', 'propina gratis', 'propina sin interes', 'propina auto', 'propina casa',
    'prestamo bancario', 'calculadora propinas auto', 'calculadora propinas casa',
    'propinas tarjeta credito', 'interes compuesto', 'calculadora deuda'
  ],
  authors: [{ name: 'Propina Ya', url: 'https://propinasya.netlify.app' }],
  creator: 'Propina Ya',
  publisher: 'Propina Ya',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Propina Ya',
    description: 'Calcula tus propinas de forma rápida y precisa. Herramienta gratuita para calcular pagos mensuales, intereses y fechas de finalización en Argentina.',
    url: 'https://propinasya.netlify.app', // ← Cambiar aquí
    siteName: 'Propina Ya',
    images: [
      {
        url: 'https://propinasya.netlify.app/og-image.jpg', // ← Cambiar aquí
        width: 1200,
        height: 630,
        alt: 'Calculadora de Cuotas Info Cuotas',
      }
    ],
    locale: 'es_AR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Cuotas Online Gratis Argentina',
    description: 'Calcula tus cuotas de forma rápida y precisa.',
    images: ['https://propinasya.netlify.app/og-image.jpg'], // ← Cambiar aquí
  },
  alternates: {
    canonical: 'https://propinasya.netlify.app', // ← Cambiar aquí
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <title>Propina Ya</title>
        <link rel="icon" href="/propinasya.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-site-verification" content="d126wPhb7ZDioVvxTpqGX5CLUUtWpmtbjyxxtWIN0Po" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Propina Ya - Calculadora de Propinas',
              description: 'Calculadora de propinas online gratuita',
              url: 'https://propinasya.netlify.app',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'ARS'
              },
              featureList: [
                'Cálculo de propinas mensuales',
                'Cálculo de propinas totales',
                'Cálculo de propinas auto',
                'Cálculo de propinas casa',
                'Cálculo de propinas tarjeta de crédito',
                'Cálculo de propinas tarjeta de débito',
                'Cálculo de propinas en efectivo',
                'Cálculo de propinas en dólares',
                'Cálculo de propinas en euros',
                'Cálculo de propinas en pesos',
                'Cálculo de propinas en reales',
                'Cálculo de propinas en yenes',
                'Cálculo de propinas en libras esterlinas',
                'Interfaz responsive',
                'Sin registro requerido'
              ],
              availableLanguage: {
                '@type': 'Language',
                name: 'Spanish'
              },
              areaServed: {
                '@type': 'Country',
                name: 'Argentina'
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <FixedDonationButton />
          {children}
        </div>
      </body>
    </html>
  )
}
