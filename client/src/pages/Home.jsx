import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { searchMovies, getPopular } from '../services/api'
import MovieCard from '../components/MovieCard'

export default function Home({ wl }) {
  const [q, setQ] = useState('')
  const [movies, setMovies] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(() => {
      setStatus('loading')
      const term = q.trim()
      const req = term ? searchMovies(term) : getPopular()
      req
        .then((d) => {
          if (cancelled) return
          setMovies(d.results)
          setStatus('done')
        })
        .catch(() => !cancelled && setStatus('error'))
    }, 400)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [q])

  return (
    <>
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <Search size={18} className="opacity-60" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search movies..."
          className="w-full bg-transparent outline-none"
        />
      </div>

      <h2 className="mb-3 text-sm opacity-60">{q.trim() ? `Results for "${q.trim()}"` : 'Popular right now'}</h2>

      {status === 'error' && <p className="text-red-300">Could not load movies. Is the server running?</p>}
      {status === 'loading' && <p className="opacity-60">Loading...</p>}
      {status === 'done' && movies.length === 0 && <p className="opacity-60">No movies found.</p>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} saved={wl.has(m.id)} onToggle={wl.toggle} />
        ))}
      </div>
    </>
  )
}
