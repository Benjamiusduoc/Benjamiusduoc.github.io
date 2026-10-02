import { useState } from 'react'
import useFetch from '../hooks/useFetch.js'
import { GITHUB_API_URL, PROFILE_URL, prepareRepos, getLanguages } from '../services/github.js'

export default function Portfolio() {
  const { data, error, loading } = useFetch(GITHUB_API_URL)
  const [filter, setFilter] = useState('Todos')

  if (loading) return <section className="section"><h2>Portafolio</h2><p>Cargando proyectos…</p></section>
  if (error) return <section className="section"><h2>Portafolio</h2><p>Error: {error.message}</p></section>

  const repos = prepareRepos(data)
  const languages = ['Todos', ...getLanguages(repos)]
  const filtered = filter === 'Todos' ? repos : repos.filter((r) => r.language === filter)

  return (
    <section className="section">
      <h2>Portafolio</h2>
      <p>
        Proyectos desde <a href={PROFILE_URL} target="_blank" rel="noreferrer">GitHub</a>.
      </p>

      <label htmlFor="lang-filter">Filtrar por lenguaje: </label>
      <select
        id="lang-filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        {languages.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>

      {filtered.length === 0 ? (
        <p>No hay proyectos para este filtro.</p>
      ) : (
        <div className="projects-grid">
          {filtered.map((repo) => (
            <article key={repo.id} className="project-card">
              <div className="project-image" />
              <h3>{repo.name}</h3>
              <p>{repo.description || 'Sin descripción'}</p>
              <p>
                ⭐ {repo.stargazers_count} · {repo.language || 'Sin lenguaje'}
              </p>
              <div className="project-links">
                <a href={repo.html_url} target="_blank" rel="noreferrer">Código</a>
                {repo.homepage && <a href={repo.homepage} target="_blank" rel="noreferrer">Demo</a>}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
