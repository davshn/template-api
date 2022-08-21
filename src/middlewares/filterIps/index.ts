import { Request, Response, NextFunction } from 'express'

import Logger from '../../config/logger/winston'

const ips = ['181.56.225.34']

const filterIps = (req: Request, res: Response, next: NextFunction): void => {
  const ip = req.headers['x-forwarded-for'] as string ?? req.socket.remoteAddress

  if (ips.includes(ip)) {
    Logger.error('Acceso denegado ' + ip)
    res.status(403).send('Acceso denegado')
  } else {
    Logger.info('Acceso concedido a ' + ip)
    next()
  }
}

export default filterIps
