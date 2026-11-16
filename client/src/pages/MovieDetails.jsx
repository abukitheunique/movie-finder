import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bookmark, Clock, Star } from 'lucide-react'
import { getMovie } from '../services/api'
import StarRating from '../components/StarRating'

export default function MovieDetails({ wl }) {
  const { id } = useParams()
  const [state, setState] = useState({ id: null, movie: null, error: false })
  const movieId = Number(id)

  useEffect(() => {
    let cancelled = false
    getMovie(id)
      .then((movie) => !cancelled && setState({ id, movie, error: false }))
      .catch(() => !cancelled && setState({ id, movie: null, error: true }))
    return () => {
      cancelled = true
    }
  }, [id])

  const loading = state.id !== id
  const { movie, error } = state
  const saved = wl.has(movieId)
  const item = wl.get(movieId)

  return (
    <>
      <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100">
        <ArrowLeft size={16} /> Back
      </Link>

      {loading && <p className="opacity-60">Loading...</p>}
      {!loading && error && <p className="text-red-300">Could not load this movie.</p>}

      {!loading && movie && (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          {movie.backdrop && <img src={movie.backdrop} alt="" className="h-56 w-full object-cover opacity-60 md:h-72" />}
          <div className="flex flex-col gap-6 p-5 md:flex-row">
            {movie.poster && <img src={movie.poster} alt={movie.title} className="w-44 shrink-0 rounded-2xl" />}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">
                {movie.title} <span className="text-xl font-normal opacity-60">({movie.year})</span>
              </h1>
              {movie.tagline && <p className="mt-1 italic opacity-60">{movie.tagline}</p>}

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm opacity-80">
                <span className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" /> {movie.rating} / 10
                </span>
                {movie.runtime > 0 && (
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {movie.runtime} min
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span key={g} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                    {g}
                  </span>
                ))}
              </div>

              <p className="mt-4 leading-relaxed opacity-90">{movie.overview}</p>

              <div className="mt-5 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => wl.toggle(movie)}
                  className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 font-semibold hover:bg-orange-400"
                >
                  <Bookmark size={16} className={saved ? 'fill-white' : ''} />
                  {saved ? 'In watchlist' : 'Add to watchlist'}
                </button>
                {saved && (
                  <div>
                    <p className="mb-1 text-xs opacity-60">Your rating</p>
                    <StarRating value={item?.myRating || 0} onChange={(v) => wl.rate(movieId, v)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
