import { describe, it, expect } from 'vitest'
import { getIdFromUrl, listUrl, detailUrl, getImageUrl, capitalize } from './pokeapi.js'

describe('pokeapi service', () => {
  it('saca el id desde la url', () => {
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25)
  })

  it('devuelve null con url inválida', () => {
    expect(getIdFromUrl('no-es-url')).toBeNull()
  })

  it('construye la lista con limit y offset', () => {
    expect(listUrl(1)).toContain('limit=24')
    expect(listUrl(1)).toContain('offset=0')
    expect(listUrl(2)).toContain('offset=24')
  })

  it('normaliza el detalle a minúsculas', () => {
    expect(detailUrl('  Pikachu ')).toBe('https://pokeapi.co/api/v2/pokemon/pikachu')
  })

  it('capitaliza y construye imagen', () => {
    expect(capitalize('pikachu')).toBe('Pikachu')
    expect(getImageUrl(25)).toContain('/25.png')
  })
})
