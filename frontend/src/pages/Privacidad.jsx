export default function Privacidad() {
  return (
    <section className="container-px py-16 prose dark:prose-invert max-w-3xl">
      <h1>Aviso de Privacidad</h1>
      <p>
        En <strong>Clínica Dental</strong> protegemos tus datos personales conforme a la legislación vigente.
        Este aviso describe qué información recabamos, con qué propósito y cómo puedes ejercer tus derechos.
      </p>
      <h2>Datos que recabamos</h2>
      <ul>
        <li>Identificación y contacto: nombre, teléfono, correo electrónico.</li>
        <li>Datos de cita: motivo, fecha y hora solicitada, comentarios.</li>
      </ul>
      <h2>Finalidades</h2>
      <ul>
        <li>Gestionar citas y recordatorios.</li>
        <li>Atender solicitudes y brindar seguimiento.</li>
        <li>Fines estadísticos internos.</li>
      </ul>
      <h2>Transferencias</h2>
      <p>No transferimos tus datos a terceros, salvo obligación legal o proveedores para prestar el servicio (p. ej. mensajería/hosting), bajo acuerdos de confidencialidad.</p>
      <h2>Derechos ARCO</h2>
      <p>Puedes solicitar acceso, rectificación, cancelación u oposición enviando un correo a <a href="mailto:contacto@clinicadental.mx">contacto@clinicadental.mx</a>.</p>
      <h2>Conservación</h2>
      <p>Conservamos la información por el tiempo necesario para las finalidades informadas o mandatos legales aplicables.</p>
      <h2>Cambios al Aviso</h2>
      <p>Podremos actualizar este Aviso. Publicaremos la versión vigente en este sitio.</p>
      <p>Última actualización: {new Date().toLocaleDateString()}</p>
    </section>
  )
}
