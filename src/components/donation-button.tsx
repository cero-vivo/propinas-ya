'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DonationButton() {
  return (
    <div className="text-center space-y-4">
      <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
        <Heart className="w-5 h-5 text-red-500" />
        Apoya a Propinas Ya
      </h3>
      <p className="text-sm text-muted-foreground">
        Ayúdanos a mantener esta herramienta gratuita
      </p>
      <a 
        href="https://link.mercadopago.com.ar/devsarg"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button 
          className="bg-[#009ee3] hover:bg-[#007eb3] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
        >
          <Heart className="w-4 h-4 mr-2" />
          Donar
        </Button>
      </a>
    </div>
  )
}