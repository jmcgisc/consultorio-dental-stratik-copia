import { Link } from "react-router-dom"

export default function CtaFinal() {
  return (
    <section id="reservar" className="container-px py-16">
      <div className="card flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xl font-semibold dark:text-neutral-500">¿Listo para tu nueva sonrisa?</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-800 mt-1">
            Agenda en línea y confirma por WhatsApp. Respuesta en minutos.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 dark:text-neutral-500x">
          <Link to="/citas" className="btn btn-primary">Agendar ahora</Link>
          <a
            className="btn"
            href="tel:+52 55 5577 0687"
            aria-label="Llamar a la clínica"
          >
            Llamar
          </a>
        </div>
      </div>
    </section>
  )
}
