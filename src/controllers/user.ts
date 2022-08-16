import { Request } from 'express'
import { decodedToken } from '../types/types'

import { models } from '../models'

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
      'givenInAdoption',
      'role'
    ],
    where: { id: user.id }
  })
  return userInfo
}
