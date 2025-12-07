import HeroDentista from "../components/HeroDentista.jsx"
import HeroVideoDentista from "../components/HeroVideoDentista.jsx"

import ServiciosGrid from "../components/ServiciosGrid.jsx"
import AntesDespuesSection from "../components/AntesDespuesSection.jsx"
import AgendarSection from "../components/AgendarSection.jsx"
import Testimonios from "../components/Testimonios.jsx"
import UbicacionMapa from "../components/UbicacionMapa.jsx"
import FaqAccordion from "../components/FaqAccordion.jsx"
import CtaFinal from "../components/CtaFinal.jsx"
import FloatingWhatsApp from "../components/FloatingWhatsApp.jsx"
import SeoJsonLd from "../components/SeoJsonLd.jsx"
import QueNecesitasHoy from "../components/QueNecesitasHoy.jsx"        
import FinanciacionWidget from "../components/FinanciacionWidget.jsx" 
import SEO from "../components/SEO.jsx"


export default function Home() {
  return (
    <>
     <SEO
        title="Clínica dental en CDMX"
        description="Odontólogos certificados en ortodoncia, implantología, estética y más. Agenda tu valoración sin costo."
        image="/images/og/og-home.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Dentist",
            "@id": "https://www.especialistasensaludbucal.com/#clinic",
            "name": "Especialistas en Salud Bucal",
            "image": "https://www.especialistasensaludbucal.com/images/og/og-home.jpg",
            "url": "https://www.especialistasensaludbucal.com",
            "telephone": "+52 1 55 5577 0687",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Joyas 120, letra C, col. Estrella, Gustavo A. Madero",
              "addressLocality": "Ciudad de México",
              "addressRegion": "CDMX",
              "postalCode": "07810",
              "addressCountry": "MX"
            },
            "openingHoursSpecification": [
              { "@type":"OpeningHoursSpecification","dayOfWeek":["Lunes","Martes","Miercoles","Jueves","Viernes"],"opens":"10:00","closes":"19:00" },
              { "@type":"OpeningHoursSpecification","dayOfWeek":["Sabado"],"opens":"09:00","closes":"18:00" },
              { "@type":"OpeningHoursSpecification","dayOfWeek":["Domingo"],"opens":"11:00","closes":"17:00" }

            ],
            "sameAs": [
              "https://facebook.com/tuclinica",
              "https://www.instagram.com/tuclinica"
            ]
          }
        ]}
      />
      <SeoJsonLd />
      <HeroVideoDentista />
      <ServiciosGrid />
      <QueNecesitasHoy />       
      <AntesDespuesSection />
      {/* <FinanciacionWidget />     */}
      <AgendarSection />
      <Testimonios />
      <UbicacionMapa />
      <FaqAccordion />
      <CtaFinal />
      <FloatingWhatsApp />
    </>
  )
}
