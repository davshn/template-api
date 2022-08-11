import { Router, Request, Response } from 'express'

import versionProtection from '../middlewares/authentication/verifyVersion'
import { validateLogin, validateRegister } from '../middlewares/validations/authentication'
import { loginController, registerController } from '../controllers/authentication'

const router = Router()
router.post('/register', versionProtection, validateRegister, async (req: Request, res: Response) => {
  /**
   * Post track
   * @openapi
   * /authentication/register:
   *    post:
   *      tags:
   *        - Authentication
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
    console.log(error)
    res.status(400).send('Usuario ya registrado')
  }
})

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
