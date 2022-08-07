import express from 'express'

import routes from './routes'

const server = express()

// Middlewares
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

// Routes
server.use('/', routes)

export default server
