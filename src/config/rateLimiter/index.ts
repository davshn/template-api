import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Demasiadas solicitudes, intenta de nuevo mas tarde'
})

export const bruteLimiter = rateLimit({
  windowMs: 5 * 60 * 60 * 1000,
  max: 5,
  standardHeaders: false,
  legacyHeaders: false,
  message: 'Demasiados intentos, intenta de nuevo mas tarde'
})
