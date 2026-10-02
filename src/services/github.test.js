import { describe, it, expect } from 'vitest'
import { prepareRepos, getLanguages } from './github.js'
import { mockRepos } from '../test/mocks.js'

describe('github service', () => {
  it('filtra los forks', () => {
    const out = prepareRepos(mockRepos)
    expect(out.find((r) => r.name === 'forkeado')).toBeUndefined()
  })

  it('ordena por estrellas descendente', () => {
    const out = prepareRepos(mockRepos)
    expect(out[0].name).toBe('mi-proyecto-js')
    expect(out[1].name).toBe('api-python')
  })

  it('extrae lenguajes únicos y ordenados', () => {
    expect(getLanguages(prepareRepos(mockRepos))).toEqual(['JavaScript', 'Python'])
  })
})
