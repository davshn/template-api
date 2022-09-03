import { Router, Request, Response } from 'express'

import Logger from '../config/logger/winston'

import user from '../controllers/user'
import { validateToken } from '../middlewares/validations/authentication'
import { verifyAuthentication } from '../middlewares/authentication/verifyTokens'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/info', validateToken, verifyAuthentication, async (req: Request, res: Response) => {
  try {
    const userInfo = await user.infoController(req)
    res.status(200).json(userInfo)
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al obtener datos de usuario')
  }
})
/**
 * Post track
 * @openapi
 * /user/info:
 *    get:
 *      tags:
 *        - User
 *      summary: "User information"
 *      description: Get user information
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
 */

export default router
