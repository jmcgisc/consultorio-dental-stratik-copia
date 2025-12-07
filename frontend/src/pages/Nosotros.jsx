// src/pages/Nosotros.jsx
import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import SEO from "../components/SEO.jsx"

// Utilidad para clases CSS
function cn(...classes) { 
  return classes.filter(Boolean).join(" ") 
}

/* ---------- Datos de ejemplo (cambia por tus rutas reales) ---------- */
const GALERIAS = {
  consultorio: [
    { 
      src: "/images/nosotros/consultorio-1.jpg", 
      alt: "Recepción moderna del consultorio dental con área de espera cómoda", 
      cap: "Recepción principal" 
    },
    { 
      src: "/images/nosotros/consultorio-2.jpg", 
      alt: "Sala de espera con asientos cómodos y ambiente relajante", 
      cap: "Sala de espera" 
    },
    { 
      src: "/images/nosotros/consultorio-3.jpg", 
      alt: "Unidad dental moderna con equipo de última generación", 
      cap: "Unidad dental" 
    },
    { 
      src: "/images/nosotros/consultorio-4.jpg", 
      alt: "Área de esterilización con equipos profesionales", 
      cap: "Esterilización" 
    },
  ],
  equipo: [
    { 
      src: "/images/nosotros/equipo-1.jpg", 
      alt: "Equipo clínico completo de odontólogos especialistas", 
      cap: "Equipo clínico" 
    },
    { 
      src: "/images/nosotros/equipo-2.jpg", 
      alt: "Odontólogos especializados en diferentes áreas", 
      cap: "Odontólogos" 
    },
    { 
      src: "/images/nosotros/equipo-3.jpg", 
      alt: "Higienistas dentales capacitados", 
      cap: "Higienistas" 
    },
    { 
      src: "/images/nosotros/equipo-4.jpg", 
      alt: "Personal de recepción y administración", 
      cap: "Recepción" 
    },
  ],
}

/* ------------------- Gestos (swipe) para mobile -------------------- */
function useSwipe(onSwipeLeft, onSwipeRight) {
  const touchStart = useRef({ x: 0, y: 0 })
  const touchEnd = useRef({ x: 0, y: 0 })
  
  const minSwipeDistance = 50
  
  const onTouchStart = (e) => {
    touchEnd.current = { x: 0, y: 0 }
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }
  
  const onTouchMove = (e) => {
    touchEnd.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }
  
  const onTouchEnd = () => {
    if (!touchStart.current.x || !touchEnd.current.x) return
    
    const xDistance = touchStart.current.x - touchEnd.current.x
    const yDistance = touchStart.current.y - touchEnd.current.y
    
    // Verificar que sea un swipe horizontal y no vertical
    if (Math.abs(xDistance) > Math.abs(yDistance) && Math.abs(xDistance) > minSwipeDistance) {
      if (xDistance > 0) {
        onSwipeLeft?.()
      } else {
        onSwipeRight?.()
      }
    }
    
    touchStart.current = { x: 0, y: 0 }
  }
  
  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}

