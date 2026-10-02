function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Tu Nombre</h1>
        <nav>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#proyectos">Proyectos</a></li>
            <li><a href="#sobre-mi">Sobre mí</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;