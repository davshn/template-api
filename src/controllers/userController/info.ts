import { Request } from 'express'

import { models } from '../../models'
import { decodedToken } from '../../types/types'
import { userModel } from '../../types/auth'

const infoController = async (req: Request): Promise<userModel> => {
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
  }) as userModel
  return user
}

export default infoController
