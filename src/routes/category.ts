import { Router, Request, Response } from 'express'

import Logger from '../config/logger/winston'

import categoryController from '../controllers/categoryController'
import { validateToken } from '../middlewares/validations/authentication'
import { verifyAdminRole } from '../middlewares/authentication/verifyRole'
import { validateCreateCategory } from '../middlewares/validations/category'

const router = Router()

router.post('/create', validateToken, validateCreateCategory, verifyAdminRole, async (req: Request, res: Response) => {
  try {
    await categoryController.create(req)
    res.status(201).json('Categoria creada con exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al crear categoria')
  }
})

export default router
