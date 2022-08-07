import { Request, Response, ErrorRequestHandler } from 'express'

export const error404 = (_req: Request, res: Response): void => {
  res.status(404).send('La ruta no existe')
}

export const generalErrorHandler: ErrorRequestHandler = (err, _req, res): void => {
  const status = err.status ?? 500
  const message = err.message ?? err
  res.status(status).send(message)
}
