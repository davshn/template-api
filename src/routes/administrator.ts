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

export default router
