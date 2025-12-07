import { Link } from "react-router-dom"

function Item({ id, title, short, bullets = [], desde, duracion, incluye = [], open, onToggle }) {
  return (
    <section id={id} className="scroll-mt-28">
      <button
        onClick={() => onToggle(id)}
        className="w-full text-left card flex items-center justify-between gap-4"
        aria-expanded={open}
      >
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{short}</p>
          <div className="mt-3 text-sm flex flex-wrap items-center gap-3">
            {desde && <span className="inline-flex px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100">Desde ${desde} MXN</span>}
            {duracion && <span className="inline-flex px-2.5 py-1 rounded-full ring-1 ring-neutral-200 dark:ring-neutral-800">{duracion} aprox.</span>}
          </div>
        </div>
        <span className="text-xl select-none">{open ? "–" : "+"}</span>
      </button>

      {open && (
        <div className="mt-3 card">
          {bullets?.length > 0 && (
            <>
              <p className="font-medium">Beneficios</p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
                {bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </>
          )}

          {incluye?.length > 0 && (
            <>
              <p className="font-medium mt-4">Incluye</p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
                {incluye.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/#agendar" className="btn btn-primary">Agendar</a>
            <a
              className="btn"
              href={`https://wa.me/5215560910802?text=Hola,%20quiero%20informes%20sobre%20${encodeURIComponent(title)}`}
              target="_blank" rel="noreferrer"
            >
              WhatsApp
            </a>
            <Link to="/contacto" className="btn">Contacto</Link>
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            * Precios orientativos. El costo final se confirma en valoración clínica.
          </p>
        </div>
      )}
    </section>
  )
}

const DATA = [
  {
    id: "servicio-limpieza",
    title: "Limpieza Profesional (Profilaxis)",
    short: "Previene caries y gingivitis. Sensación de limpieza profunda.",
    desde: 650,
    duracion: "30–45 min",
    bullets: [
      "Elimina placa y sarro supragingival",
      "Pulido para reducir manchas superficiales",
      "Recomendaciones personalizadas de higiene",
    ],
    incluye: ["Valoración breve", "Profilaxis completa", "Pulido y enjuague", "Plan de cuidado en casa"],
  },
  {
    id: "servicio-ortodoncia",
    title: "Ortodoncia (Brackets / Alineadores)",
    short: "Alineación dental funcional y estética.",
    desde: "consulta",
    duracion: "6–18 meses",
    bullets: [
      "Mejora mordida y estética facial",
      "Opciones: metálicos, estéticos o alineadores",
      "Revisiones mensuales o cada 6–8 semanas",
    ],
    incluye: ["Valoración ortodóncica", "Plan de tratamiento", "Opciones de financiamiento"],
  },
  {
    id: "servicio-resinas",
    title: "Resinas y Coronas",
    short: "Restauraciones estéticas de alta durabilidad.",
    desde: 1200,
    duracion: "45–90 min",
    bullets: [
      "Resinas del color del diente",
      "Coronas en cerámica/zirconia (según caso)",
      "Recupera forma y función de tu mordida",
    ],
    incluye: ["Valoración y colorimetría", "Aislamiento y adhesión", "Pulido final estético"],
  },
  {
    id: "servicio-implantes",
    title: "Implantes Dentales",
    short: "Reemplazo fijo, cómodo y natural de piezas dentales.",
    desde: "consulta",
    duracion: "2–4 meses (según oseointegración)",
    bullets: [
      "Mantiene hueso y evita desplazamientos",
      "Masticación más cómoda que prótesis removibles",
      "Materiales certificados y planificación 3D",
    ],
    incluye: ["Estudio radiográfico", "Plan quirúrgico", "Corona sobre implante (según paquete)"],
  },
]

export default function ServiciosDetallados({ openId, onOpenChange }) {
  // Abrir/cerrar secciones de forma controlada
  const handleToggle = (id) => {
    onOpenChange?.((prev) => (prev === id ? null : id))
    // Ajusta el hash y hace scroll
    const el = document.getElementById(id)
    if (el) {
      if (window.location.hash !== `#${id}`) window.history.replaceState(null, "", `#${id}`)
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="container-px py-10 space-y-6">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold">Tratamientos y servicios</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Detalle, tiempos y rangos orientativos. Agenda tu valoración para un plan a la medida.
        </p>
      </header>

      <div className="grid gap-6">
        {DATA.map((s) => (
          <Item key={s.id} {...s} open={openId === s.id} onToggle={handleToggle} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/#agendar" className="btn btn-primary">Agendar valoración</a>
        <a href="/#faq" className="btn">Ver preguntas frecuentes</a>
      </div>
    </div>
  )
}
