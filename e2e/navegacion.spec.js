import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/**', async (route) => {
    await route.fulfill({
      json: [
        {
          id: 1,
          name: 'mi-proyecto-js',
          description: 'Proyecto de prueba',
          html_url: 'https://github.com/benjamiusduoc/mi-proyecto-js',
          homepage: '',
          stargazers_count: 10,
          language: 'JavaScript',
          fork: false,
        },
      ],
    })
  })
  await page.route('https://pokeapi.co/**', async (route) => {
    await route.fulfill({ json: { count: 0, results: [] } })
  })
})

test('título, menú y link a GitHub', async ({ page }) => {
  await page.goto('/#/')
  await expect(page.getByText(/Hola, soy/i)).toBeVisible()
  await page.getByRole('link', { name: /portafolio/i }).click()
  await expect(page.getByText('mi-proyecto-js')).toBeVisible()
  await page.getByRole('link', { name: /pokédex/i }).click()
  await expect(page.getByRole('heading', { name: /pokédex/i })).toBeVisible()
})

test('página 404', async ({ page }) => {
  await page.goto('/#/ruta-que-no-existe')
  await expect(page.getByText(/404/i)).toBeVisible()
})

test('portafolio muestra repos de GitHub', async ({ page }) => {
  await page.goto('/#/portafolio')
  await expect(page.getByText('mi-proyecto-js')).toBeVisible()
  await expect(page.getByText(/github/i).first()).toBeVisible()
})
