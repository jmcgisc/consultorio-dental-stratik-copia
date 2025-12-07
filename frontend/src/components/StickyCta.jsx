import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function StickyCta() {
  const [show, setShow] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Ocultar en la página de /citas o cuando ya estás en #agendar
    if (pathname === "/citas" || hash === "#agendar") {
      setShow(false); return
    }
    const onScroll = () => setShow(window.scrollY > 320 && !hidden)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname, hash, hidden])

  if (!show) return null

  return (
    <div
      className="fixed bottom-4 inset-x-0 z-50"
      role="region" 
      aria-label="Acción rápida para agendar"
    >
      <div className="container-px">
        <div className="rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/95 backdrop-blur p-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="font-semibold text-neutral-800 dark:text-neutral-100">¿Listo para agendar?</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Reserva en menos de 1 minuto.</p>
          </div>
          <div className="flex items-center gap-3">
      
            <a href="/#agendar" className="btn btn-primary px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                Agendar ahora
            </a>
            
            <a 
              href="tel:+525555770687" 
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200 border border-neutral-300 dark:border-neutral-600"
              aria-label="Llamar a la clínica"
            >
              Llamar
            </a>
            <button
              className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-200"
              aria-label="Cerrar"
              onClick={() => { setHidden(true); setShow(false) }}
              title="Cerrar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}