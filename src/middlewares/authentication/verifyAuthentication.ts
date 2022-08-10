import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { DecodedRequest } from '../../types/types'

const { TOKEN_KEY } = process.env

const authenticateProtection = (req: DecodedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Autentication')

  if (token === null) {
    res.status(401).send('Se requiere ser un usuario autenticado')
  }
  try {
    const decoded = jwt.verify(token as string, TOKEN_KEY as string)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).send('Usuario invalido')
  }
}

export default authenticateProtection
