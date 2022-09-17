import { Router, Request, Response } from 'express'

import { bruteLimiter } from '../config/rateLimiter'
import Logger from '../config/logger/winston'

import { validateLogin, validateVersion, validateRegister, validateRefresh, validateLogout, validateToken, validateVerify } from '../middlewares/validations/authentication'
import versionProtection from '../middlewares/authentication/verifyVersion'
import { verifyRefresh, verifyAuthentication } from '../middlewares/authentication/verifyTokens'
import authentication from '../controllers/authentication'

const router = Router()
router.post('/register', validateVersion, validateRegister, versionProtection, async (req: Request, res: Response) => {
  try {
    await authentication.registerController(req)
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

router.post('/login', bruteLimiter, validateVersion, validateLogin, versionProtection, async (req: Request, res: Response) => {
  try {
    const loggedUser = await authentication.loginController(req)
    res.status(200).json(loggedUser)
  } catch (error: any) {
    const email = req.body.email as string
    Logger.error(error.message as string + email)
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

router.post('/refresh', validateVersion, validateRefresh, versionProtection, verifyRefresh, async (req: Request, res: Response) => {
  try {
    const loggedUser = await authentication.refreshController(req)
    res.status(200).json(loggedUser)
  } catch (error: any) {
    const ip = req.headers['x-forwarded-for'] as string ?? req.socket.remoteAddress
    Logger.error((error.message as string) + ' ' + ip)
    res.status(400).json(error.message)
  }
})
/**
 * Post track
 * @openapi
 * /authentication/refresh:
 *    post:
 *      tags:
 *        - Authentication
 *      summary: "User refresh token"
 *      description: Refresh token user
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              name: refreshToken
 *              schema:
 *                $ref: "#/components/schemas/userRefresh"
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

router.post('/logout', validateVersion, validateLogout, validateToken, versionProtection, verifyAuthentication, async (req: Request, res: Response) => {
  try {
    await authentication.logoutController(req)
    res.status(200).send('Usuario desconectado con exito')
  } catch (error: any) {
    res.status(400).json(error.message)
  }
})
/**
 * Post track
 * @openapi
 * /authentication/logout:
 *    post:
 *      tags:
 *        - Authentication
 *      summary: "User logout"
 *      description: Logout user
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
 *                $ref: "#/components/schemas/userLogout"
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '401':
 *          $ref: "#/components/responses/401"
 *        '422':
 *          $ref: "#/components/responses/422"
 *        '426':
 *          $ref: "#/components/responses/426"
 */

router.get('/verify/:verifyToken/:email', validateVerify, async (req: Request, res: Response) => {
  try {
    await authentication.verifyController(req)
    res.status(201).send('Usuario verificado con exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al verificar')
  }
})
/**
 * Post track
 * @openapi
 * /authentication/verify/{verifyToken}/{email}:
 *    get:
 *      tags:
 *        - Authentication
 *      summary: "User verify"
 *      description: Verify user
 *      parameters:
 *       - in: path
 *         name: verifyToken
 *         schema:
 *         type: string
 *         required: true
 *       - in: path
 *         name: email
 *         schema:
 *         type: string
 *         required: true
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '401':
 *          $ref: "#/components/responses/401"
 *        '422':
 *          $ref: "#/components/responses/422"
 */

export default router
