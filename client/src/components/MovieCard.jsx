import { Link } from 'react-router-dom'
import { Star, ImageOff, Bookmark } from 'lucide-react'

export default function MovieCard({ movie, saved, onToggle }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-orange-400/50">
      <Link to={`/movie/${movie.id}`}>
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} loading="lazy" className="aspect-[2/3] w-full object-cover" />
        ) : (
          <div className="flex aspect-[2/3] items-center justify-center bg-white/5 opacity-40">
            <ImageOff />
          </div>
        )}
        <div className="p-3">
          <p className="truncate font-semibold" title={movie.title}>
            {movie.title}
          </p>
          <div className="mt-1 flex items-center justify-between text-xs opacity-70">
            <span>{movie.year || 'N/A'}</span>
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" /> {movie.rating}
            </span>
          </div>
        </div>
      </Link>
      <button
        onClick={() => onToggle(movie)}
        title={saved ? 'Remove from watchlist' : 'Add to watchlist'}
        className="absolute right-2 top-2 rounded-full bg-black/60 p-2 backdrop-blur hover:bg-black/80"
      >
        <Bookmark size={16} className={saved ? 'fill-orange-400 text-orange-400' : ''} />
      </button>
    </div>
  )
}
