import { Link, useParams } from 'react-router'
import useFetch from '../hooks/useFetch.js'
import { detailUrl, capitalize } from '../services/pokeapi.js'

export default function PokemonDetail() {
  const { name } = useParams()
  const { data, error, loading } = useFetch(detailUrl(name))

  if (loading) return <section className="section"><p>Cargando {name}…</p></section>
  if (error) {
    return (
      <section className="section">
        <h2>Pokémon no encontrado</h2>
        <p>No existe un Pokémon llamado &quot;{name}&quot;.</p>
        <p>Error: {error.message}</p>
        <Link to="/pokedex" className="btn secondary">Volver a la Pokédex</Link>
      </section>
    )
  }
  if (!data) return null

  return (
    <section className="section">
      <Link to="/pokedex">← Volver</Link>
      <h2>{capitalize(data.name)} #{data.id}</h2>
      <img
        src={data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default}
        alt={data.name}
        width="240"
        height="240"
      />
      <p>Altura: {data.height} · Peso: {data.weight}</p>
      <h3>Tipos</h3>
      <ul>
        {data.types.map((t) => (
          <li key={t.type.name}>{t.type.name}</li>
        ))}
      </ul>
      <h3>Estadísticas</h3>
      <ul>
        {data.stats.map((s) => (
          <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
        ))}
      </ul>
    </section>
  )
}
