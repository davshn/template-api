import { Router, Request, Response } from 'express'

import { infoController } from '../controllers/user'
import Logger from '../config/logger/winston'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req: Request, res: Response) => {
  /**
 * Post track
 * @openapi
 * /user/:
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
  try {
    const user = await infoController(req)
    res.status(200).json(user)
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al obtener datos de usuario')
  }
})

export default router
