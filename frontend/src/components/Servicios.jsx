import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ServiciosTabs from "../components/ServiciosTabs.jsx"
import ServiciosDetallados from "../components/ServiciosDetallados.jsx"

export default function Servicios() {
  const { hash } = useLocation()
  const [active, setActive] = useState(null)

  // Sincroniza con el hash si navegan directo a /servicios#servicio-...
  useEffect(() => {
    const id = hash?.replace("#", "")
    if (id) setActive(id)
  }, [hash])

  // Al cambiar de tab, actualiza hash y estado
  const onSelect = (id) => {
    setActive(id)
    if (window.location.hash !== `#${id}`) window.history.replaceState(null, "", `#${id}`)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Para que el acordeón responda a los clicks internos
  const onOpenChange = (updater) => {
    setActive((prev) => (typeof updater === "function" ? updater(prev) : updater))
  }

  return (
    <>
      <ServiciosTabs activeId={active} onSelect={onSelect} />
      <ServiciosDetallados openId={active} onOpenChange={onOpenChange} />
    </>
  )
}
