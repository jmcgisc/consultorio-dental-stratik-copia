function Star({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 17.3 6.9 20l1-5.8-4.2-4.1 5.8-.9L12 4l2.6 5.2 5.8.9-4.2 4.1 1 5.8z"/>
    </svg>
  )
}

const data = [
  { nombre: "María G.", texto: "Me atendieron el mismo día y sin dolor. Súper recomendados.", estrellas: 5 },
  { nombre: "Luis P.", texto: "Excelente trato y explican todo con claridad. Volveré.", estrellas: 5 },
  { nombre: "Ana R.", texto: "La limpieza quedó increíble. Muy puntuales.", estrellas: 5 },
]

export default function Testimonios() {
  return (
    <section id="testimonios" className="container-px py-16">
      <h2 className="text-3xl font-bold">Lo que dicen nuestros pacientes</h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">
        Atención humana, resultados reales.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((t) => (
          <div key={t.nombre} className="card">
            <div className="flex gap-1 text-yellow-500">
              {Array.from({ length: t.estrellas }).map((_, i) => <Star key={i} />)}
            </div>
            <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-200">“{t.texto}”</p>
            <p className="mt-4 text-sm font-semibold">{t.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
