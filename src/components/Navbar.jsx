import { NavLink, Link } from 'react-router'

export default function Navbar() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" style={{ fontWeight: 700, fontSize: '1.3rem' }}>
          Benjamin Salgado
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/portafolio">Portafolio</NavLink>
            </li>
            <li>
              <NavLink to="/pokedex">Pokédex</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
