import { useState } from "react"
import BeforeAfter from "./BeforeAfter.jsx"

const casos = [
  {
    before: "/images/fotos/antes_despues/dientes_antes.png",
    after:  "/images/fotos/antes_despues/dientes_despues.png",
    titulo: "Implantes dentales",
  },
  {
    before: "/images/fotos/antes_despues/blanqueamiento_antes.png",
    after:  "/images/fotos/antes_despues/blanqueamiento_despues.png",
    titulo: "Blanqueamiento dental",
  },
  {
    before: "/images/fotos/antes_despues/limpieza_antes.png",
    after:  "/images/fotos/antes_despues/limpieza_despues.png",
    titulo: "Alineadores (6 meses)",
  },
]

function SensitiveBeforeAfter({ before, after, titulo }) {
  const [reveal, setReveal] = useState(false)

  return (
    <div className="space-y-3">
      <div className="relative rounded-xl overflow-hidden">
        {/* Contenido (borroso hasta que se revele) */}
        <div className={reveal ? "" : "blur-xl"}>
          <BeforeAfter beforeSrc={before} afterSrc={after} />
        </div>

        {/* Overlay para revelar */}
        {!reveal && (
          <button
            type="button"
            onClick={() => setReveal(true)}
            className="absolute inset-0 grid place-items-center bg-neutral-900/60 text-white"
            aria-label="Mostrar imágenes sensibles"
          >
            <div className="text-center px-6">
              <div className="text-xs uppercase tracking-wider opacity-80 mb-1">
                Contenido sensible
              </div>
              <div className="font-semibold text-base sm:text-lg">
                Haz clic para mostrar
              </div>
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-neutral-900 text-sm font-medium">
                👁 Mostrar imágenes
              </div>
            </div>
          </button>
        )}

        {/* Botón opcional para volver a ocultar */}
        {reveal && (
          <button
            type="button"
            onClick={() => setReveal(false)}
            className="absolute top-2 right-2 bg-neutral-900/70 text-white text-xs px-2 py-1 rounded-md hover:bg-neutral-900"
            aria-label="Ocultar imágenes"
            title="Ocultar imágenes"
          >
            Ocultar
          </button>
        )}
      </div>

      <p className="text-sm text-neutral-700 dark:text-neutral-300">{titulo}</p>
    </div>
  )
}

export default function AntesDespuesSection() {
  return (
    <section id="antes-despues" className="container-px py-16">
      <h2 className="text-3xl font-bold">Antes y Después</h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">
        Algunas imágenes pueden resultar sensibles. Pulsa para mostrarlas.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {casos.map((c) => (
          <SensitiveBeforeAfter
            key={c.titulo}
            before={c.before}
            after={c.after}
            titulo={c.titulo}
          />
        ))}
      </div>

      <p className="text-xs text-neutral-500 mt-6">
        * Imágenes publicadas con autorización de pacientes. Los resultados pueden variar.
      </p>
    </section>
  )
}
