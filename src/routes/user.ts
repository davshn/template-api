/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { validateRegister } from '../middlewares/validations/user'
import versionProtection from '../middlewares/authentication/verifyVersion'

const router = Router()

router.post('/register', versionProtection, validateRegister, async (_req: any, res: any) => {
  res.status(201).send('hola')
})

export default router
/**
 * Post track
 * @openapi
 * /user/register:
 *    post:
 *      tags:
 *        - User
 *      summary: "User register"
 *      description: Register a new user
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/newUser"
 *      responses:
 *        '201':
 *          description: User Created.
 *        '422':
 *          description: Validation Error.
 *        '426':
 *          description: Upgrade Required.
 */
