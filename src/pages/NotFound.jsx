import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="section contact">
      <h2>404 — Página no encontrada</h2>
      <p>La ruta que buscas no existe.</p>
      <Link to="/" className="btn primary">Volver al inicio</Link>
    </section>
  )
}
