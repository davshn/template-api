import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerSetup from '../docs/swagger'
import user from './user'
import authentication from './authentication'

const router = Router({ strict: true })

router.use('/user', user)
router.use('/authentication', authentication)
// Documentation
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

export default router
