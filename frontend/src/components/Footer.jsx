import { Link } from "react-router-dom"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-teal-200 dark:bg-teal-900 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="container-px py-16 border-b border-neutral-200 dark:border-neutral-700">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Mantente informado</span>
            </div>
            <h3 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4">
              Tu sonrisa es nuestra prioridad
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
              Suscríbete para recibir consejos de salud dental y promociones exclusivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="tu.email@ejemplo.com"
                className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container-px py-16 grid gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-white">🦷</span>
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                  Clínica Dental Premium
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Excelencia en cuidado dental desde 2010
                </p>
              </div>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-md">
              Ofrecemos tratamientos dentales de última generación con un enfoque personalizado. 
              Tu comodidad y satisfacción son nuestra máxima prioridad.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: '🏥', label: 'Certificados', text: 'Médicos certificados' },
                { icon: '⏰', label: 'Horario', text: 'Atención inmediata' },
                { icon: '💎', label: 'Calidad', text: 'Materiales premium' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white dark:bg-neutral-800 px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">{item.label}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-500">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Reemplazo de 'Navegación rápida' por enlace a Nosotros ---- */}
          <div>
            <p className="font-bold text-lg mb-6 text-neutral-800 dark:text-white flex items-center gap-2">
              <span className="w-3 h-0.5 bg-blue-500 rounded-full"></span>
              Conócenos
            </p>
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-5">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Descubre nuestras instalaciones, equipo y filosofía de atención.
              </p>
              <Link
                to="/nosotros"
                className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow"
              >
                Ir a la página de Nosotros <span>→</span>
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <p className="font-bold text-lg mb-6 text-neutral-800 dark:text-white flex items-center gap-2">
              <span className="w-3 h-0.5 bg-green-500 rounded-full"></span>
              Contáctanos
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-lg">💬</span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-700 dark:text-neutral-300">WhatsApp</div>
                  <a href="https://wa.me/5215560910802" className="text-sm text-green-600 dark:text-green-400 hover:underline">
                    +52 55 6091 0802
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-lg">📞</span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-700 dark:text-neutral-300">Teléfono</div>
                  <a href="tel:+525555770687" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    +52 55 5577 0687
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-lg">📧</span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-700 dark:text-neutral-300">Email</div>
                  <a href="mailto:hola@clinicadental.com" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                    hola@clinicadental.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <p className="font-semibold text-neutral-700 dark:text-neutral-300 mb-3">Síguenos</p>
              <div className="flex gap-3">
                {[
                  { name: 'Facebook', color: 'bg-blue-500', icon: '📘' },
                  { name: 'Instagram', color: 'bg-pink-500', icon: '📸' },
                  { name: 'YouTube', color: 'bg-red-500', icon: '📺' },
                  { name: 'TikTok', color: 'bg-black dark:bg-white', icon: '🎵' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-10 h-10 ${social.color} text-white rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            
          </div>  
          
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500">
            <span>Desarrollado con</span>
            <span className="text-red-500">❤️</span>
            <span>por</span>
            <a href="https://stratik.com.mx" className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stratik
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 dark:border-neutral-700">
          <div className="container-px py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                <span>© {year} Especialistas en Salud Bucal. Todos los derechos reservados.</span>
                <div className="hidden md:flex items-center gap-4">
                  <a href="/politica-privacidad" className="hover:text-blue-600 transition-colors">Privacidad</a>
                  <a href="/terminos-servicio" className="hover:text-blue-600 transition-colors">Términos</a>
                  <a href="/cookies" className="hover:text-blue-600 transition-colors">Cookies</a>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500">
                <span>Desarrollado con</span>
                <span className="text-red-500">❤️</span>
                <span>por</span>
                <a href="https://stratik.com.mx" className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Stratik
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
