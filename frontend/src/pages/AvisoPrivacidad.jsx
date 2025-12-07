import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function AvisoPrivacidad() {
  // Ajusta fácilmente estos datos
  const CLINIC_NAME = "Especialistas en Salud Bucal"
  const RESPONSABLE = "Especialistas en Salud Bucal"
  const ADDRESS = "Av. Principal 123, Ciudad de México, CDMX"
  const PHONE = "(55) 0000 0000"
  const EMAIL = "especialistasensaludbucal.1@gmail.com"
  const LAST_UPDATE = "02 de octubre de 2025"

  useEffect(() => {
    document.title = `Aviso de Privacidad | ${CLINIC_NAME}`
  }, [])

  return (
    <main
      className="container-px py-12 text-neutral-800 dark:text-neutral-100"
      itemScope
      itemType="https://schema.org/PrivacyPolicy"
    >
      {/* Encabezado */}
      <section className="max-w-4xl mx-auto">
        <nav className="text-sm mb-4 text-neutral-600 dark:text-neutral-300">
          <Link to="/" className="hover:underline">Inicio</Link>
          <span className="mx-1">/</span>
          <span className="text-neutral-900 dark:text-neutral-100">Aviso de Privacidad</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Aviso de Privacidad
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Última actualización: {LAST_UPDATE}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
          >
            Imprimir / Guardar PDF
          </button>
          <a
            href="mailto:especialistasensaludbucal.1@gmail.com?subject=Solicitud%20ARCO"
            className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
          >
            Contacto de Datos Personales
          </a>
        </div>
      </section>

      {/* Índice */}
      <section className="max-w-4xl mx-auto mt-10 card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Contenido</h2>
        <ol className="mt-3 list-decimal pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
          <li><a href="#responsable" className="hover:underline">Responsable y datos de contacto</a></li>
          <li><a href="#datos" className="hover:underline">Datos personales que recabamos</a></li>
          <li><a href="#finalidades" className="hover:underline">Finalidades del tratamiento</a></li>
          <li><a href="#bases" className="hover:underline">Bases de licitud</a></li>
          <li><a href="#transferencias" className="hover:underline">Transferencias de datos</a></li>
          <li><a href="#arco" className="hover:underline">Derechos ARCO</a></li>
          <li><a href="#revocacion" className="hover:underline">Revocación del consentimiento</a></li>
          <li><a href="#limitacion" className="hover:underline">Limitación de uso o divulgación</a></li>
          <li><a href="#cookies" className="hover:underline">Cookies y tecnologías similares</a></li>
          <li><a href="#conservacion" className="hover:underline">Conservación y seguridad</a></li>
          <li><a href="#cambios" className="hover:underline">Cambios al Aviso</a></li>
          <li><a href="#aceptacion" className="hover:underline">Aceptación</a></li>
        </ol>
      </section>

      {/* Cuerpo */}
      <section className="max-w-4xl mx-auto mt-8 space-y-8">

        <div id="responsable" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">1) Responsable y datos de contacto</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            {RESPONSABLE} (en lo sucesivo, “la Clínica”), con domicilio en {ADDRESS}, teléfono {PHONE} y correo
            <a className="underline ml-1" href={`mailto:${EMAIL}`}>{EMAIL}</a>, es responsable del tratamiento de sus datos personales,
            conforme a la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</strong>.
          </p>
        </div>

        <div id="datos" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">2) Datos personales que recabamos</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Podemos recabar las siguientes categorías de datos:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
            <li>Identificación y contacto: nombre, teléfono, correo electrónico.</li>
            <li>Datos de salud (sensibles) relacionados con su atención odontológica: antecedentes, diagnósticos, imágenes clínicas y radiográficas, tratamientos y evolución.</li>
            <li>Datos de facturación y/o pago cuando sea necesario.</li>
            <li>Datos de menores de edad con consentimiento del padre, madre o tutor.</li>
          </ul>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            Los datos sensibles serán tratados con medidas de seguridad reforzadas y únicamente para las finalidades que usted autorice.
          </p>
        </div>

        <div id="finalidades" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">3) Finalidades del tratamiento</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">Finalidades primarias (necesarias):</p>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
            <li>Agendar y confirmar citas; valoración, diagnóstico y prestación de servicios odontológicos.</li>
            <li>Integrar y actualizar su expediente clínico; seguimiento de tratamientos y controles.</li>
            <li>Facturación y cumplimiento de obligaciones legales o sanitarias aplicables.</li>
            <li>Atender solicitudes, consultas, quejas y aclaraciones.</li>
          </ul>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">Finalidades secundarias (opcionales):</p>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
            <li>Envío de recordatorios, información de prevención y contenidos de salud bucal.</li>
            <li>Promociones, encuestas de satisfacción y mejoras del servicio.</li>
          </ul>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            Si no desea que tratemos sus datos para finalidades secundarias, puede manifestarlo en cualquier momento escribiendo a {EMAIL}.
          </p>
        </div>

        <div id="bases" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">4) Bases de licitud</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Tratamos sus datos con base en: i) su consentimiento; ii) la necesidad para la prestación de servicios
            de salud solicitados por usted; iii) el cumplimiento de obligaciones legales y sanitarias; y iv) el interés legítimo
            para la seguridad de la información y mejora de nuestros servicios.
          </p>
        </div>

        <div id="transferencias" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">5) Transferencias de datos</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Podemos transferir datos, en lo estrictamente necesario, a:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
            <li>Laboratorios, radiólogos y profesionales de la salud que coadyuven en su tratamiento.</li>
            <li>Proveedores de TI (alojamiento, mensajería, sistemas de citas) bajo contratos de confidencialidad.</li>
            <li>Autoridades competentes cuando lo exija la ley o un mandato oficial.</li>
          </ul>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            No realizamos transferencias con fines comerciales. Para transferencias que requieran su consentimiento expreso,
            se lo solicitaremos previamente.
          </p>
        </div>

        <div id="arco" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">6) Derechos ARCO</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Usted puede <strong>Acceder</strong> a sus datos, <strong>Rectificarlos</strong> si son inexactos, <strong>Cancelarlos</strong> cuando proceda u <strong>Oponerse</strong> a su tratamiento.
            Para ejercerlos, envíe una solicitud a <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a> con:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
            <li>Nombre completo y medio para comunicarle la respuesta (correo o teléfono).</li>
            <li>Copia de identificación oficial (o del tutor tratándose de menores) y, en su caso, documento que acredite la representación.</li>
            <li>Descripción clara de los datos y del derecho que desea ejercer.</li>
            <li>Documentos que faciliten la localización de los datos (p. ej. fecha de atención, profesional tratante).</li>
          </ul>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            Le responderemos en un máximo de 20 días hábiles; de ser procedente, se hará efectivo dentro de los 15 días hábiles siguientes.
          </p>
        </div>

        <div id="revocacion" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">7) Revocación del consentimiento</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Puede revocar su consentimiento para finalidades no necesarias enviando un correo a {EMAIL}. Considere que no podremos
            atender su solicitud cuando exista una obligación legal de seguir tratando los datos o cuando sea necesario para la
            prestación del servicio de salud en curso.
          </p>
        </div>

        <div id="limitacion" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">8) Limitación de uso o divulgación</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Si desea limitar el uso o divulgación de sus datos para fines secundarios (p. ej. campañas o encuestas), solicítelo a {EMAIL}.
          </p>
        </div>

        <div id="cookies" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">9) Cookies y tecnologías similares</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Nuestro sitio puede emplear cookies para recordar preferencias, medir uso y mejorar la experiencia.
            Puede deshabilitarlas desde su navegador; al hacerlo, algunas funciones podrían verse limitadas.
          </p>
        </div>

        <div id="conservacion" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">10) Conservación y seguridad</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Conservaremos sus datos por el tiempo necesario para cumplir las finalidades informadas y conforme a disposiciones sanitarias
            y fiscales aplicables. Implementamos medidas administrativas, físicas y técnicas razonables para proteger su información
            contra daño, pérdida, alteración o acceso no autorizado.
          </p>
        </div>

        <div id="cambios" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">11) Cambios al Aviso</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Podremos actualizar este Aviso para reflejar cambios legales o de servicio. Publicaremos la versión vigente en esta misma página,
            indicando la fecha de última actualización.
          </p>
        </div>

        <div id="aceptacion" className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold">12) Aceptación</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            Al proporcionarnos sus datos, usar nuestros formularios o recibir atención en la Clínica, usted reconoce y acepta los términos
            de este Aviso de Privacidad.
          </p>
        </div>

        {/* Pie con datos de contacto */}
        <div className="max-w-4xl mx-auto mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          <p><strong>Departamento de Datos Personales</strong> — {RESPONSABLE}</p>
          <p>{ADDRESS} • Tel. {PHONE} • <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
      </section>
    </main>
  )
}
