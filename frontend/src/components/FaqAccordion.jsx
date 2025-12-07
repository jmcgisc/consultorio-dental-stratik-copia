import { useState } from "react"

const faqs = [
  { q: "¿La limpieza duele?", a: "Generalmente no. Puede haber ligera sensibilidad; usamos técnicas delicadas y, si lo necesitas, anestesia local." },
  { q: "¿Aceptan tarjetas o meses sin intereses?", a: "Sí, aceptamos tarjetas de crédito y débito. Podemos ofrecer MSI en tratamientos seleccionados." },
  { q: "¿Atienden urgencias?", a: "Sí. Intenta llamarnos o escribir por WhatsApp para asignarte el primer espacio disponible del día." },
  { q: "¿Trabajan con niños?", a: "Sí, atendemos todas las edades con un enfoque paciente y lúdico para los peques." },
]

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4">
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-medium">{q}</span>
        <span className="ml-4 text-xl">{open ? "–" : "+"}</span>
      </button>
      {open && <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{a}</p>}
    </div>
  )
}

export default function FaqAccordion() {
  return (
    <section id="faq" className="container-px py-16">
      <h2 className="text-3xl font-bold">Preguntas frecuentes</h2>
      <div className="mt-8 grid gap-4">
        {faqs.map((f) => <Item key={f.q} {...f} />)}
      </div>
    </section>
  )
}
