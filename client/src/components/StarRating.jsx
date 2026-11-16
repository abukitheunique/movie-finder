import { Star } from 'lucide-react'

export default function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} onClick={() => onChange(n === value ? 0 : n)} title={`${n} star${n > 1 ? 's' : ''}`}>
          <Star size={22} className={n <= value ? 'fill-yellow-400 text-yellow-400' : 'opacity-40'} />
        </button>
      ))}
    </div>
  )
}
