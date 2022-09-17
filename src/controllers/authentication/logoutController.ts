import { Request } from 'express'
import { decodedToken } from '../../types/types'
import { userModel } from '../../types/auth'
import { models } from '../../models'

const logoutController = async (req: Request): Promise<void> => {
  const deviceInfo = req.body.deviceInfo
  const userInfo = req.user as decodedToken

  const user = await models.User.findOne({ where: { id: userInfo.id } }) as userModel
  user.set({ deviceInfo: { ...user.deviceInfo, [deviceInfo]: '' } })
  await user.save()
}

export default logoutController
