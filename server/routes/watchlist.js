import { Router } from 'express'
import Item from '../models.js'

const router = Router()

router.use((req, res, next) => {
  const id = req.header('x-user-id')
  if (!id || id.length < 8 || id.length > 64) return res.status(400).json({ error: 'Missing user id' })
  req.userId = id
  next()
})

router.get('/', async (req, res, next) => {
  try {
    res.json(await Item.find({ userId: req.userId }).sort({ createdAt: -1 }))
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { movieId, title, poster, year, rating } = req.body
    if (!Number.isInteger(movieId)) return res.status(400).json({ error: 'movieId required' })
    const item = await Item.findOneAndUpdate(
      { userId: req.userId, movieId },
      { $setOnInsert: { title, poster, year, rating } },
      { upsert: true, new: true }
    )
    res.status(201).json(item)
  } catch (e) {
    next(e)
  }
})

router.patch('/:movieId', async (req, res, next) => {
  try {
    const myRating = Number(req.body.myRating)
    if (!(myRating >= 0 && myRating <= 5)) return res.status(400).json({ error: 'Rating must be 0-5' })
    const item = await Item.findOneAndUpdate(
      { userId: req.userId, movieId: Number(req.params.movieId) },
      { myRating },
      { new: true }
    )
    if (!item) return res.status(404).json({ error: 'Not in watchlist' })
    res.json(item)
  } catch (e) {
    next(e)
  }
})

router.delete('/:movieId', async (req, res, next) => {
  try {
    await Item.deleteOne({ userId: req.userId, movieId: Number(req.params.movieId) })
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

export default router
