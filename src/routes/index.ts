import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerSetup from '../docs/swagger'
import user from './user'
import authentication from './authentication'
import versionProtection from '../middlewares/authentication/verifyVersion'
import verifyAuthentication from '../middlewares/authentication/verifyAuthentication'
import { validateVersion, validateToken } from '../middlewares/validations/authentication'

const router = Router({ strict: true })

router.use('/user', validateToken, verifyAuthentication, user)
router.use('/authentication', validateVersion, versionProtection, authentication)

// Documentation
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

export default router
