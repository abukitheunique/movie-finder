import { Star, ImageOff } from 'lucide-react'

export default function MovieCard({ movie }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-orange-400/50">
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
    </div>
  )
}
