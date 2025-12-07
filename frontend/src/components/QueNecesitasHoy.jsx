// src/components/QueNecesitasHoy.jsx
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const items = [
  {
    to: "/servicios#servicio-limpieza",
    t: "Higiene / Limpieza",
    d: "Profilaxis y mantenimiento",
    emoji: "🪥",
    subtitle: "Profilaxis profesional y prevención",
    bullets: [
      "Remueve placa y sarro con ultrasonido",
      "Disminuye inflamación y sangrado de encías",
      "Incluye pulido y plan de cuidado en casa",
    ],
    note: "Recomendado cada 6 meses o según valoración periodontal.",
    waText: "Higiene / Limpieza: quiero agendar valoración",
  },
  {
    to: "/servicios#servicio-ortodoncia",
    t: "Alineación",
    d: "Brackets o alineadores",
    emoji: "😬",
    subtitle: "Ortodoncia para función y estética",
    bullets: [
      "Brackets metálicos/estéticos o alineadores",
      "Plan personalizado con controles periódicos",
      "Mejora de mordida y alineación",
    ],
    note: "Confirmamos sistema ideal (brackets vs. alineadores) en una cita de diagnóstico.",
    waText: "Ortodoncia: información sobre brackets/alineadores",
  },
  {
    to: "/servicios#servicio-resinas",
    t: "Estética",
    d: "Resinas, coronas, carillas",
    emoji: "✨",
    subtitle: "Diseño de sonrisa conservador",
    bullets: [
      "Resinas del color del diente",
      "Carillas y contorneado estético",
      "Coronas de alta durabilidad",
    ],
    note: "Mostramos opciones con mock-up/guía de tono para resultados naturales.",
    waText: "Estética dental: quiero opciones de carillas/resinas",
  },
  {
    to: "/servicios#servicio-implantes",
    t: "Reemplazar pieza",
    d: "Implantes dentales",
    emoji: "🦷",
    subtitle: "Solución fija, estable y estética",
    bullets: [
      "Planeación con estudios 3D",
      "Conserva el hueso y la función masticatoria",
      "Corona con apariencia natural",
    ],
    note: "Verificamos calidad ósea y salud general antes de indicar el implante.",
    waText: "Implantes: soy candidato? Quiero valoración",
  },
  {
    to: "/#agendar",
    t: "Urgencia hoy",
    d: "Te buscamos un espacio",
    emoji: "⏱️",
    subtitle: "¿Dolor o molestia urgente?",
    bullets: [
      "Priorizamos atención el mismo día",
      "Manejo del dolor y diagnóstico rápido",
      "Indicaciones claras y seguimiento",
    ],
    note: "Si presentas fiebre o inflamación severa, indícalo en el mensaje.",
    waText: "Urgencia hoy: tengo dolor, ¿me apoyan con una cita?",
    ctaLabel: "Pedir espacio ahora",
  },
  {
    to: "/#faq",
    t: "Tengo dudas",
    d: "Resolvemos tus preguntas",
    emoji: "❓",
    subtitle: "Acompañamiento antes de decidir",
    bullets: [
      "Explicamos alternativas y tiempos",
      "Qué esperar de cada tratamiento",
      "Cuidados y mantenimiento",
    ],
    note: "Comparte fotos o radiografía si la tienes: acelera el pre-análisis.",
    waText: "Tengo dudas sobre tratamientos y tiempos",
    ctaLabel: "Ver preguntas frecuentes",
  },
]

export default function QueNecesitasHoy() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  function onCardClick(e, item) {
    e.preventDefault()
    setSelected(item)
    setOpen(true)
  }

  // Cerrar con Esc
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const showWhatsApp = selected?.to?.startsWith("/servicios")

  return (
    <section className="container-px py-12">
      <h2 className="text-3xl font-bold">¿Qué necesitas hoy?</h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">Elige una opción para continuar.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.t}
            to={item.to}
            onClick={(e) => onCardClick(e, item)}
            className="card group hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-2xl">{item.emoji}</span>
              <p className="font-semibold">{item.t}</p>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{item.d}</p>
            <span className="mt-3 inline-block text-sm text-brand-300 group-hover:underline">Ver más →</span>
          </Link>
        ))}
      </div>

      {/* Modal (pop-up) */}
      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-labelledby="qn-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Contenido */}
          <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-neutral-900">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
                  {selected.emoji}
                </span>
                <div>
                  <h3 id="qn-title" className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {selected.t}
                  </h3>
                  {selected.subtitle && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">{selected.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Bullets */}
              {Array.isArray(selected.bullets) && selected.bullets.length > 0 && (
                <ul className="mt-4 list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                  {selected.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}

              {/* Nota */}
              {selected.note && (
                <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                  {selected.note}
                </p>
              )}

              {/* Acciones */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={selected.to}
                  onClick={() => setOpen(false)}
                  className="btn btn-primary"
                >
                  {selected.ctaLabel || "Ir ahora"}
                </Link>

                {/* WhatsApp solo para /servicios */}
                {(showWhatsApp || selected.waText) && (
                  <a
                    href={`https://wa.me/5215560910802?text=${encodeURIComponent(selected.waText || `Hola, quiero informes sobre: ${selected.t}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 font-semibold text-black shadow hover:bg-[#1ebe57] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                      <path fill="currentColor" d="M12.04 2a9.94 9.94 0 0 0-8.5 15.14L2 22l4.97-1.47A10 10 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-2.95.87.86-2.88-.19-.3a8.11 8.11 0 1 1 6.69 3.62Zm4.63-6.08c-.25-.13-1.46-.72-1.69-.8-.23-.09-.4-.13-.56.13-.16.25-.64.79-.78.95-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.24-.74-.65-1.24-1.46-1.38-1.7-.14-.25-.01-.38.12-.5.12-.12.25-.29.37-.43.12-.14.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.13-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.43l-.48-.01a.92.92 0 0 0-.66.31c-.23.25-.88.86-.88 2.1s.9 2.43 1.02 2.6c.13.16 1.77 2.7 4.3 3.78.6.26 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.17.21-.58.21-1.07.15-1.17-.06-.11-.23-.18-.48-.31Z" />
                    </svg>
                    WhatsApp
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn text-white"
                >
                  Cancelar
                </button>
              </div>
            </div>

            {/* Cerrar (X) */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 dark:hover:bg-neutral-800 dark:text-neutral-300"
              aria-label="Cerrar"
              title="Cerrar"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M6.8 6.8a1 1 0 0 1 1.4 0L12 10.6l3.8-3.8a1 1 0 1 1 1.4 1.4L13.4 12l3.8 3.8a1 1 0 1 1-1.4 1.4L12 13.4l-3.8 3.8a1 1 0 1 1-1.4-1.4L10.6 12 6.8 8.2a1 1 0 0 1 0-1.4Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
