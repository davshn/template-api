import { Request, Response, NextFunction } from 'express'

import Logger from '../../config/logger/winston'

const versionProtection = (req: Request, res: Response, next: NextFunction): void => {
  const { VERSION } = process.env
  const version = req.header('Version') as string
  if (version !== VERSION) {
    Logger.warn('Version de aplicacion incorrecta ' + version)
    res.status(426).send('La ultima version de la aplicacion es requerida')
  } else next()
}

export default versionProtection
