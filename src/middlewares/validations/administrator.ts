import { body } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import validateResults from './validateResults'

export const validateBanUser = [
  body('userId', 'Id no valido')
    .exists()
    .isString()
    .isLength({ min: 15 })
    .escape(),
  body('ban', 'Condicion no valida')
    .exists()
    .isBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]
