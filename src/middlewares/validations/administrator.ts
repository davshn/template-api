import { body, query } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import validateResults from './validateResults'

export const validateBanUser = [
  body('userId', 'Id no valido')
    .exists()
    .isString()
    .isLength({ min: 15 })
    .trim()
    .escape(),
  body('ban', 'Condicion no valida')
    .exists()
    .isBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validateSort = [
  query('orderBy', 'Columna invalida')
    .if((_value: any, { req }: { req: any }) => req.query.orderBy)
    .trim()
    .isIn(['id', 'name', 'lastname', 'documentType', 'documentNumber', 'email', 'phone', 'profileAvatar', 'role', 'isBanned', 'isVerified']),
  query('orderDirection', 'Page invalid')
    .if((_value: any, { req }: { req: any }) => req.query.orderDirection)
    .trim()
    .isIn(['ASC', 'DESC']),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validateSearch = [
  query('searchByName', 'Nombre no valido')
    .if((_value: any, { req }: { req: any }) => req.query.searchByName)
    .isLength({ min: 3, max: 20 })
    .trim()
    .escape(),
  query('searchByLastname', 'Apellido no valido')
    .if((_value: any, { req }: { req: any }) => req.query.searchByLastname)
    .isLength({ min: 3, max: 20 })
    .trim()
    .escape(),
  query('searchByRole', 'Rol no valido')
    .if((_value: any, { req }: { req: any }) => req.query.searchByRole)
    .trim()
    .isIn(['USER', 'ADMIN', 'ROOT']),
  query('searchByIsBanned', 'Condicion no valida')
    .if((_value: any, { req }: { req: any }) => req.query.searchByIsBanned)
    .isBoolean()
    .toBoolean(),
  query('searchByIsVerified', 'Condicion no valida')
    .if((_value: any, { req }: { req: any }) => req.query.searchByIsVerified)
    .isBoolean()
    .toBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]

export const validateUserDetail = [
  query('searchById', 'Id no valido')
    .if((_value: any, { req }: { req: any }) => req.query.searchById)
    .isLength({ min: 15 })
    .trim()
    .escape(),
  query('searchByDocumentNumber', 'Numero de documento no valido')
    .if((_value: any, { req }: { req: any }) => req.query.searchByDocumentNumber)
    .isInt(),
  query('searchByEmail', 'Email no valido')
    .if((_value: any, { req }: { req: any }) => req.query.searchByEmail)
    .isLength({ min: 3 })
    .trim()
    .escape(),
  query('searchByPhone', 'Telefono no valido')
    .if((_value: any, { req }: { req: any }) => req.query.searchByPhone)
    .isInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next)
  }
]
