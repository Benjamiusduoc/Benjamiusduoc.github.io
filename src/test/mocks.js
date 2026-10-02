import { vi } from 'vitest'

export const mockRepos = [
  {
    id: 1,
    name: 'mi-proyecto-js',
    description: 'Proyecto de prueba',
    html_url: 'https://github.com/benjamiusduoc/mi-proyecto-js',
    homepage: 'https://demo.example.com',
    stargazers_count: 10,
    language: 'JavaScript',
    fork: false,
  },
  {
    id: 2,
    name: 'api-python',
    description: 'API en python',
    html_url: 'https://github.com/benjamiusduoc/api-python',
    homepage: '',
    stargazers_count: 5,
    language: 'Python',
    fork: false,
  },
  {
    id: 3,
    name: 'forkeado',
    description: 'No debe aparecer',
    html_url: 'https://github.com/benjamiusduoc/forkeado',
    homepage: '',
    stargazers_count: 100,
    language: 'JavaScript',
    fork: true,
  },
]

export const mockPokemonList = {
  count: 1302,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  ],
}

export const mockPikachu = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default: 'https://example.com/pikachu.png',
    other: { 'official-artwork': { front_default: 'https://example.com/pikachu-art.png' } },
  },
  types: [{ type: { name: 'electric' } }],
  stats: [
    { stat: { name: 'hp' }, base_stat: 35 },
    { stat: { name: 'attack' }, base_stat: 55 },
  ],
}

export function installFetchMock() {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url) => {
      const u = String(url)
      if (u.includes('api.github.com')) {
        return { ok: true, status: 200, statusText: 'OK', json: async () => mockRepos }
      }
      if (u.includes('/pokemon/pikachu')) {
        return { ok: true, status: 200, statusText: 'OK', json: async () => mockPikachu }
      }
      if (u.includes('/pokemon/noexiste')) {
        return { ok: false, status: 404, statusText: 'Not Found', json: async () => ({}) }
      }
      if (u.includes('pokeapi.co/api/v2/pokemon?')) {
        return { ok: true, status: 200, statusText: 'OK', json: async () => mockPokemonList }
      }
      if (/\/pokemon\/[^/]+\/?$/.test(u)) {
        return { ok: false, status: 404, statusText: 'Not Found', json: async () => ({}) }
      }
      return { ok: true, status: 200, statusText: 'OK', json: async () => ({}) }
    }),
  )
}
