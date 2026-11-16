import { useCallback, useEffect, useState } from 'react'
import { getWatchlist, addToWatchlist, removeFromWatchlist, rateMovie } from '../services/api'

export function useWatchlist() {
  const [items, setItems] = useState([])

  useEffect(() => {
    getWatchlist().then(setItems).catch(() => {})
  }, [])

  const has = useCallback((id) => items.some((i) => i.movieId === id), [items])
  const get = useCallback((id) => items.find((i) => i.movieId === id), [items])

  const toggle = async (m) => {
    if (has(m.id)) {
      await removeFromWatchlist(m.id)
      setItems((l) => l.filter((i) => i.movieId !== m.id))
    } else {
      const item = await addToWatchlist(m)
      setItems((l) => [item, ...l])
    }
  }

  const rate = async (id, value) => {
    const item = await rateMovie(id, value)
    setItems((l) => l.map((i) => (i.movieId === id ? item : i)))
  }

  return { items, has, get, toggle, rate }
}
