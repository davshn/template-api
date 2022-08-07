import { body } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import validateResults from './validateResults'

export const validateRegister = [
  body('name', 'Nombre incorrecto')
    .exists()
    .isString()
    .isLength({ min: 3, max: 12 }),
  body('lastname', 'Apellido incorrecto')
    .exists()
    .isString()
    .isLength({ min: 3, max: 12 }),
  body('documentNumber', 'Numero de documento incorrecto')
    .exists()
    .isInt(),
  body('documentType', 'Tipo de documento incorrecto')
    .exists()
    .isIn(['CC', 'NI', 'CE']),
  body('email', 'Email incorrecto')
    .exists()
    .isEmail(),
  body('password', 'Contraseña incorrecta')
    .exists()
    .isString()
    .isStrongPassword(),
  body('phone', 'Telefono incorrecto')
    .exists()
    .isInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]
