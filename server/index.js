import express from 'express'
import cors from 'cors'
import movies from './routes/movies.js'

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || true }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/movies', movies)

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(err.status || 500).json({ error: err.message || 'Server error' })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`API running on http://localhost:${port}`))
