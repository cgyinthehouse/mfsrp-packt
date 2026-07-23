import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import { eventRoutes } from './routes/events.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())
postsRoutes(app)
userRoutes(app)
eventRoutes(app)

app.get('/', (_req, res) => {
  res.send('Hello from express')
})

export { app }
