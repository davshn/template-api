import express from 'express'
import cors from 'cors'

import { error404, generalErrorHandler } from './middlewares/errors'
import corsConfig from './middlewares/cors'
import routes from './routes'

const server = express()

// Middlewares
server.use(cors(corsConfig))
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

// Routes
server.use('/', routes)

// Error handlers.
server.use(error404)
server.use(generalErrorHandler)

export default server
