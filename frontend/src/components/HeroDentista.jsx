import { Link } from "react-router-dom"

function Check({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function HeroDentista() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 to-transparent" />
      <div className="container-px py-20 sm:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Tu sonrisa, <span className="text-brand-600">en manos expertas</span>
          </h1>
          <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-300">
            Odontología integral con tecnología de punta y trato humano. Agenda en minutos y recibe recordatorios automáticos.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-700 dark:text-neutral-300">
            <span className="inline-flex items-center gap-2"><Check /> Citas el mismo día</span>
            <span className="inline-flex items-center gap-2"><Check /> Aceptamos tarjetas</span>
            <span className="inline-flex items-center gap-2"><Check /> Estacionamiento</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/citas" className="btn btn-primary">Agendar cita</Link>
            <a
              className="btn btn-ghost"
              href="https://wa.me/521000000000?text=Quiero%20agendar%20una%20cita"
              target="_blank" rel="noreferrer"
            >
              WhatsApp
            </a>
            <a className="btn" href="#servicios">Ver servicios</a>
          </div>
        </div>
      </div>
    </section>
  )
}
