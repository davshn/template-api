import { body, header, param } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import validateResults from './validateResults'

export const validateVersion = [
  header('Version', 'La version de la aplicacion es requerida')
    .exists()
    .isString()
    .isLength({ min: 5 })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validateToken = [
  header('Authorization', 'Token no valido')
    .exists()
    .isString()
    .isLength({ min: 10 })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validateLogin = [
  body('email', 'Email no valido')
    .exists()
    .isEmail()
    .normalizeEmail(),
  body('password', 'Contraseña no valida')
    .exists()
    .isString()
    .isStrongPassword()
    .trim()
    .escape(),
  body('deviceInfo', 'La informacion del dispositivo es requerida')
    .exists()
    .isString()
    .isLength({ min: 5 })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validateRegister = [
  body('name', 'Nombre no valido')
    .exists()
    .isString()
    .isLength({ min: 3, max: 20 })
    .trim()
    .escape(),
  body('lastname', 'Apellido no valido')
    .exists()
    .isString()
    .isLength({ min: 3, max: 20 })
    .trim()
    .escape(),
  body('documentNumber', 'Numero de documento no valido')
    .exists()
    .isInt()
    .toInt(),
  body('documentType', 'Tipo de documento no valido')
    .exists()
    .isIn(['CC', 'NI', 'CE']),
  body('email', 'Email no valido')
    .exists()
    .isEmail()
    .normalizeEmail(),
  body('password', 'Contraseña no valida')
    .exists()
    .isString()
    .isStrongPassword()
    .trim()
    .escape(),
  body('phone', 'Telefono no valido')
    .exists()
    .isInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validateRefresh = [
  body('refreshToken', 'Token no valido')
    .exists()
    .isString()
    .isLength({ min: 10 })
    .trim()
    .escape(),
  body('deviceInfo', 'La informacion del dispositivo es requerida')
    .exists()
    .isString()
    .isLength({ min: 5 })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validateLogout = [
  body('deviceInfo', 'La informacion del dispositivo es requerida')
    .exists()
    .isString()
    .isLength({ min: 5 })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validateVerify = [
  param('verifyToken', 'Token no valido')
    .exists()
    .isString()
    .isLength({ min: 15 })
    .trim()
    .escape(),
  param('email', 'Email incorrecto')
    .exists()
    .isEmail()
    .normalizeEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]
