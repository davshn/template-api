import { Request } from 'express'
import bcrypt from 'bcrypt'
import { decodedToken } from '../types/types'

import { models } from '../models'

export const registerController = async (req: Request): Promise<any> => {
  const salt = await bcrypt.genSalt(10)

  await models.User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    documentNumber: req.body.documentNumber,
    documentType: req.body.documentType,
    email: req.body.email.toLowerCase(),
    password: await bcrypt.hash(req.body.password, salt),
    phone: req.body.phone
  })
}

export const infoController = async (req: Request): Promise<any> => {
  const user = req.user as decodedToken

  const userInfo = await models.User.findOne({
    attributes: [
      'name',
      'lastname',
      'email',
      'documentType',
      'documentNumber',
      'phone',
      'givenInAdoption'
    ],
    where: { id: user.id }
  })
  return userInfo
}
