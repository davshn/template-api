import { Router, Request, Response } from 'express'

import { validateLogin, validateRegister } from '../middlewares/validations/authentication'
import { loginController, registerController } from '../controllers/authentication'
import { bruteLimiter } from '../config/rateLimiter'
import Logger from '../config/logger/winston'

const router = Router()
router.post('/register', validateRegister, async (req: Request, res: Response) => {
  try {
    await registerController(req)
    res.status(201).send('Usuario registrado con exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Usuario ya registrado')
  }
})
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
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 *        '426':
 *          $ref: "#/components/responses/426"
 */

router.post('/login', bruteLimiter, validateLogin, async (req: Request, res: Response) => {
  try {
    const loggedUser = await loginController(req)
    res.status(200).json(loggedUser)
  } catch (error: any) {
    Logger.error(error)
    res.status(400).json(error.message)
  }
})
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
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 *        '426':
 *          $ref: "#/components/responses/426"
 */

export default router
