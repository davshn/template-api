import { Request } from 'express'

import { models } from '../../models'
import { decodedToken } from '../../types/types'

const infoController = async (req: Request): Promise<any> => {
  const userInfo = req.user as decodedToken
  const user = await models.User.findOne({
    attributes: [
      'name',
      'lastname',
      'email',
      'documentType',
      'documentNumber',
      'phone',
      'role'
    ],
    where: { id: userInfo.id }
  })
  return user
}

export default infoController
