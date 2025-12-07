import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

export default function HeroVideoDentista() {
  const videoRef = useRef(null)
  const [disableVideo, setDisableVideo] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Detectar soporte básico de códecs + preferencias del usuario
  useEffect(() => {
    // Preferencias: reducir animación / ahorro de datos
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    const saveData = navigator.connection?.saveData === true
    if (reduce || saveData) {
      setDisableVideo(true)
      return
    }

    // Soporte de códecs (rápida heurística)
    const v = document.createElement("video")
    const canMP4 = v.canPlayType('video/mp4; codecs="avc1.42E01E"') // H.264
    const canWEBM = v.canPlayType('video/webm; codecs="vp9"')
    if (!canMP4 && !canWEBM) setDisableVideo(true)
  }, [])

  // Pausar al ocultar pestaña (ahorro de recursos)
  useEffect(() => {
    const onVis = () => {
      if (!videoRef.current) return
      if (document.hidden) videoRef.current.pause()
      else if (!disableVideo) videoRef.current.play().catch(() => {})
    }
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [disableVideo])

  const handleCanPlay = () => {
    setLoaded(true)
    if (!disableVideo && videoRef.current) {
      videoRef.current.play().catch(() => setDisableVideo(true))
    }
  }

  const handleVideoError = () => {
    setDisableVideo(true)
    setLoaded(true)
  }

  const onSourceError = () => {
    // Si una fuente falla, el <video> intentará la siguiente.
    // Si todas fallan, caerá en handleVideoError.
  }

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden min-h-[calc(100svh-64px)]"
    >
      {/* Fondo: video o poster */}
      <div className="absolute inset-0 -z-10">
        {/* Capa de contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />

        {/* Video */}
        {!disableVideo && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/images/hero-poster.jpg"
            playsInline
            muted
            loop
            autoPlay
            preload="metadata"
            onCanPlay={handleCanPlay}
            onError={handleVideoError}
            aria-hidden="true"
          >
            {/* MP4 primero por compatibilidad (Safari) */}
            <source src="/videos/hero.mp4" type="video/mp4" onError={onSourceError} />
            <source src="/videos/hero.webm" type="video/webm" onError={onSourceError} />
          </video>
        )}

        {/* Fallback a imagen si el video no se usa o aún no carga */}
        {(disableVideo || !loaded) && (
          <img
            src="/images/hero-poster.jpg"
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        )}

        {/* Velo de color de marca para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 to-transparent mix-blend-multiply" />
      </div>

      {/* Contenido centrado verticalmente, respetando el alto del navbar */}
      <div className="container-px min-h-[calc(100svh-64px)] flex items-center py-12 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-400">
            Tu sonrisa, <span className="text-brand-600">en manos expertas</span>
          </h1>

          <p className="mt-5 text-lg rounded-2xl text-brand-900 bg-gradient-to-b from-brand-50/90 to-transparent  dark:text-gray-900">
            Odontología integral con tecnología de punta y trato humano. Agenda en minutos y recibe recordatorios automáticos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* <Link to="/#agendar" className="btn btn-primary">Agendar cita</Link> */}
            <a
              className="btn btn-primary"
              href="https://wa.me/5215560910802?text=Quiero%20agendar%20una%20cita"
              target="_blank" rel="noreferrer"
            >
              WhatsApp
            </a>
            <a 
              className="group relative overflow-hidden bg-transparent text-blue-700 border-2 border-blue-200 px-6 py-4 rounded-2xl font-semibold hover:bg-blue-50 hover:border-blue-300 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              href="/#servicios"
            >
              <span>Ver servicios</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

         
          {/* Lista de beneficios mejorada */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-24xl">
            {[
              { icon: '⚡', text: 'Atendemos urgencias' },
              { icon: '💳', text: 'Aceptamos tarjetas' },
              // { icon: '🅿️', text: 'Parking accesible', subtext: 'Comodidad garantizada' }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{benefit.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{benefit.text}</div>
                    <div className="text-sm text-gray-600">{benefit.subtext}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
