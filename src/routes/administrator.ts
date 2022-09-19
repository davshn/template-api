import { Router, Request, Response } from 'express'

import Logger from '../config/logger/winston'

import administratorController from '../controllers/administratorController'
import { validateToken } from '../middlewares/validations/authentication'
import { verifyAdminRole } from '../middlewares/authentication/verifyRole'
import { validateBanUser, validateSort, validateSearch } from '../middlewares/validations/administrator'
import { validatePagination } from '../middlewares/validations/validateGeneric'

const router = Router()

router.patch('/banUser', validateToken, validateBanUser, verifyAdminRole, async (req: Request, res: Response) => {
  try {
    await administratorController.banUser(req)
    res.status(201).json('Usuario modificado con exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al modificar usuario')
  }
})

router.get('/listUsers', validateToken, validatePagination, validateSort, validateSearch, verifyAdminRole, async (req: Request, res: Response) => {
  try {
    const users = await administratorController.listUsers(req)
    res.status(200).json(users)
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al listar usuarios')
  }
})

export default router
