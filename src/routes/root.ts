import { Router, Request, Response } from 'express'

import Logger from '../config/logger/winston'

import rootController from '../controllers/rootController'
import { validateToken } from '../middlewares/validations/authentication'
import { verifyRootRole } from '../middlewares/authentication/verifyRole'
import { validateChangeRole } from '../middlewares/validations/root'

const router = Router()

router.patch('/changeRole', validateToken, validateChangeRole, verifyRootRole, async (req: Request, res: Response) => {
  try {
    await rootController.changeRole(req)
    res.status(201).send('Rol cambiado con exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al cambiar rol de usuario')
  }
})

export default router
