import { query } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import validateResults from './validateResults'

export const validatePagination = [
  query('size', 'Size invalid')
    .if((_value: any, { req }: {req: any}) => req.query.size)
    .isInt()
    .toInt(),
  query('page', 'Page invalid')
    .if((_value: any, { req }: {req: any}) => req.query.page)
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]
