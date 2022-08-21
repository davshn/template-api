import { Request, Response, ErrorRequestHandler } from 'express'

import Logger from '../../config/logger/winston'

export const error404 = (req: Request, res: Response): void => {
  const url = req.originalUrl
  Logger.error('Ruta no existe' + url)
  res.status(404).send('La ruta no existe')
}

export const generalErrorHandler: ErrorRequestHandler = (err, _req, res): void => {
  const status = err.status ?? 500
  const message = err.message ?? err
  Logger.error('Error general' + JSON.stringify(message))
  res.status(status).send(message)
}
