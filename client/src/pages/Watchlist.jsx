import { Link } from 'react-router-dom'
import { Trash2, Star } from 'lucide-react'
import StarRating from '../components/StarRating'

export default function Watchlist({ wl }) {
  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">My Watchlist ({wl.items.length})</h2>
      {wl.items.length === 0 && <p className="opacity-60">Nothing saved yet. Tap the bookmark on any movie.</p>}

      <div className="space-y-3">
        {wl.items.map((i) => (
          <div key={i.movieId} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3">
            <Link to={`/movie/${i.movieId}`}>
              {i.poster ? (
                <img src={i.poster} alt={i.title} className="h-24 w-16 rounded-lg object-cover" />
              ) : (
                <div className="h-24 w-16 rounded-lg bg-white/10" />
              )}
            </Link>
            <div className="min-w-0 flex-1">
              <Link to={`/movie/${i.movieId}`} className="block truncate font-semibold hover:text-orange-300">
                {i.title}
              </Link>
              <p className="flex items-center gap-2 text-xs opacity-60">
                {i.year}
                <Star size={12} className="fill-yellow-400 text-yellow-400" /> {i.rating}
              </p>
              <div className="mt-2">
                <StarRating value={i.myRating} onChange={(v) => wl.rate(i.movieId, v)} />
              </div>
            </div>
            <button onClick={() => wl.toggle({ id: i.movieId })} title="Remove" className="p-2 opacity-60 hover:text-red-300 hover:opacity-100">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
