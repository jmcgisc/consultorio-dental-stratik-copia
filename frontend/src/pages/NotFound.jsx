import { Link } from "react-router-dom"
import { useEffect } from "react"

/** Ilustración inline: diente perdido con lupa (se mantiene) */
function Tooth404Art({ className = "w-full max-w-[420px]" }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" role="img">
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>

      {/* Diente */}
      <g transform="translate(120,55)">
        <path d="M80 0c24 0 52 10 63 35 10 21 7 42-2 57-8 13-12 26-14 41-2 15-6 27-15 30-8 2-13-5-18-18-4-10-7-26-9-34-2 8-5 24-9 34-5 13-10 20-18 18-9-3-13-15-15-30-2-15-6-28-14-41-9-15-12-36-2-57C28 10 56 0 80 0Z" fill="#fff" stroke="#E5E7EB" strokeWidth="3"/>
        <circle cx="62" cy="61" r="5" fill="#0F172A" />
        <circle cx="98" cy="61" r="5" fill="#0F172A" />
        <path d="M60 82c10 8 30 8 40 0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* Lupa */}
      <g transform="translate(230,160) rotate(20)">
        <circle cx="0" cy="0" r="32" fill="none" stroke="url(#g2)" strokeWidth="8"/>
        <rect x="26" y="24" width="60" height="10" rx="5" fill="url(#g2)"/>
      </g>

      {/* Huellitas */}
      <g fill="#CBD5E1">
        <circle cx="90" cy="210" r="3" />
        <circle cx="110" cy="225" r="3" />
        <circle cx="135" cy="235" r="3" />
      </g>
    </svg>
  )
}

function ToothLogo({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7.5 21c-.5-3 .5-6-3-9-2.5-2.3-2.4-7.2 2.1-8.8 2.8-1 5.3.3 5.4.4.1-.1 2.6-1.4 5.4-.4 4.5 1.6 4.6 6.5 2.1 8.8-3.5 3-2.5 6-3 9-.4 2-2.3 2-3 .7-.8-1.6-1.1-4.5-1.5-5.8-.4 1.3-.7 4.2-1.5 5.8-.7 1.3-2.6 1.3-3-.7Z"/>
    </svg>
  )
}

export default function NotFound() {
  useEffect(() => { document.title = "Página no encontrada | Clínica Dental" }, [])

  return (
    <main className="relative min-h-[75vh] grid place-items-center">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 -z-20 bg-center bg-cover bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: "url(/images/404-bg.png)" }}
        aria-hidden="true"
      />
      {/* Capa para legibilidad (claro/oscuro) */}
      <div className="absolute inset-0 -z-10 bg-white/80 dark:bg-neutral-950/70 backdrop-blur-[1px]" />

      <section className="container-px text-center py-16">
        {/* Marca */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-neutral-900/60 text-brand-700 dark:text-neutral-100 shadow-sm mb-6">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 dark:bg-neutral-800/60">
            <ToothLogo className="h-5 w-5" />
          </span>
          <span className="font-semibold tracking-tight">Clínica Dental</span>
        </div>

        {/* Código + título */}
        <h1 className="text-6xl sm:text-7xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">404</span>
        </h1>
        <p className="mt-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Diente no encontrado
        </p>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
          La página que buscas se movió, cambió de nombre o nunca existió. Te ayudamos a ubicar lo que necesitas.
        </p>

        {/* Ilustración */}
        <div className="mt-8 flex justify-center">
          <Tooth404Art />
        </div>

        {/* Acciones */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="btn btn-primary">Ir al inicio</Link>
          <a href="/#servicios" className="btn">Ver servicios</a>
          <a href="/#agendar" className="btn">Agendar cita</a>
          <a
            className="btn"
            href="https://wa.me/521000000000?text=Hola,%20llegu%C3%A9%20a%20una%20404%20en%20su%20sitio"
            target="_blank" rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>

        <p className="mt-8 text-sm text-neutral-600 dark:text-neutral-400">
          Código de error: 404 • Página no encontrada
        </p>
      </section>
    </main>
  )
}
