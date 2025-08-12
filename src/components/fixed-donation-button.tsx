'use client'

import { Heart } from 'lucide-react'

export function FixedDonationButton() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <a
        href="https://link.mercadopago.com.ar/devsarg"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 animate-pulse-glow"
      >
        <Heart className="w-4 h-4" />
        <span className="font-medium text-sm">Donar</span>
      </a>
    </div>
  )
}