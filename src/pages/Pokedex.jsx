import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router'
import useFetch from '../hooks/useFetch.js'
import { listUrl, getIdFromUrl, getImageUrl, capitalize } from '../services/pokeapi.js'

export default function Pokedex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const { data, error, loading } = useFetch(listUrl(page))
  const [query, setQuery] = useState('')

  function goToPage(p) {
    setSearchParams(p === 1 ? {} : { page: String(p) })
  }

  function onSearch(e) {
    e.preventDefault()
    const name = query.trim().toLowerCase()
    if (name) navigate(`/pokedex/${name}`)
  }

  return (
    <section className="section">
      <h2>Pokédex</h2>

      <form onSubmit={onSearch} role="search">
        <label htmlFor="poke-search">Buscar Pokémon</label>
        <input
          id="poke-search"
          placeholder="pikachu"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando Pokémon…</p>}
      {error && <p>Error: {error.message}</p>}

      {data && (
        <>
          <div className="projects-grid">
            {data.results.map((p) => {
              const id = getIdFromUrl(p.url)
              return (
                <article key={p.name} className="project-card">
                  <img src={getImageUrl(id)} alt={p.name} width="180" height="180" loading="lazy" />
                  <h3>{capitalize(p.name)}</h3>
                  <div className="project-links">
                    <Link to={`/pokedex/${p.name}`}>Ver detalle</Link>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="hero-buttons" style={{ marginTop: '2rem' }}>
            <button
              className="btn secondary"
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
            >
              Anterior
            </button>
            <span>Página {page}</span>
            <button className="btn secondary" onClick={() => goToPage(page + 1)}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  )
}
