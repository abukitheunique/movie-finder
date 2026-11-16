const get = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

export const getPopular = () => get('/api/movies/popular')
export const searchMovies = (q) => get(`/api/movies/search?q=${encodeURIComponent(q)}`)
export const getMovie = (id) => get(`/api/movies/${id}`)
