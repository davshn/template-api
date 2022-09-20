import { Request } from 'express'

import { models } from '../../models'
import { decodedToken } from '../../types/types'
import { userModel } from '../../types/auth'
const infoController = async (req: Request): Promise<void> => {
  const userInfo = req.user as decodedToken

  const user = await models.User.findOne({ where: { id: userInfo.id } }) as userModel
  if (user.role === 'ADMIN' || user.role === 'ROOT') throw new Error('El usuario no puede ser eliminado ')

  user.set({ isVerified: false, isBanned: true })
  await user.save()
}

export default infoController
