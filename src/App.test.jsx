import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from './App.jsx'
import { installFetchMock } from './test/mocks.js'

function renderAt(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
    installFetchMock()
  })

  it('muestra el home y navega al portafolio', async () => {
    const user = userEvent.setup()
    renderAt('/')
    expect(screen.getByText(/Hola, soy/i)).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: /portafolio/i }))
    expect(await screen.findByText('mi-proyecto-js')).toBeInTheDocument()
  })

  it('filtra proyectos por lenguaje', async () => {
    const user = userEvent.setup()
    renderAt('/portafolio')
    expect(await screen.findByText('mi-proyecto-js')).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText(/filtrar por lenguaje/i), 'Python')
    expect(screen.queryByText('mi-proyecto-js')).not.toBeInTheDocument()
    expect(screen.getByText('api-python')).toBeInTheDocument()
  })

  it('lista la pokédex y abre el detalle', async () => {
    const user = userEvent.setup()
    renderAt('/pokedex')
    expect(await screen.findByText('Bulbasaur')).toBeInTheDocument()
    const links = screen.getAllByRole('link', { name: /ver detalle/i })
    await user.click(links[1])
    expect(await screen.findByText(/Pikachu.*25/)).toBeInTheDocument()
  })

  it('muestra 404 y error de pokémon inexistente', async () => {
    renderAt('/ruta-que-no-existe')
    expect(screen.getByText(/404/i)).toBeInTheDocument()
    renderAt('/pokedex/noexiste')
    expect(await screen.findByText(/no encontrado/i)).toBeInTheDocument()
  })
})
