import jwt from 'jsonwebtoken'
import { Response, NextFunction, Request } from 'express'

import { decodedToken } from '../../types/types'
import Logger from '../../config/logger/winston'

const { TOKEN_KEY } = process.env

export const verifyAuthentication = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.slice(7)

  try {
    const decoded = jwt.verify(token as string, TOKEN_KEY as string) as decodedToken
    req.user = decoded
    next()
  } catch (error: any) {
    Logger.error('AuthToken no valido ' + (error.message as string))
    res.status(401).send('Usuario no valido')
  }
}

export const verifyRefresh = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.body.refreshToken

  try {
    const decoded = jwt.verify(token as string, TOKEN_KEY as string) as decodedToken
    req.user = decoded
    next()
  } catch (error: any) {
    Logger.error('RefreshToken no valido ' + (error.message as string))
    res.status(401).send('Usuario no valido')
  }
}
