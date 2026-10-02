import { test, expect } from '@playwright/test'

const listPage1 = {
  count: 1302,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  ],
}

const listPage2 = {
  count: 1302,
  results: [{ name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' }],
}

const pikachu = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default: 'https://example.com/pikachu.png',
    other: { 'official-artwork': { front_default: 'https://example.com/pikachu-art.png' } },
  },
  types: [{ type: { name: 'electric' } }],
  stats: [{ stat: { name: 'hp' }, base_stat: 35 }],
}

test.beforeEach(async ({ page }) => {
  await page.route('**/pokemon?*', async (route) => {
    const url = route.request().url()
    await route.fulfill({ json: url.includes('offset=24') ? listPage2 : listPage1 })
  })
  await page.route('**/pokemon/pikachu', async (route) => {
    await route.fulfill({ json: pikachu })
  })
  await page.route('https://api.github.com/**', async (route) => {
    await route.fulfill({ json: [] })
  })
})

test('lista, detalle y paginación', async ({ page }) => {
  await page.goto('/#/pokedex')
  await expect(page.getByText('Bulbasaur')).toBeVisible()

  await page.getByRole('link', { name: /ver detalle/i }).nth(1).click()
  await expect(page.getByText(/Pikachu.*25/)).toBeVisible()

  await page.goto('/#/pokedex')
  await page.getByRole('button', { name: /siguiente/i }).click()
  await expect(page.getByText('Charmander')).toBeVisible()
  await expect(page).toHaveURL(/page=2/)
})

test('buscador navega al detalle', async ({ page }) => {
  await page.goto('/#/pokedex')
  await page.getByPlaceholder('pikachu').fill('pikachu')
  await page.getByRole('button', { name: /buscar/i }).click()
  await expect(page.getByText(/Pikachu.*25/)).toBeVisible()
})

test('pokémon inexistente muestra error', async ({ page }) => {
  await page.route('**/pokemon/noexiste', async (route) => {
    await route.fulfill({ status: 404, json: {} })
  })
  await page.goto('/#/pokedex/noexiste')
  await expect(page.getByText(/no encontrado/i)).toBeVisible()
})
