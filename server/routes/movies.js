import { Router } from 'express'

const router = Router()
const IMG = 'https://image.tmdb.org/t/p'

async function tmdb(path, params = {}) {
  const qs = new URLSearchParams({ api_key: process.env.TMDB_KEY, language: 'en-US', ...params })
  const r = await fetch(`https://api.themoviedb.org/3${path}?${qs}`)
  if (!r.ok) {
    const e = new Error(r.status === 401 ? 'TMDB key invalid' : 'TMDB request failed')
    e.status = r.status === 401 ? 500 : r.status
    throw e
  }
  return r.json()
}

const slim = (m) => ({
  id: m.id,
  title: m.title,
  year: (m.release_date || '').slice(0, 4),
  poster: m.poster_path ? `${IMG}/w342${m.poster_path}` : null,
  rating: Math.round((m.vote_average || 0) * 10) / 10,
  overview: m.overview,
})

router.get('/popular', async (req, res, next) => {
  try {
    const d = await tmdb('/movie/popular', { page: req.query.page || 1 })
    res.json({ results: d.results.map(slim), totalPages: d.total_pages })
  } catch (e) {
    next(e)
  }
})

router.get('/search', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim()
    if (!q) return res.json({ results: [], totalPages: 0 })
    const d = await tmdb('/search/movie', { query: q, page: req.query.page || 1 })
    res.json({ results: d.results.map(slim), totalPages: d.total_pages })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const m = await tmdb(`/movie/${req.params.id}`)
    res.json({
      ...slim(m),
      tagline: m.tagline,
      runtime: m.runtime,
      genres: m.genres.map((g) => g.name),
      backdrop: m.backdrop_path ? `${IMG}/w1280${m.backdrop_path}` : null,
    })
  } catch (e) {
    next(e)
  }
})

export default router
