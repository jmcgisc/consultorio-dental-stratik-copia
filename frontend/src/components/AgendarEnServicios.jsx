import { useMemo, useState } from "react"
import emailjs from "@emailjs/browser"

// ENV (ponlos en tu .env local y en Vercel):
// VITE_EMAILJS_SERVICE_ID=...
// VITE_EMAILJS_TEMPLATE_ID_CLINIC=...
// VITE_EMAILJS_TEMPLATE_ID_USER=...   (opcional)
// VITE_EMAILJS_PUBLIC_KEY=...
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID_CLINIC = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLINIC
const EMAILJS_TEMPLATE_ID_USER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_USER
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function Paso({ n, titulo, desc }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-6 hover:shadow-lg dark:hover:shadow-neutral-800/30 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
          {n}
          <div className="absolute inset-0 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors"></div>
        </span>
        <div>
          <p className="font-semibold text-neutral-800 dark:text-neutral-100">{titulo}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{desc}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
    </div>
  )
}

export default function AgendarEnServicios() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [error, setError] = useState("")
  const [formKey, setFormKey] = useState(0) // fuerza remount del <form>

  // Fecha mínima = hoy (para input date)
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], [])

  async function sendEmails(data, startsISO) {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID_CLINIC || !EMAILJS_PUBLIC_KEY) {
      console.warn("[EmailJS] Falta configuración. Revisa tus variables de entorno.")
      throw new Error("EMAILJS_NOT_CONFIGURED")
    }

    const common = {
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email || "",
      motivo: data.motivo || "",
      comentarios: data.comentarios || "",
      fecha: data.fecha,
      hora: data.hora,
      starts_iso: startsISO,
      page_url: window?.location?.href || "",
      source: "seccion_servicios",
    }

    // 1) correo a clínica
    const toClinic = emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CLINIC,
      common,
      EMAILJS_PUBLIC_KEY
    )

    // 2) correo de cortesía al usuario (opcional)
    const toUser = EMAILJS_TEMPLATE_ID_USER && data.email
      ? emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_USER,
        { to_email: data.email, ...common },
        EMAILJS_PUBLIC_KEY
      )
      : Promise.resolve("skipped")

    const [clinicRes, userRes] = await Promise.allSettled([toClinic, toUser])

    const clinicOK = clinicRes.status === "fulfilled"
    const userOK = userRes === "skipped" || userRes.status === "fulfilled"

    return { clinicOK, userOK }
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setOk(false)
    setError("")

    const data = Object.fromEntries(new FormData(e.currentTarget))

    // Honeypot anti-spam
    if (data.website) {
      setOk(true)
      setLoading(false)
      setFormKey(k => k + 1)
      return
    }

    // Validación simple
    if (!data.nombre?.trim()) { setLoading(false); return setError("Por favor, escribe tu nombre.") }
    if (!/[0-9+() \-]{8,}/.test(data.telefono || "")) { setLoading(false); return setError("Teléfono no válido.") }
    if (!data.fecha) { setLoading(false); return setError("Selecciona una fecha.") }
    if (!data.hora) { setLoading(false); return setError("Selecciona una hora.") }

    try {
      const startsLocal = new Date(`${data.fecha}T${data.hora}:00`)
      const startsISO = startsLocal.toISOString()

      const { clinicOK } = await sendEmails(data, startsISO)

      if (!clinicOK) {
        setError("No pudimos enviar tu solicitud. Intenta de nuevo o contáctanos por WhatsApp.")
        return
      }

      setOk(true)
      setFormKey(k => k + 1) // limpia el formulario
    } catch (err) {
      console.error(err)
      // setError("No pudimos enviar tu solicitud. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="agendar" className="relative py-20 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-teal-200 dark:bg-teal-900/20 rounded-full blur-3xl opacity-30"></div>

      <div className="container-px relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Agenda fácil y rápido</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
            Agenda en 3 pasos simples
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Rápido, sencillo y con confirmación inmediata por WhatsApp o llamada.
          </p>
        </div>

        {/* Pasos mejorados */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Paso n={1} titulo="Elige fecha y hora" desc="Selecciona el horario que mejor te acomode." />
          <Paso n={2} titulo="Confirma tus datos" desc="Nombre y teléfono para confirmar tu cita." />
          <Paso n={3} titulo="¡Listo!" desc="Te contactamos para confirmar en minutos." />
        </div>

        {/* Mini-form mejorado */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <form key={formKey} onSubmit={onSubmit} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white dark:bg-neutral-900/80 backdrop-blur-sm rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">📅</span>
                </div>
                <p className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Solicitar cita</p>
              </div>

              {/* Honeypot anti-spam */}
              <input type="text" name="website" autoComplete="off" tabIndex="-1" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Nombre completo*</label>
                  <input
                    name="nombre"
                    required
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Teléfono*</label>
                  <input
                    name="telefono"
                    required
                    inputMode="tel"
                    pattern="[0-9+() -]{8,}"
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+52 55 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Fecha*</label>
                  <input
                    type="date"
                    name="fecha"
                    required
                    min={minDate}
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-neutral-800 dark:text-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Hora*</label>
                  <input
                    type="time"
                    name="hora"
                    required
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-neutral-800 dark:text-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Motivo de la consulta</label>
                  <select
                    name="motivo"
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-neutral-800 dark:text-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Limpieza">Limpieza dental</option>
                    <option value="Ortodoncia">Ortodoncia</option>
                    <option value="Resina/Corona">Resina/Corona</option>
                    <option value="Implante">Implante dental</option>
                    <option value="Valoración">Valoración general</option>
                    <option value="Urgencia">Urgencia dental</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Comentarios adicionales</label>
                  <textarea
                    name="comentarios"
                    rows="3"
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="¿Algo que debamos saber antes de tu visita?"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Enviando solicitud...
                  </span>
                ) : (
                  "📅 Solicitar cita ahora"
                )}
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}

              {ok && (
                <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl">
                  <p className="text-green-700 dark:text-green-400 font-medium text-sm">
                    ✅ ¡Gracias! Recibimos tu solicitud y te contactaremos para confirmar en minutos.
                  </p>
                </div>
              )}

              {/* WhatsApp alternativo */}
              <a
                className="w-full mt-4 px-6 py-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 font-medium rounded-xl hover:bg-green-200 dark:hover:bg-green-900/30 transition-all duration-200 flex items-center justify-center gap-2"
                href={`https://wa.me/5215560910802?text=${encodeURIComponent("Hola, quiero agendar una cita en la clínica dental.")}`}
                target="_blank"
                rel="noreferrer"
              >
                💬 Prefiero confirmar por WhatsApp
              </a>
            </div>
          </form>

          {/* Bloque informativo lado derecho mejorado */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white dark:bg-neutral-900/80 backdrop-blur-sm rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-xl h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">⏰</span>
                </div>
                <p className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Horarios y contacto</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-100">Lun–Vie</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">10:00–14:00 - 16:00 - 20:00</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <span className="text-2xl">🌞</span>
                  <div>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-100">Sábados</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">9:00–15:00</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-100">Teléfono</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">(+52) 55 5555 5555</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20">
                  <span className="text-2xl">📍</span>
                  <div>
                    <div className="font-semibold text-neutral-800 dark:text-neutral-100">Dirección</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">Joyas 120, letra C, col. Estrella, Gustavo A. Madero, 07810 Ciudad de México, CDMX • Esquina con Calle Turquesa</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  className="px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-center"
                  href="tel:+525555770687"
                >
                  📞 Llamar ahora
                </a>
                <a
                  className="px-4 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-center"
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  🗺️ Cómo llegar
                </a>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-6 text-center">
                * La hora seleccionada se confirmará según disponibilidad de agenda
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
