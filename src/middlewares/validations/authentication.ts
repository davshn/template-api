import { body, header } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import validateResults from './validateResults'

export const validateLogin = [
  body('email', 'Se requiere un email valido')
    .exists()
    .isEmail(),
  body('password', 'Contraseña no valida')
    .exists()
    .isString()
    .isStrongPassword(),
  body('deviceInfo', 'La informacion del dispositivo es requerida')
    .exists()
    .isString()
    .isLength({ min: 5 }),
  header('Version', 'La version de la aplicacion es requerida')
    .exists()
    .isString()
    .isLength({ min: 5 }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

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
  header('Version', 'La version de la aplicacion es requerida')
    .exists()
    .isString()
    .isLength({ min: 5 }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]
