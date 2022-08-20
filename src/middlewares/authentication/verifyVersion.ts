import { Request, Response, NextFunction } from 'express'
import Logger from '../logger/winston'

const versionProtection = (req: Request, res: Response, next: NextFunction): void => {
  const { VERSION } = process.env
  const version = req.header('Version')

  if (version !== VERSION) {
    res.status(426).send('La ultima version de la aplicacion es requerida')
    Logger.error('La ultima version de la aplicacion es requerida')
  } else next()
}

export default versionProtection
