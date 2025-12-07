import { useState } from "react"

// pago mensual con interés simple equivalente aproximado (mostramos rango)
function pagoMensual(monto, meses, tinAnual = 0.124) {
  const i = tinAnual / 12
  return (monto * i) / (1 - Math.pow(1 + i, -meses))
}

export default function FinanciacionWidget() {
  const [monto, setMonto] = useState(12000)
  const [meses, setMeses] = useState(12)
  const mensual = Math.round(pagoMensual(monto, meses))

  return (
    <section className="container-px py-10 card">
      <h3 className="text-xl font-semibold">Financia tu tratamiento</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Simula tu mensualidad y agenda una valoración.
      </p>

      <div className="mt-4 grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">Importe estimado</label>
          <input type="number" min={500} step={500} value={monto}
            onChange={(e)=>setMonto(+e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Meses</label>
          <select value={meses} onChange={(e)=>setMeses(+e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2">
            {[6,12,18,24,36,48].map(m=><option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <div className="w-full rounded-2xl bg-brand-50 ring-1 ring-brand-100 px-4 py-3">
            <p className="text-xs text-brand-700">Desde</p>
            <p className="text-2xl font-bold">${mensual} <span className="text-sm font-medium">/mes</span></p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <a href="/#agendar" className="btn btn-primary">Quiero financiar</a>
        <a className="btn" href="/#faq">Ver condiciones</a>
      </div>
      <p className="mt-2 text-xs text-neutral-500">
        * Simulación orientativa. Sujeto a evaluación y condiciones de la clínica.
      </p>
    </section>
  )
}
