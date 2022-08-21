import rateLimit from 'express-rate-limit'

import Logger from '../logger/winston'

export const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const ip = req.headers['x-forwarded-for'] as string ?? req.socket.remoteAddress
    Logger.error('Demasiadas solicitudes de' + ip)
    res.status(429).send('Demasiadas solicitudes, intenta de nuevo mas tarde')
  }
})

export const bruteLimiter = rateLimit({
  windowMs: 5 * 60 * 60 * 1000,
  max: 5,
  standardHeaders: false,
  legacyHeaders: false,
  handler: (_req, res) => {
    Logger.error('Limitado por demasiados intentos')
    res.status(429).send('Demasiados intentos')
  }
})
