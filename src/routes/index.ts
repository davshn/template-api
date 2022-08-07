import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerSetup from '../docs/swagger'
import user from './user'

const router = Router()

router.use('/user', user)
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

export default router
