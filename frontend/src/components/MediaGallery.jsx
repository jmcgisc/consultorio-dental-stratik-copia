import { useRef, useState } from "react"

export default function MediaGallery({ items = [] }) {
  const dlg = useRef(null)
  const [active, setActive] = useState(null)

  const open = (i) => { setActive(i); dlg.current?.showModal() }
  const close = () => dlg.current?.close()

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <button
            key={it.src}
            onClick={() => open(i)}
            className="group relative rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-300"
            aria-label={`Ampliar imagen ${i+1}`}
          >
            <img src={it.thumb || it.src} alt={it.alt || ""} className="h-48 w-full object-cover transition group-hover:scale-105" loading="lazy" />
          </button>
        ))}
      </div>

      <dialog ref={dlg} className="backdrop:bg-black/50 rounded-2xl p-0">
        {active != null && (
          <div className="relative">
            <img src={items[active].src} alt={items[active].alt || ""} className="max-h-[80svh] max-w-[90svw] object-contain" />
            <button
              onClick={close}
              className="absolute top-2 right-2 rounded-full bg-black/60 text-white px-3 py-1"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        )}
      </dialog>
    </>
  )
}
