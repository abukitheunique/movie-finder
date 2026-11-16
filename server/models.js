import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    movieId: { type: Number, required: true },
    title: String,
    poster: String,
    year: String,
    rating: Number,
    myRating: { type: Number, min: 0, max: 5, default: 0 },
  },
  { timestamps: true }
)
schema.index({ userId: 1, movieId: 1 }, { unique: true })

export default mongoose.model('WatchlistItem', schema)
