import { body } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import validateResults from './validateResults'

export const validateChangeRole = [
  body('userId', 'Id no valido')
    .exists()
    .isString()
    .isLength({ min: 15 })
    .trim()
    .escape(),
  body('role', 'Rol no valido')
    .exists()
    .trim()
    .isIn(['USER', 'ADMIN', 'ROOT']),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]
