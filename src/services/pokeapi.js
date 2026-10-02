export const PAGE_LIMIT = 24

export function listUrl(page = 1) {
  const p = Math.max(1, Number(page) || 1)
  const offset = (p - 1) * PAGE_LIMIT
  return `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_LIMIT}&offset=${offset}`
}

export function detailUrl(name = '') {
  return `https://pokeapi.co/api/v2/pokemon/${String(name).toLowerCase().trim()}`
}

export function getIdFromUrl(url = '') {
  const match = String(url).match(/\/pokemon\/(\d+)\/?$/)
  return match ? Number(match[1]) : null
}

export function getImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
