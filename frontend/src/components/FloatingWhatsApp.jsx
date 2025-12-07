export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/5215560910802?text=Hola,%20quiero%20agendar%20una%20cita"
      target="_blank" rel="noreferrer"
      className="fixed bottom-5 right-5 inline-flex items-center justify-center h-12 w-12 rounded-full shadow-md bg-green-500 text-white"
      aria-label="WhatsApp"
    >
      {/* ícono simple */}
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.94 14.56L2 22l5.6-1.48A10 10 0 1 0 12 2Zm5.3 14.24c-.22.62-1.26 1.16-1.77 1.23-.46.07-1.06.1-1.71-.11-.39-.12-.9-.29-1.55-.57-2.72-1.18-4.49-3.94-4.62-4.12-.13-.18-1.1-1.47-1.1-2.8s.7-1.98.94-2.25c.24-.27.52-.34.7-.34h.5c.16 0 .37 0 .57.43.22.52.73 1.8.8 1.93.07.13.11.28.02.46-.08.18-.12.28-.24.43-.12.14-.26.32-.37.44-.12.12-.24.25-.1.5.14.25.63 1.04 1.35 1.68.93.82 1.72 1.08 1.98 1.2.26.12.42.1.58-.05.16-.15.67-.78.85-1.05.18-.27.37-.23.62-.14.25.1 1.57.74 1.84.88.27.14.45.2.52.32.07.12.07.69-.14 1.31Z"/>
      </svg>
    </a>
  )
}
