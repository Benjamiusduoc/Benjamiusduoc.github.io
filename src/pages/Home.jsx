import { Link } from 'react-router'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section id="inicio" className="hero-section">
        <div className="hero-content">
          <h1>
            Hola, soy <span>Benjamin Salgado</span>
          </h1>
          <p>Desarrollador Fullstack con experiencia en tecnologías modernas.</p>
          <div className="hero-buttons">
            <Link to="/portafolio" className="btn primary">
              Ver proyectos
            </Link>
            <Link to="/pokedex" className="btn secondary">
              Ver Pokédex
            </Link>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="section">
        <h2>Sobre mí</h2>
        <p>
          Tengo 21 años, experiencia en el desarrollo de aplicaciones web utilizando tecnologías
          como React, Node.js, Python, Java y JavaScript.
        </p>
        <ul>
          <li>Portafolio conectado a la API de GitHub</li>
          <li>Pokédex conectada a PokeAPI con paginación y buscador</li>
          <li>Pruebas con Vitest y Playwright</li>
        </ul>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="section contact">
        <h2>Contacto</h2>
        <p>¿Tienes un proyecto en mente? Escríbeme.</p>
        <a href="mailto:benjamius123@gmail.com" className="btn primary">
          Enviar mensaje
        </a>
      </section>
    </>
  )
}
