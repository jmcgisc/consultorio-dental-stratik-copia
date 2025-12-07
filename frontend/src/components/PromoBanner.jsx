import { useEffect, useState } from "react"

const KEY = "promoBannerDismissed_v1"
const DAYS = 7

export default function PromoBanner() {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (!raw) return
      const { ts } = JSON.parse(raw)
      const diffDays = (Date.now() - ts) / (1000 * 60 * 60 * 24)
      if (diffDays < DAYS) setOpen(false)
    } catch {}
  }, [])

  const dismiss = () => {
    try { localStorage.setItem(KEY, JSON.stringify({ ts: Date.now() })) } catch {}
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="bg-brand-50 border-b border-brand-100 dark:border-neutral-800">
      <div className="container-px py-2 flex items-center justify-between gap-3 text-sm">
        <p className="text-brand-700">
          <strong>Promo:</strong> Primera consulta + RX a <strong>$499</strong> esta semana.
        </p>
        <div className="flex gap-2">
          <a href="/#agendar" className="btn btn-primary">Agendar</a>
          <button onClick={dismiss} className="btn" aria-label="Cerrar promoción">✕</button>
        </div>
      </div>
    </div>
  )
}
