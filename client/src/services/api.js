const BASE = import.meta.env.VITE_API_URL || ''

const get = async (url, opts) => {
  const res = await fetch(BASE + url, opts)
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

const uid = () => {
  let id = localStorage.getItem('uid')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('uid', id)
  }
  return id
}

const wl = (path = '', method = 'GET', body) =>
  get(`/api/watchlist${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', 'x-user-id': uid() },
    body: body ? JSON.stringify(body) : undefined,
  })

export const getPopular = () => get('/api/movies/popular')
export const searchMovies = (q) => get(`/api/movies/search?q=${encodeURIComponent(q)}`)
export const getMovie = (id) => get(`/api/movies/${id}`)

export const getWatchlist = () => wl()
export const addToWatchlist = (m) =>
  wl('', 'POST', { movieId: m.id, title: m.title, poster: m.poster, year: m.year, rating: m.rating })
export const removeFromWatchlist = (id) => wl(`/${id}`, 'DELETE')
export const rateMovie = (id, myRating) => wl(`/${id}`, 'PATCH', { myRating })

