import { Routes, Route } from "react-router-dom"
import useHashScroll from "./hooks/useHashScroll.js"
import Navbar from "./components/Navbar.jsx"
import PromoBanner from "./components/PromoBanner.jsx"
import StickyCta from "./components/StickyCta.jsx"

import Footer from "./components/Footer.jsx"          // ← nuevo
import Home from "./pages/Home.jsx"
import Servicios from "./pages/Servicios.jsx"
// import Citas from "./pages/Citas.jsx"
// import Contacto from "./pages/Contacto.jsx"
import Privacidad from "./pages/Privacidad.jsx"      // ← nuevo
import Terminos from "./pages/Terminos.jsx"          // ← nuevo
import NotFound from "./pages/NotFound.jsx"
import TrustStrip from "./components/TrustStrip.jsx" 
import ServicioDetalle from "./pages/ServicioDetalle.jsx"
import AvisoPrivacidad from "./pages/AvisoPrivacidad.jsx"
import Nosotros from "./pages/Nosotros.jsx"

export default function App() {
  useHashScroll()
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />      
      <TrustStrip />   {/* ← aquí */}
      <PromoBanner />   {/* ← banner superior */} 

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          {/* <Route path="/citas" element={<Citas />} />
          <Route path="/contacto" element={<Contacto />} /> */}
          <Route path="/politica-privacidad" element={<Privacidad />} />
          <Route path="/terminos-servicio" element={<Terminos />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/servicios/:slug" element={<ServicioDetalle />} />
          <Route path="/politica-privacidad" element={<AvisoPrivacidad />} />
          <Route path="/nosotros" element={<Nosotros />} />

        </Routes>
      </main>
      <Footer />
      <StickyCta />     {/* ← CTA pegajoso al fondo */}
    </div>
  )
}
