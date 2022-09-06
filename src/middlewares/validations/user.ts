import { body } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import validateResults from './validateResults'

export const validateUserEdit = [
  body('name', 'Nombre no valido')
    .if((_value: any, { req }: {req: any}) => req.body.name)
    .isString()
    .isLength({ min: 3, max: 12 })
    .trim()
    .escape(),
  body('lastname', 'Apellido no valido')
    .if((_value: any, { req }: {req: any}) => req.body.lastname)
    .isString()
    .isLength({ min: 3, max: 12 })
    .trim()
    .escape(),
  body('phone', 'Telefono no valido')
    .if((_value: any, { req }: {req: any}) => req.body.phone)
    .isInt(),
  body('password', 'Contraseña no valida')
    .if((_value: any, { req }: {req: any}) => req.body.password)
    .isString()
    .isStrongPassword()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]
