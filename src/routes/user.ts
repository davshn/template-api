import { Router, Request, Response } from 'express'

import { infoController } from '../controllers/user'
import verifyAuthentication from '../middlewares/authentication/verifyAuthentication'

const router = Router()

router.get('/info', verifyAuthentication, async (req: Request, res: Response) => {
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
 *          description: User information success.
 *        '400':
 *          description: Bad request.
 *        '401':
 *          description: Invalid user.
 */
  try {
    const user = await infoController(req)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).send('Error al obtener datos de usuario')
  }
})

export default router
