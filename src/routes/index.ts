import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerSetup from '../docs/swagger'
import user from './user'

const router = Router({ strict: true })

router.use('/user', user)

// Documentation
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

export default router
