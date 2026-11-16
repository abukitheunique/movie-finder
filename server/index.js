import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import movies from './routes/movies.js'
import watchlist from './routes/watchlist.js'

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || true }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true, db: mongoose.connection.readyState === 1 }))
app.use('/api/movies', movies)
app.use('/api/watchlist', watchlist)

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(err.status || 500).json({ error: err.message || 'Server error' })
})

const port = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => console.log(`API running on http://localhost:${port}`))
  })
  .catch((e) => {
    console.error('MongoDB connection failed:', e.message)
    process.exit(1)
  })
