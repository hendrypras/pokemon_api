import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import pokemonRoute from './routes/pokemonRoute.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api', pokemonRoute)

app.get('*', (req, res) => {
  res.status(404).json({ message: 'URL Not Found', status: 404 })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
