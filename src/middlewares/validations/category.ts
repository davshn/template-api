import { body } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import validateResults from './validateResults'

export const validateCreateCategory = [
  body('name', 'Nombre no valido')
    .exists()
    .isString()
    .isLength({ min: 3, max: 20 })
    .trim()
    .escape(),
  body('detail', 'Detalle no valido')
    .if((_value: any, { req }: { req: any }) => req.body.detail)
    .isString()
    .trim()
    .escape(),
  body('isPrivate', 'Condicion no valida')
    .exists()
    .isBoolean()
    .toBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validateCreateSubcategory = [
  body('name', 'Nombre no valido')
    .exists()
    .isString()
    .isLength({ min: 3, max: 20 })
    .trim()
    .escape(),
  body('detail', 'Detalle no valido')
    .if((_value: any, { req }: { req: any }) => req.body.detail)
    .isString()
    .trim()
    .escape(),
  body('categoryId', 'Id no valida')
    .exists()
    .isString()
    .isLength({ min: 15 })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]
