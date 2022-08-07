import { Router, Request, Response } from 'express'

import { registerController } from '../controllers/user'
import { validateRegister } from '../middlewares/validations/user'
import versionProtection from '../middlewares/authentication/verifyVersion'

const router = Router()

router.post('/register', versionProtection, validateRegister, async (req: Request, res: Response) => {
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
 *        '400':
 *          description: Bad request.
 *        '422':
 *          description: Validation Error.
 *        '426':
 *          description: Upgrade Required.
 */
  try {
    await registerController(req)
    res.status(201).send('Usuario registrado con exito')
  } catch (error) {
    res.status(400).send('Usuario ya registrado')
  }
})

export default router
