import { useEffect, useState } from 'react'

export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loadedUrl, setLoadedUrl] = useState(null)

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()

    async function load() {
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`)
        }
        const json = await res.json()
        setData(json)
        setError(null)
        setLoadedUrl(url)
      } catch (e) {
        if (e.name === 'AbortError') return
        setError(e)
      }
    }

    load()
    return () => controller.abort()
  }, [url])

  const loading = Boolean(url) && url !== loadedUrl && !error
  // Si hubo error pero la URL cambió, volvemos a estar cargando
  return { data, error, loading }
}
