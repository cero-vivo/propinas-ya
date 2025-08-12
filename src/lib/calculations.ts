export interface LoanCalculation {
  monthlyPayment: number
  totalAmount: number
  totalInterest: number
  interestPercentage: number
  finalPaymentDate: string
}

export function calculateLoan(
  principal: number,
  monthlyRate: number,
  months: number,
  firstPaymentDate?: Date
): LoanCalculation {
  if (principal <= 0 || months <= 0) {
    throw new Error("El monto y la cantidad de cuotas deben ser positivos")
  }

  // Use default rate if 0 or negative is provided
  const effectiveRate = monthlyRate <= 0 ? 3.0 : monthlyRate
  const monthlyRateDecimal = effectiveRate / 100
  
  // Calculate monthly payment using the standard loan formula
  const monthlyPayment = principal * 
    (monthlyRateDecimal * Math.pow(1 + monthlyRateDecimal, months)) /
    (Math.pow(1 + monthlyRateDecimal, months) - 1)

  const totalAmount = monthlyPayment * months
  const totalInterest = totalAmount - principal
  const interestPercentage = (totalInterest / principal) * 100

  // Calculate final payment date using first payment date or current date
  const startDate = firstPaymentDate || new Date()
  const finalDate = new Date(startDate)
  finalDate.setMonth(finalDate.getMonth() + months)
  const finalPaymentDate = finalDate.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    interestPercentage: Math.round(interestPercentage * 100) / 100,
    finalPaymentDate
  }
}


export interface TipCalculation {
  montoTotal: number
  porcentajePropina: number
  montoPropina: number
  totalConPropina: number
  personas: number
  porPersona: number
  montoBasePorPersona: number
  propinaPorPersona: number
}

export function calcularPropina(
  monto: number,
  porcentaje: number,
  personas: number = 1
): TipCalculation {
  if (monto <= 0) {
    throw new Error("El monto debe ser mayor a cero")
  }
  
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error("El porcentaje debe estar entre 0 y 100")
  }
  
  if (personas < 0) {
    throw new Error("El número de personas no puede ser negativo")
  }

  const montoPropina = monto * (porcentaje / 100)
  const totalConPropina = monto + montoPropina
  
  // Si es 0 personas, no dividir - el gasto queda sin fraccionar
  const porPersona = personas === 0 ? totalConPropina : totalConPropina / personas
  const montoBasePorPersona = personas === 0 ? monto : monto / personas
  const propinaPorPersona = personas === 0 ? montoPropina : montoPropina / personas

  return {
    montoTotal: Number(monto.toFixed(2)),
    porcentajePropina: Number(porcentaje.toFixed(2)),
    montoPropina: Number(montoPropina.toFixed(2)),
    totalConPropina: Number(totalConPropina.toFixed(2)),
    personas: Number(personas),
    porPersona: Number(porPersona.toFixed(2)),
    montoBasePorPersona: Number(montoBasePorPersona.toFixed(2)),
    propinaPorPersona: Number(propinaPorPersona.toFixed(2))
  }
}