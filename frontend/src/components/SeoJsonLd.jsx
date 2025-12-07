export default function SeoJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Clínica Dental",
    "url": "https://tu-dominio.mx/",
    "logo": "https://tu-dominio.mx/logo.png",
    "image": "https://tu-dominio.mx/og-image.jpg",
    "telephone": "+52-55-0000-0000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Principal 123, Piso 2",
      "addressLocality": "Ciudad de México",
      "postalCode": "00000",
      "addressCountry": "MX"
    },
    "openingHours": "Mo-Fr 09:00-19:00, Sa 09:00-14:00",
    "sameAs": [
      "https://facebook.com/tuclinica",
      "https://instagram.com/tuclinica"
    ],
    "priceRange": "$$"
  }
  return (
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
