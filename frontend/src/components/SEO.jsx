import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"

const SITE = {
  name: "Especialistas en Salud Bucal",
  domain: "https://www.especialistasensaludbucal.com",
  defaultImage: "/images/og/og-default.jpg",
  locale: "es_MX",
}

export default function SEO({
  title,
  description = "Clínica dental en CDMX con ortodoncia, implantes, resinas, endodoncia y más. Atención cálida, tecnología y precios justos, Joyas 120, letra C, col. Estrella, Gustavo A. Madero, 07810 Ciudad de México, CDMX • Esquina con Calle Turquesa.",
  image = SITE.defaultImage,
  canonical,
  type = "website",
  noindex = false,
  jsonLd = [], // uno o varios objetos JSON-LD
}) {
  const { pathname } = useLocation()
  const url = canonical || `${SITE.domain}${pathname}`
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name
  const imgAbs = image?.startsWith("http") ? image : `${SITE.domain}${image}`

  return (
    <Helmet prioritizeSeoTags>
      {/* básicos */}
      <html lang="es" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* indexación */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imgAbs} />
      <meta property="og:image:alt" content={title || SITE.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgAbs} />

      {/* JSON-LD */}
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  )
}
