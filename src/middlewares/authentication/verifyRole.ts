import jwt from 'jsonwebtoken'
import { Response, NextFunction, Request } from 'express'

import Logger from '../../config/logger/winston'
import { models } from '../../models'

import { decodedToken } from '../../types/types'
import { userModel } from '../../types/auth'

const { TOKEN_KEY } = process.env

export const verifyAdminRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.slice(7)

  try {
    const decoded = jwt.verify(token as string, TOKEN_KEY as string) as decodedToken
    const user = await models.User.findOne({ where: { id: decoded.id } }) as userModel
    if (user.role === 'USER') {
      Logger.error('Rol inferior al requerido ' + user.email)
      res.status(403).send('Rol inferior al requerido')
    }
    if (user.role === 'ROOT' || user.role === 'ADMIN') {
      req.user = decoded
      next()
    }
  } catch (error: any) {
    const ip = req.headers['x-forwarded-for'] as string ?? req.socket.remoteAddress
    Logger.error('AuthToken no valido ' + (error.message as string) + ip)
    res.status(401).send('Usuario no valido')
  }
}

export const verifyRootRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.slice(7)

  try {
    const decoded = jwt.verify(token as string, TOKEN_KEY as string) as decodedToken
    const user = await models.User.findOne({ where: { id: decoded.id } }) as userModel
    if (user.role === 'USER' || user.role === 'ADMIN') {
      Logger.error('Rol inferior al requerido ' + user.email)
      res.status(403).send('Rol inferior al requerido')
    }
    if (user.role === 'ROOT') {
      req.user = decoded
      next()
    }
  } catch (error: any) {
    const ip = req.headers['x-forwarded-for'] as string ?? req.socket.remoteAddress
    Logger.error('AuthToken no valido ' + (error.message as string) + ip)
    res.status(401).send('Usuario no valido')
  }
}
