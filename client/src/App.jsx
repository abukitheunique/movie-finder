import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import { Film, Bookmark } from 'lucide-react'
import { useWatchlist } from './hooks/useWatchlist'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Watchlist from './pages/Watchlist'

export default function App() {
  const wl = useWatchlist()

  return (
    <BrowserRouter>
      <main className="mx-auto max-w-6xl p-4 md:p-6">
        <header className="mb-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Film className="text-orange-400" />
            <h1 className="text-2xl font-bold">Movie Finder</h1>
          </Link>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm ${isActive ? 'bg-orange-500' : 'bg-white/5 hover:bg-white/10'}`
            }
          >
            <Bookmark size={16} /> Watchlist ({wl.items.length})
          </NavLink>
        </header>

        <Routes>
          <Route path="/" element={<Home wl={wl} />} />
          <Route path="/movie/:id" element={<MovieDetails wl={wl} />} />
          <Route path="/watchlist" element={<Watchlist wl={wl} />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
