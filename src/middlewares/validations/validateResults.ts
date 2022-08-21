import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import Logger from '../../config/logger/winston'

const validateResults = (req: Request, res: Response, next: NextFunction): any => {
  try {
    validationResult(req).throw()
    return next()
  } catch (err: any) {
    Logger.warn('Error de validacion ' + JSON.stringify(err.array()))
    res.status(422)
    res.json(err.array())
  }
}

export default validateResults
