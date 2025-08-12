export function AdvertisingSpace({ position = 'bottom' }: { position?: 'bottom' | 'lateral' }) {
  return (
    <div className={`
      ${position === 'bottom' ? 'w-full h-32' : 'w-64 h-96'}
      bg-gray-100 border-2 border-dashed border-gray-300 
      rounded-lg flex items-center justify-center
      animate-pulse transition-all hover:bg-gray-200
    `}>
      <div className="text-center text-gray-500">
        <p className="text-sm font-medium">Espacio publicitario</p>
        <p className="text-xs">Google Ads o publicidad personalizada</p>
      </div>
    </div>
  )
}