import { Router, Request, Response } from 'express'

import Logger from '../config/logger/winston'

import user from '../controllers/user'
import { validateToken } from '../middlewares/validations/authentication'
import { verifyAuthentication } from '../middlewares/authentication/verifyTokens'
import { validateUserEdit } from '../middlewares/validations/user'

const router = Router()

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

router.patch('/edit', validateToken, validateUserEdit, verifyAuthentication, async (req: Request, res: Response) => {
  try {
    await user.editController(req)
    res.status(201).send('Edicion de usuario exitosa')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al editar usuario')
  }
})
/**
 * Post track
 * @openapi
 * /user/edit:
 *    patch:
 *      tags:
 *        - User
 *      summary: "User edit"
 *      description: Change user information
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userEdit"
 *      security:
 *        - bearerAuth: []
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
