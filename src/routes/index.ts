import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'

import swaggerSetup from '../docs/swagger'

const router = Router({ strict: true })
const basename = path.basename(__filename)

fs.readdirSync(path.join(__dirname, './'))
  .filter((file: string) => file.indexOf('.') !== 0 && file !== basename).forEach((async (file: string) => {
    const route = await import(path.join(__dirname, './', file))
    router.use(`/${file.slice(0, -3)}`, route.default)
  }) as any)

// Documentation
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

export default router
