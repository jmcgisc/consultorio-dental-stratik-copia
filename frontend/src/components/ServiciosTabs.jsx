export default function ServiciosTabs({ activeId, onSelect }) {
  const items = [
    { id: "servicio-limpieza",   label: "Limpieza" },
    { id: "servicio-ortodoncia", label: "Ortodoncia" },
    { id: "servicio-resinas",    label: "Resinas/Coronas" },
    { id: "servicio-implantes",  label: "Implantes" },
  ]

  return (
    <div className="container-px pt-10">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-2 overflow-x-auto">
        <div className="flex gap-2">
          {items.map(({ id, label }) => {
            const active = activeId === id
            return (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition
                  ${active
                    ? "bg-brand-500 text-white"
                    : "bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 hover:bg-brand-50"}`}
                aria-pressed={active}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
