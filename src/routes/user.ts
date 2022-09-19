import { Router, Request, Response } from 'express'

import Logger from '../config/logger/winston'

import userController from '../controllers/userController'
import { validateToken } from '../middlewares/validations/authentication'
import { verifyAuthentication } from '../middlewares/authentication/verifyTokens'
import { validateUserEdit } from '../middlewares/validations/user'

const router = Router()

router.get('/info', validateToken, verifyAuthentication, async (req: Request, res: Response) => {
  try {
    const userInfo = await userController.info(req)
    res.status(200).json(userInfo)
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al obtener datos de usuario')
  }
})

router.put('/edit', validateToken, validateUserEdit, verifyAuthentication, async (req: Request, res: Response) => {
  try {
    await userController.edit(req)
    res.status(201).send('Edicion de usuario exitosa')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al editar usuario')
  }
})

router.delete('/delete', validateToken, verifyAuthentication, async (req: Request, res: Response) => {
  try {
    await userController.delete(req)
    res.status(201).json('Usuario borrado con exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error borrar el usuario')
  }
})

export default router
