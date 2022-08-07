import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

const validateResults = (req: Request, res: Response, next: NextFunction): any => {
  try {
    validationResult(req).throw()
    return next()
  } catch (err: any) {
    res.status(422)
    res.json(err.array())
  }
}

export default validateResults
