import { Router, Request, Response } from 'express'

import versionProtection from '../middlewares/authentication/verifyVersion'
import { validateLogin } from '../middlewares/validations/authentication'
import { loginController } from '../controllers/authentication'

const router = Router()

router.post('/login', versionProtection, validateLogin, async (req: Request, res: Response) => {
/**
 * Post track
 * @openapi
 * /authentication/login:
 *    post:
 *      tags:
 *        - Authentication
 *      summary: "User login"
 *      description: Login user
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
 *                $ref: "#/components/schemas/userLogin"
 *      responses:
 *        '200':
 *          description: Login Success.
 *        '400':
 *          description: Bad request.
 *        '422':
 *          description: Validation Error.
 *        '426':
 *          description: Upgrade Required.
 */
  try {
    const loggedUser = await loginController(req)
    res.status(200).json(loggedUser)
  } catch (error: any) {
    res.status(400).json(error.message)
  }
})

export default router
