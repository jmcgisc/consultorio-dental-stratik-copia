import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import ThemeToggle from "./ThemeToggle.jsx"

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [closeTimeout, setCloseTimeout] = useState(null)
  const dropdownRef = useRef(null)
  const dropdownContentRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function onDocClick(e) {
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(e.target)) setServicesOpen(false)
    }
    function onEsc(e) {
      if (e.key === 'Escape') { setServicesOpen(false); setMobileOpen(false) }
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setServicesOpen(true)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setServicesOpen(false)
    }, 500)
    setCloseTimeout(timeout)
  }

  const handleDropdownEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
  }

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setServicesOpen(false)
    }, 300)
    setCloseTimeout(timeout)
  }

  const linkBase = 'px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300'
  const isHome = location.pathname === '/'
  const link = (active) =>
    active 
      ? `${linkBase} text-brand-600 bg-brand-50 dark:bg-neutral-800` 
      : `${linkBase} text-neutral-600 dark:text-neutral-300 hover:bg-brand-50 dark:hover:bg-neutral-800`

  const anchors = {
    servicios: "/#servicios",

    // Rutas solicitadas
    limpieza: "/servicios/limpieza",
    ortodonciaAvanzada: "/servicios/ortodoncia",
    resinas: "/servicios/resinas",
    implantesDentales: "/servicios/implantes",
    protesisDental: "/servicios/protesis-dental",
    odontologiaEstetica: "/servicios/odontologia-estetica",
    cirugiaMaxilofacial: "/servicios/cirugia-maxilofacial",
    odontopediatria: "/servicios/odontopediatria",
    periodoncia: "/servicios/periodoncia",
    endodoncia: "/servicios/endodoncia",

    // Otros anchors existentes
    antesDespues: "/#antes-despues",
    testimonios: "/#testimonios",
    ubicacion: "/#ubicacion",
    faq: "/#faq",
  }

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 shadow-lg border-b border-neutral-200 dark:border-neutral-800' 
        : 'bg-white/80 dark:bg-neutral-950/60'
    }`}>
      <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"></div>
      <nav className="container px-10">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-4 shrink-0 group mr-8"
            aria-label="Ir al inicio"
          >
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <img
                src="/images/logo-especialistas-en-salud-bucal.png"
                alt="Especialistas en salud bucal"
                className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                width="160"
                height="48"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-brand-600 dark:text-neutral-600">Especialistas en Salud Bucal</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-brand-600" ref={dropdownRef}>
            {/* Dropdown Servicios */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setServicesOpen(v => !v)}
                className={`${link(false)} flex items-center gap-1 ${servicesOpen ? 'bg-brand-6000 dark:bg-neutral-800 text-brand-600' : ''}`}
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
              >
                <span>Servicios</span>
                <span className={`transform transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {servicesOpen && (
                <div 
                  className="absolute left-0 mt-2 w-72 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg p-3 animate-in fade-in-0 zoom-in-95"
                  ref={dropdownContentRef}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  style={{ marginTop: '8px' }}
                >
                  <div className="absolute -top-2 left-6 w-4 h-4 bg-white dark:bg-neutral-900 border-t border-l border-neutral-200 dark:border-neutral-800 transform rotate-45"></div>
                  
                  <div className="relative space-y-1 z-10">
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 transition-all group" 
                       href={anchors.servicios}
                       onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Vista general</span>
                    </a>

                    {/* Lista solicitada */}
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/20 text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 transition-all" href={anchors.limpieza} onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                      <span>Limpieza profesional</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-neutral-700 dark:text-neutral-300 hover:text-purple-600 transition-all" href={anchors.ortodonciaAvanzada} onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Ortodoncia Avanzada</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 transition-all" href={anchors.resinas} onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span>Resinas y Coronas</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 text-neutral-700 dark:text-neutral-300 hover:text-orange-600 transition-all" href={anchors.implantesDentales} onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span>Implantes Dentales</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 text-neutral-700 dark:text-neutral-300 hover:text-amber-600 transition-all" href={anchors.protesisDental} onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span>Protesis Dental</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 text-neutral-700 dark:text-neutral-300 hover:text-pink-600 transition-all" href={anchors.odontologiaEstetica} onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      <span>Odontologia Estética</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/20 text-neutral-700 dark:text-neutral-300 hover:text-slate-600 transition-all" href={anchors.cirugiaMaxilofacial} onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
                      <span>Cirugia maxilofacial</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 text-neutral-700 dark:text-neutral-300 hover:text-sky-600 transition-all" href={anchors.odontopediatria} onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                      <span>Odontopediatria</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 text-neutral-700 dark:text-neutral-300 hover:text-teal-600 transition-all" href={anchors.periodoncia} onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      <span>Perodoncia</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 text-neutral-700 dark:text-neutral-300 hover:text-teal-600 transition-all" href={anchors.periodoncia} onClick={() => setServicesOpen(false)}>
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      <span>Endodoncia</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a className={link(isHome)} href={anchors.antesDespues}>Antes/Después</a> 
            <a className={link(isHome)} href={anchors.testimonios}>Testimonios</a>
            <a className={link(isHome)} href={anchors.ubicacion}>Ubicación</a>
            <a className={link(isHome)} href={anchors.faq}>FAQ</a>

            <Link to="/#agendar" className="btn btn-primary ml-4 px-6 py-3 whitespace-nowrap">Reservar cita</Link>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <Link to="/#agendar" className="btn btn-primary px-4 py-2 text-sm whitespace-nowrap">Reservar</Link>
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Abrir menú"
            >
              <div className={`w-6 h-6 relative transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`}>
                <span className={`absolute top-2 left-0 w-6 h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded transition-all ${mobileOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}`}></span>
                <span className={`absolute top-2 left-0 w-6 h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded transition-all ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute top-2 left-0 w-6 h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded transition-all ${mobileOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 animate-in fade-in-0 slide-in-from-top-2">
            <div className="grid gap-3">
              <details className="group">
                <summary className={`${link(false)} cursor-pointer list-none flex items-center justify-between`}>
                  <span>Servicios</span>
                  <span className="transform transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="pl-4 mt-3 grid gap-2 border-l-2 border-neutral-200 dark:border-neutral-700 ml-3">
                  {[
                    { label: 'Vista general', href: anchors.servicios, color: 'bg-blue-500' },
                    { label: 'Limpieza profesional', href: anchors.limpieza, color: 'bg-cyan-500' },
                    { label: 'Ortodoncia Avanzada', href: anchors.ortodonciaAvanzada, color: 'bg-purple-500' },
                    { label: 'Resinas y Coronas', href: anchors.resinas, color: 'bg-emerald-500' },
                    { label: 'Implantes Dentales', href: anchors.implantesDentales, color: 'bg-orange-500' },
                    { label: 'Protesis Dental', href: anchors.protesisDental, color: 'bg-amber-500' },
                    { label: 'Odontologia Estética', href: anchors.odontologiaEstetica, color: 'bg-pink-500' },
                    { label: 'Cirugia maxilofacial', href: anchors.cirugiaMaxilofacial, color: 'bg-slate-500' },
                    { label: 'Odontopediatria', href: anchors.odontopediatria, color: 'bg-sky-500' },
                    { label: 'Ortodoncia', href: anchors.ortodonciaGeneral, color: 'bg-indigo-500' },
                    { label: 'Implantologia', href: anchors.implantologia, color: 'bg-red-500' },
                    { label: 'Perodoncia', href: anchors.periodoncia, color: 'bg-teal-500' },
                    { label: 'Ortodoncia', href: anchors.ortodonciaGeneral, color: 'bg-indigo-500' }, // repetido a solicitud
                  ].map((item, index) => (
                    <a key={index} 
                       className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-neutral-700 dark:text-neutral-300 transition-all"
                       href={item.href} 
                       onClick={() => setMobileOpen(false)}>
                      <span className={`w-2 h-2 ${item.color} rounded-full`}></span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </details>

              <a className={link(isHome)} href={anchors.antesDespues} onClick={() => setMobileOpen(false)}>Antes/Después</a> 
              <a className={link(isHome)} href={anchors.testimonios} onClick={() => setMobileOpen(false)}>Testimonios</a>
              <a className={link(isHome)} href={anchors.ubicacion} onClick={() => setMobileOpen(false)}>Ubicación</a>
              <a className={link(isHome)} href={anchors.faq} onClick={() => setMobileOpen(false)}>FAQ</a>

              <Link to="/citas" className="btn btn-primary mt-4 text-center py-3" onClick={() => setMobileOpen(false)}>
                Reservar cita
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
