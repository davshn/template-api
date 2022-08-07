import { Request, Response, NextFunction } from 'express'

const corsConfig = (_req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
  next()
}
export default corsConfig
