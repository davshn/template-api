import { Request, Response, NextFunction } from 'express'

const versionProtection = (req: Request, res: Response, next: NextFunction): void => {
  const { VERSION } = process.env
  const version = req.header('Version')

  try {
    if (version !== VERSION) res.status(426).send('La ultima version de la aplicacion es requerida')
    else next()
  } catch (err) {
    res.status(426).send('La ultima version de la aplicacion es requerida')
  }
}

export default versionProtection
