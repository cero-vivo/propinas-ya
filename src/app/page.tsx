'use client'

import { useState, useMemo } from 'react'
import { Calculator, Users, DollarSign, Percent, Heart } from 'lucide-react'
import { DonationButton } from '@/components/donation-button'
import { calcularPropina } from '@/lib/calculations'
import { formatCurrency } from '@/lib/utils'

export default function Home() {
  const [montoTotal, setMontoTotal] = useState<string>('')
  const [porcentaje, setPorcentaje] = useState<number>(10)
  const [personas, setPersonas] = useState<number>(1)
  const [porcentajePersonalizado, setPorcentajePersonalizado] = useState<string>('')
  const [usandoPersonalizado, setUsandoPersonalizado] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const porcentajesPredefinidos = [5, 10, 15, 20]

  const resultados = useMemo(() => {
    try {
      if (!montoTotal.trim()) return null
      
      const monto = parseFloat(montoTotal)
      const porcentajeActual = usandoPersonalizado ? parseFloat(porcentajePersonalizado) : porcentaje
      
      if (!monto || monto <= 0) {
        setError('Ingrese un monto válido mayor a cero')
        return null
      }
      
      if (!porcentajeActual || porcentajeActual < 0 || porcentajeActual > 100) {
        setError('Ingrese un porcentaje válido entre 0 y 100')
        return null
      }
      
      setError('')
      return calcularPropina(monto, porcentajeActual, personas)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el cálculo')
      return null
    }
  }, [montoTotal, porcentaje, personas, porcentajePersonalizado, usandoPersonalizado])

  const beneficios = [
    {
      icon: Calculator,
      title: "Cálculo instantáneo",
      description: "Obtén resultados en tiempo real mientras ingresas los datos"
    },
    {
      icon: Users,
      title: "División fácil",
      description: "Divide la cuenta entre amigos sin complicaciones"
    },
    {
      icon: Percent,
      title: "Porcentajes flexibles",
      description: "Elige entre opciones predefinidas o personaliza tu propina"
    },
    {
      icon: Heart,
      title: "100% gratuito",
      description: "Sin costos ocultos, diseñado para ayudar a todos"
    }
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFF8F0' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <section className="text-center mb-8">
          <img 
            src="/propinasya.svg" 
            alt="Propinas YA Logo" 
            className="h-16 sm:h-28 mx-auto mb-2"
          />
        </section>

        <div className="max-w-2xl mx-auto">
          {/* Calculator Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#f25e54' }}>
              Calculá tu propina
            </h2>

            {/* Monto Total */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                Monto total de la cuenta
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#666666' }} />
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  placeholder="0.00"
                  value={montoTotal}
                  onChange={(e) => setMontoTotal(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#f25e54'
                  }}
                />
              </div>
            </div>

            {/* Porcentaje de Propina */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                Porcentaje de propina
              </label>
              
              {/* Botones predefinidos */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {porcentajesPredefinidos.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPorcentaje(p)
                      setUsandoPersonalizado(false)
                    }}
                    className={`py-2 px-3 rounded-lg font-medium transition-colors ${
                      !usandoPersonalizado && porcentaje === p
                        ? 'text-white'
                        : 'border'
                    }`}
                    style={{
                      backgroundColor: !usandoPersonalizado && porcentaje === p ? '#f25e54' : 'transparent',
                      borderColor: '#FFC93C',
                      color: !usandoPersonalizado && porcentaje === p ? 'white' : '#333333'
                    }}
                  >
                    {p}%
                  </button>
                ))}
              </div>

              {/* Campo personalizado */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Personalizado"
                  value={usandoPersonalizado ? porcentajePersonalizado : ''}
                  onChange={(e) => {
                    setPorcentajePersonalizado(e.target.value)
                    setUsandoPersonalizado(true)
                  }}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#f25e54',
                  }}
                />
                <span className="text-sm" style={{ color: '#666666' }}>%</span>
              </div>
            </div>

            {/* Número de personas */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                ¿Entre cuántas personas se divide?
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#666666' }} />
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={personas}
                  onChange={(e) => setPersonas(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#FFC93C'
                  }}
                />
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Resultados */}
            {resultados && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3" style={{ color: '#333333' }}>Resultados:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: '#666666' }}>Monto original:</span>
                    <span className="font-medium">{formatCurrency(resultados.montoTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#666666' }}>Propina ({resultados.porcentajePropina}%):</span>
                    <span className="font-medium" style={{ color: '#f25e54' }}>{formatCurrency(resultados.montoPropina)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium" style={{ color: '#333333' }}>Total a pagar:</span>
                    <span className="font-bold" style={{ color: '#f25e54' }}>{formatCurrency(resultados.totalConPropina)}</span>
                  </div>
                  
                  {/* Desglose por persona */}
                  {personas > 1 && (
                    <div className="border-t pt-3 mt-3">
                      <h4 className="font-medium mb-2" style={{ color: '#333333' }}>Desglose por persona:</h4>
                      <div className="space-y-1 pl-2">
                        <div className="flex justify-between text-xs">
                          <span style={{ color: '#666666' }}>Monto base por persona:</span>
                          <span className="font-medium">{formatCurrency(resultados.montoBasePorPersona)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span style={{ color: '#666666' }}>Propina por persona:</span>
                          <span className="font-medium" style={{ color: '#f25e54' }}>{formatCurrency(resultados.propinaPorPersona)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span style={{ color: '#333333' }}>Total por persona:</span>
                          <span style={{ color: '#4CAF50' }}>{formatCurrency(resultados.porPersona)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {personas === 1 && (
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium" style={{ color: '#333333' }}>Total a pagar:</span>
                        <span className="font-bold" style={{ color: '#4CAF50' }}>{formatCurrency(resultados.porPersona)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Donation Section */}
          <div className="mb-8">
            <DonationButton />
          </div>

          {/* Benefits Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#333333' }}>
              ¿Por qué usar Propinas YA?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {beneficios.map((beneficio, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm"
                  style={{ borderColor: '#FFC93C' }}
                >
                  <beneficio.icon className="w-8 h-8 mb-2" style={{ color: '#f25e54' }} />
                  <h3 className="font-semibold mb-1" style={{ color: '#333333' }}>{beneficio.title}</h3>
                  <p className="text-sm" style={{ color: '#666666' }}>{beneficio.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Content */}
          <section className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#333333' }}>
              Calculadora de Propinas
            </h2>
            <div className="text-sm" style={{ color: '#666666' }}>
              <p className="mb-4">
                ¿Cuánto dejar de propina en Argentina? Con nuestra calculadora podés calcular 
                exactamente cuánto dejar de propina en restaurantes, bares y otros servicios.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2" style={{ color: '#333333' }}>¿Cuánto se deja de propina?</h3>
                <ul className="space-y-1">
                  <li>• Restaurantes: 10% del total</li>
                  <li>• Bares y cafeterías: 10%</li>
                  <li>• Delivery: 10%</li>
                  <li>• Estacionamiento: $200-500</li>
                </ul>
              </div>
              <p>
                Nuestra calculadora te permite dividir la cuenta entre varias personas 
                y obtener el monto exacto que cada uno debe pagar, incluyendo la propina.
              </p>
            </div>
          </section>
        </div>

        <footer className="text-center py-8 mt-8">
          <p style={{ color: '#666666' }}>
            © {new Date().getFullYear()} Propinas YA - Calculadora gratuita de propinas para Argentina
          </p>
        </footer>
      </div>
    </main>
  )
}
