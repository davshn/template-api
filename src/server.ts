import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { IpFilter } from 'express-ipfilter'

import { error404, generalErrorHandler } from './middlewares/errors'
import { rateLimiter } from './config/rateLimiter'
import corsConfig from './config/cors'
import morganMiddleware from './config/logger/morgan'

import routes from './routes'

const server = express()

const ips = ['181.56.225.34']
// Middlewares
server.use(helmet())
server.use(express.urlencoded({ extended: true, limit: '100kb' }))
server.use(express.json({ limit: '100kb' }))
server.use(morganMiddleware)
server.use(IpFilter(ips))
server.use(rateLimiter)
server.use(cors(corsConfig))

// Routes
server.use('/', routes)

// Error handlers.
server.use(error404)
server.use(generalErrorHandler)

export default server
