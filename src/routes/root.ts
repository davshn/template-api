import { Router, Request, Response } from 'express'

import Logger from '../config/logger/winston'

import root from '../controllers/root'
import { validateToken } from '../middlewares/validations/authentication'
import { verifyRootRole } from '../middlewares/authentication/verifyRole'

const router = Router()

router.post('/changeRole', validateToken, verifyRootRole, async (req: Request, res: Response) => {
  try {
    await root.changeRoleController(req)
    res.status(200).json('Exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al cambiar rol de usuario')
  }
})
/**
 * Post track
 * @openapi
 * /root/changeRole:
 *    post:
 *      tags:
 *        - Root
 *      summary: "Change user role"
 *      description: Change user role
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/changeRole"
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
