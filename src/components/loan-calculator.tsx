'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { calculateLoan, type LoanCalculation } from '@/lib/calculations'
import { Calculator, DollarSign, Calendar, Percent, AlertCircle } from 'lucide-react'

export function LoanCalculator() {
  const [principal, setPrincipal] = useState<string>('')
  const [months, setMonths] = useState<string>('')
  const [monthlyRate, setMonthlyRate] = useState<string>('')
  const [firstPaymentDate, setFirstPaymentDate] = useState<string>('')
  const [result, setResult] = useState<LoanCalculation | null>(null)
  const [error, setError] = useState<string>('')
  const [usedDefaultRate, setUsedDefaultRate] = useState<boolean>(false)

  const formatCurrencyDisplay = (value: string): string => {
    if (!value || value === '') return ''
    
    // Remove non-numeric characters
    const cleanValue = value.replace(/[^\d.]/g, '')
    const number = parseFloat(cleanValue)
    
    if (isNaN(number)) return value
    
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number)
  }

  const handleCalculate = () => {
    try {
      setError('')
      setUsedDefaultRate(false)
      
      // Parse the currency value
      const cleanPrincipal = principal.replace(/[^\d.,]/g, '').replace(',', '.')
      const p = parseFloat(cleanPrincipal || '0')
      const m = parseInt(months)
      const r = monthlyRate ? parseFloat(monthlyRate) : 3.0

      if (isNaN(p) || isNaN(m)) {
        throw new Error('Por favor ingresa el monto y la cantidad de cuotas')
      }

      if (p <= 0 || m <= 0) {
        throw new Error('El monto y la cantidad de cuotas deben ser positivos')
      }

      if (!monthlyRate || parseFloat(monthlyRate) <= 0) {
        setUsedDefaultRate(true)
      }

      // Parse first payment date if provided
      const firstPayment = firstPaymentDate ? new Date(firstPaymentDate) : undefined
      
      const calculation = calculateLoan(p, r, m, firstPayment)
      setResult(calculation)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el cálculo')
      setResult(null)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Calculadora de Cuotas
        </CardTitle>
        <CardDescription>
          Calcula tus cuotas de manera sencilla y clara. Obtén información detallada sobre intereses,
          dinero extra pagado y fecha estimada de finalización.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Precio del producto *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="text"
                placeholder="100000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="pl-8 transition-all focus:scale-105"
                inputMode="decimal"
              />
            </div>
            {principal && (
              <p className="text-xs text-gray-500">
                {formatCurrencyDisplay(principal)}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Cantidad de cuotas *</label>
            <Input
              type="number"
              placeholder="12"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="transition-all focus:scale-105"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tasa mensual (%)</label>
            <Input
              type="number"
              placeholder="3.0"
              step="0.1"
              value={monthlyRate}
              onChange={(e) => setMonthlyRate(e.target.value)}
              className="transition-all focus:scale-105"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha de primera cuota (opcional)</label>
            <Input
              type="date"
              value={firstPaymentDate}
              onChange={(e) => setFirstPaymentDate(e.target.value)}
              className="transition-all focus:scale-105"
            />
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full transition-all hover:scale-105"
          size="lg"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calcular
        </Button>

        {error && (
          <div className="text-red-500 text-sm text-center animate-in slide-in-from-top duration-300">
            {error}
          </div>
        )}

        {usedDefaultRate && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 animate-in slide-in-from-top duration-300">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">Tasa predeterminada aplicada</p>
              <p className="text-sm text-blue-600">
                Se utilizó una tasa del 3% mensual. Puedes ajustarla según tu caso.
              </p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Cuota mensual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.monthlyPayment)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Total a pagar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.totalAmount)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Percent className="w-5 h-5" />
                    Interés total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(result.totalInterest)}
                  </p>
                  <p className="text-sm text-orange-500">
                    ({result.interestPercentage}% extra)
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Fecha de finalización
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-purple-600">
                    {result.finalPaymentDate}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}