/* --------------------------- Carrusel Mejorado ------------------------------ */
function Carousel({ items = [], startIndex = 0, aspectRatio = "aspect-[16/9]" }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const totalItems = items.length || 1
  
  // Navegación con debounce para evitar clicks rápidos
  const navigate = useRef(null)
  
  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return
    
    setIsTransitioning(true)
    setCurrentIndex(index)
    
    // Reset transitioning después de la animación
    setTimeout(() => setIsTransitioning(false), 500)
  }
  
  const goToNext = () => {
    if (navigate.current) return
    navigate.current = true
    
    goToSlide((currentIndex + 1) % totalItems)
    setTimeout(() => { navigate.current = false }, 500)
  }
  
  const goToPrevious = () => {
    if (navigate.current) return
    navigate.current = true
    
    goToSlide((currentIndex - 1 + totalItems) % totalItems)
    setTimeout(() => { navigate.current = false }, 500)
  }

  const trackStyle = useMemo(() => ({
    transform: `translateX(-${currentIndex * 100}%)`,
    transition: isTransitioning ? 'transform 0.5s ease-out' : 'none'
  }), [currentIndex, isTransitioning])

  // Navegación por teclado
  const onKeyDown = (e) => {
    switch(e.key) {
      case "ArrowLeft":
        e.preventDefault()
        goToPrevious()
        break
      case "ArrowRight":
        e.preventDefault()
        goToNext()
        break
      case "Home":
        e.preventDefault()
        goToSlide(0)
        break
      case "End":
        e.preventDefault()
        goToSlide(totalItems - 1)
        break
      default:
        break
    }
  }

  // Auto-avance opcional
  useEffect(() => {
    if (totalItems <= 1) return
    
    const interval = setInterval(() => {
      goToNext()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [currentIndex, totalItems])

  const swipeHandlers = useSwipe(goToNext, goToPrevious)

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">No hay imágenes disponibles</p>
      </div>
    )
  }

  return (

    <>

      <SEO
        title="Nosotros"
        description="Conoce nuestro equipo, filosofía y consultorio. Atención cálida y tecnología de última generación."
        image="/images/nosotros/equipo-1.jpg"
      />
        {/* Contenedor principal del carrusel */}    
      <div
        className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none"
        tabIndex={0}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Galería de imágenes"
        aria-live="polite"
        onKeyDown={onKeyDown}
        {...swipeHandlers}
      >
        {/* Indicador de posición para screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Imagen {currentIndex + 1} de {totalItems}: {items[currentIndex]?.cap}
        </div>

        {/* Contenedor de slides */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out" 
            style={trackStyle}
            role="list"
          >
            {items.map((item, index) => (
              <figure 
                key={`${item.src}-${index}`} 
                className={cn("w-full shrink-0", aspectRatio)}
                role="listitem"
                aria-hidden={currentIndex !== index}
              >
                <img
                  src={item.src}
                  alt={item.alt || ""}
                  className="h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                {item.cap && (
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-white text-sm font-medium">
                    {item.cap}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>

          {/* Controles de navegación */}
          {totalItems > 1 && (
            <>
              <button
                type="button"
                aria-label="Imagen anterior"
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-100 shadow-lg hover:bg-white dark:hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 hover:scale-105"
                disabled={isTransitioning}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Siguiente imagen"
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-100 shadow-lg hover:bg-white dark:hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200 hover:scale-105"
                disabled={isTransitioning}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Indicadores de posición (dots) */}
        {totalItems > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2" role="tablist">
            {items.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-label={`Ir a la imagen ${index + 1}`}
                aria-selected={currentIndex === index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  currentIndex === index 
                    ? "bg-white dark:bg-neutral-100 w-6" 
                    : "bg-white/60 dark:bg-neutral-400/60 hover:bg-white w-2.5"
                )}
              />
            ))}
          </div>
        )}

        {/* Miniaturas */}
        {totalItems > 1 && (
          <div className="grid grid-cols-4 gap-2 p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
            {items.map((item, index) => (
              <button
                key={`${item.src}-thumb-${index}`}
                onClick={() => goToSlide(index)}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-lg ring-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  currentIndex === index 
                    ? "ring-blue-500 scale-105" 
                    : "ring-transparent hover:ring-neutral-300 dark:hover:ring-neutral-700 hover:scale-105"
                )}
                aria-label={`Ver imagen ${index + 1}: ${item.cap}`}
                disabled={isTransitioning}
              >
                <img 
                  src={item.src} 
                  alt="" 
                  className="h-full w-full object-cover" 
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

/* --------------------------- Página Principal ------------------------------- */
export default function Nosotros() {
  const [activeTab, setActiveTab] = useState("consultorio")

  useEffect(() => {
    document.title = "Nosotros | Clínica Dental"
  }, [])

  const tabs = [
    { 
      key: "consultorio", 
      label: "Consultorio", 
      desc: "Instalaciones modernas, seguras y cómodas con los más altos estándares de esterilización.",
      icon: "🏥"
    },
    { 
      key: "equipo", 
      label: "Equipo", 
      desc: "Especialistas altamente capacitados con formación continua y trato humano.",
      icon: "👨‍⚕️"
    },
  ]

  const currentItems = GALERIAS[activeTab] || []

  return (
    <main className="relative bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800 min-h-screen">
      {/* Indicador de progreso superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500" />

      {/* Encabezado */}
      <section className="container-px pt-12 pb-8">
        <nav aria-label="Migas de pan" className="text-sm mb-4 text-neutral-600 dark:text-neutral-300">
          <Link to="/" className="hover:underline transition-colors">Inicio</Link> 
          <span className="mx-1">/</span>
          <span className="text-neutral-800 dark:text-neutral-100 font-medium">Nosotros</span>
        </nav>

        <header>
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Nuestra misión.
          </h1>
          <p className="mt-3 text-lg text-justify text-neutral-700 dark:text-neutral-300 max-w-2xl leading-relaxed">
            Brindar atención odontológica integral, ética y personalizada, enfocada en la prevención, estética y salud bucal de nuestros pacientes, con tecnología actualizada y un equipo profesional comprometido con su bienestar 🦷🪥
          </p>
        </header>
      </section>

      {/* Sección de pestañas y carrusel */}
      <section className="container-px pb-16" aria-labelledby="galeria-heading">
        <h2 id="galeria-heading" className="sr-only">Galería de instalaciones y equipo</h2>
        
        <div className="flex justify-center mb-6">
          <div 
            role="tablist" 
            aria-label="Seleccionar categoría de galería"
            className="inline-flex rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1"
          >
            {tabs.map(tab => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`${tab.key}-panel`}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  activeTab === tab.key
                    ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-md"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-neutral-700/50"
                )}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Descripción de la pestaña activa */}
        <div 
          id={`${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
          className="text-center mb-6"
        >
          <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
            {tabs.find(t => t.key === activeTab)?.desc}
          </p>
        </div>

        {/* Carrusel */}
        <Carousel 
          items={currentItems} 
          aspectRatio="aspect-[16/9]" 
        />

        {/* Estadísticas */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12 text-center">
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <p className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">+10</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Años de experiencia</p>
          </div>
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <p className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">100%</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Bioseguridad garantizada</p>
          </div>
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <p className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">Tecnología</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Equipo de última generación</p>
          </div>
        </div>

        {/* Llamadas a la acción */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a 
            href="/#agendar" 
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Agendar valoración
          </a>
          <a
            href="https://wa.me/5215560910802?text=Hola,%20quiero%20informes%20sobre%20la%20cl%C3%ADnica%20y%20el%20equipo"
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
          >
            <span>💬</span>
            WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}