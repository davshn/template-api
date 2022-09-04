import { Request } from 'express'
import { v4 as uuidv4 } from 'uuid'

import { models } from '../../models'
import { userToken, userModel } from '../../types/auth'
import { signAuthToken, signRefreshToken } from '../../utils/signTokens'

const refreshController = async (req: Request): Promise<userToken> => {
  const email = req.user?.email
  const refreshId = req.user?.id
  const deviceInfo = req.body.deviceInfo
  const user = await models.User.findOne({ where: { email } }) as userModel

  if (user === null) throw new Error('Usuario no encontrado ')
  if (!(user.isVerified)) throw new Error('Usuario no verificado ')
  if (user.isBanned) throw new Error('Usuario baneado ')
  if (((user.deviceInfo[deviceInfo])) !== refreshId) {
    user.set({ deviceInfo: {} })
    await user.save()
    throw new Error('Refresh Token en desuso ')
  }

  const tokenId = uuidv4()
  const authToken = signAuthToken(user.id, user.email)
  const refToken = signRefreshToken(tokenId, user.email)

  user.set({ deviceInfo: { ...user.deviceInfo, [deviceInfo]: tokenId } })
  await user.save()

  return {
    token: authToken,
    refreshToken: refToken
  }
}

export default refreshController
