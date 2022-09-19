import { Router, Request, Response } from 'express'

import { bruteLimiter } from '../config/rateLimiter'
import Logger from '../config/logger/winston'

import { validateLogin, validateVersion, validateRegister, validateRefresh, validateLogout, validateToken, validateVerify } from '../middlewares/validations/authentication'
import versionProtection from '../middlewares/authentication/verifyVersion'
import { verifyRefresh, verifyAuthentication } from '../middlewares/authentication/verifyTokens'
import authenticationController from '../controllers/authenticationController'

const router = Router()
router.post('/register', validateVersion, validateRegister, versionProtection, async (req: Request, res: Response) => {
  try {
    await authenticationController.register(req)
    res.status(201).send('Usuario registrado con exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Usuario ya registrado')
  }
})

router.post('/login', bruteLimiter, validateVersion, validateLogin, versionProtection, async (req: Request, res: Response) => {
  try {
    const loggedUser = await authenticationController.login(req)
    res.status(200).json(loggedUser)
  } catch (error: any) {
    const email = req.body.email as string
    Logger.error(error.message as string + email)
    res.status(400).json(error.message)
  }
})

router.post('/refresh', validateVersion, validateRefresh, versionProtection, verifyRefresh, async (req: Request, res: Response) => {
  try {
    const loggedUser = await authenticationController.refresh(req)
    res.status(200).json(loggedUser)
  } catch (error: any) {
    const ip = req.headers['x-forwarded-for'] as string ?? req.socket.remoteAddress
    Logger.error((error.message as string) + ' ' + ip)
    res.status(400).json(error.message)
  }
})

router.post('/logout', validateVersion, validateLogout, validateToken, versionProtection, verifyAuthentication, async (req: Request, res: Response) => {
  try {
    await authenticationController.logout(req)
    res.status(200).send('Usuario desconectado con exito')
  } catch (error: any) {
    res.status(400).json(error.message)
  }
})

router.get('/verify/:verifyToken/:email', validateVerify, async (req: Request, res: Response) => {
  try {
    await authenticationController.verify(req)
    res.status(201).send('Usuario verificado con exito')
  } catch (error) {
    Logger.error(error)
    res.status(400).send('Error al verificar')
  }
})

export default router
