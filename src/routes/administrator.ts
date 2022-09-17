import { Router, Request, Response } from 'express'

import Logger from '../config/logger/winston'

import administrator from '../controllers/administrator'
import { validateToken } from '../middlewares/validations/authentication'
import { verifyAdminRole } from '../middlewares/authentication/verifyRole'
import { validateBanUser } from '../middlewares/validations/administrator'

const router = Router()

router.patch('/banUser', validateToken, validateBanUser, verifyAdminRole, async (req: Request, res: Response) => {
  try {
    await administrator.banUserController(req)
    res.status(201).json('Usuario modificado con exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al modificar usuario')
  }
})
/**
 * Post track
 * @openapi
 * /administrator/banUser:
 *    patch:
 *      tags:
 *        - Administrator
 *      summary: "Ban / Unban user"
 *      description: Ban / Unban user
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/banUser"
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '401':
 *          $ref: "#/components/responses/401"
 *        '403':
 *          $ref: "#/components/responses/403"
 *        '422':
 *          $ref: "#/components/responses/422"
 */

router.get('/listUsers', validateToken, verifyAdminRole, async (req: Request, res: Response) => {
  try {
    const users = await administrator.listUsersController(req)
    res.status(200).json(users)
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al listar usuarios')
  }
})
/**
 * Post track
 * @openapi
 * /administrator/listUsers:
 *    get:
 *      tags:
 *        - Administrator
 *      summary: "List users"
 *      description: List users
 *      parameters:
 *        - in: query
 *          name: size
 *          schema:
 *          type: number
 *          required: false
 *          description: Items per page
 *        - in: query
 *          name: page
 *          schema:
 *          type: number
 *          required: false
 *          description: Page number
 *        - in: query
 *          name: orderBy
 *          schema:
 *          type: string
 *          enum: ['name', 'lastname', 'documentType', 'documentNumber', 'email', 'phone', 'profileAvatar', 'role', 'isBanned', 'isVerified']
 *          required: false
 *          description: Column name for order
 *        - in: query
 *          name: orderDirection
 *          schema:
 *          type: string
 *          enum: ['ASC', 'DESC']
 *          required: false
 *          description: Order direction
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '401':
 *          $ref: "#/components/responses/401"
 *        '403':
 *          $ref: "#/components/responses/403"
 *        '422':
 *          $ref: "#/components/responses/422"
 */

export default router
