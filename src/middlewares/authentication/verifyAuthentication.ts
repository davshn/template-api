import jwt from 'jsonwebtoken'
import { Response, NextFunction, Request } from 'express'
import { decodedToken } from '../../types/types'

const { TOKEN_KEY } = process.env

const verifyAuthentication = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.slice(7)

  try {
    if (token === null) {
      res.status(401).send('Se requiere ser un usuario autenticado')
    }
    const decoded = jwt.verify(token as string, TOKEN_KEY as string)
    req.user = decoded as decodedToken
    next()
  } catch (err) {
    res.status(401).send('Usuario no valido')
  }
}

export default verifyAuthentication
