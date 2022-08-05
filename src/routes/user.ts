/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

const router = Router()

router.get('/info', async (_req, res) => {
  res.status(200).send('hola')
})

export default router
/**
 * Post track
 * @openapi
 * /user/register:
 *    post:
 *      tags:
 *        - User
 *      summary: "User register"
 *      description: Register a new user
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/newUser"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 */
