import express from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerSetup from './docs/swagger'
import routes from './routes'

const server = express()

// Middlewares
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

server.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup))
server.use('/', routes)

export default server
