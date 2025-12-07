import { useState, useRef, useEffect } from "react"

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  labelBefore = "Antes",
  labelAfter = "Después",
  alt = "Comparación antes y después",
}) {
  const [pct, setPct] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  // Eventos globales para el drag
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setPct(percentage)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'ew-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging])

  const handleContainerClick = (e) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPct(percentage)
  }

  return (
    <div 
      ref={containerRef}
      className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-neutral-200 select-none cursor-ew-resize"
      onClick={handleContainerClick}
    >
      {/* Imagen base = Después */}
      <img src={afterSrc} alt={alt} className="absolute inset-0 w-full h-full object-cover" />

      {/* Capa "Antes" recortada por porcentaje */}
      <img
        src={beforeSrc}
        alt={alt}
        className="absolute inset-0 h-full object-cover"
        style={{ width: `${pct}%` }}
      />

      {/* Área de control ampliada */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-transparent cursor-ew-resize group"
        style={{ left: `${pct}%`, marginLeft: '-8px' }}
        onMouseDown={() => setIsDragging(true)}
      >
        {/* Línea divisoria visible */}
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-white/80 shadow-lg" />
        
        {/* Control deslizante central - más grande y con mejor feedback */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-brand-500 shadow-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl">
          {/* Flechas indicadoras */}
          <div className="flex gap-1">
            <svg className="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 16 16">
              <path d="M10 4L6 8l4 4"/>
            </svg>
            <svg className="w-3 h-3 text-brand-500" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 4l4 4-4 4"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Etiquetas */}
      <span className="absolute left-3 top-3 text-xs px-3 py-2 rounded-full bg-black/60 text-white backdrop-blur-sm font-medium">
        {labelBefore}
      </span>
      <span className="absolute right-3 top-3 text-xs px-3 py-2 rounded-full bg-black/60 text-white backdrop-blur-sm font-medium">
        {labelAfter}
      </span>

      {/* Indicador de porcentaje */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-full bg-black/70 text-white text-sm font-medium backdrop-blur-sm">
        {Math.round(pct)}% {labelBefore}
      </div> */}

      {/* Instrucción para el usuario */}
      <div className="absolute bottom-4 left-4 text-xs text-white/80 bg-black/40 px-2 py-1 rounded">
        ← Click o arrastra →
      </div>
    </div>
  )
}