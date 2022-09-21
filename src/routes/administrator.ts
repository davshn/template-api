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
    res.status(201).send('Usuario baneado con exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al banear usuario')
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

router.get('/userDetail', validateToken, validateSearch, verifyAdminRole, async (req: Request, res: Response) => {
  try {
    const user = await administratorController.userDetail(req)
    res.status(200).json(user)
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Ningun usuario coincide con la busqueda')
  }
})

export default router
