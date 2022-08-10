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
