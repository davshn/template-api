import { Request } from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { models } from '../../models'
import { userToken, userModel } from '../../types/auth'
import { signAuthToken, signRefreshToken } from '../../utils/signTokens'

const loginController = async (req: Request): Promise<userToken> => {
  const email = req.body.email
  const password = req.body.password
  const deviceInfo = req.body.deviceInfo
  const user = await models.User.findOne({ where: { email } }) as userModel

  if (user === null) throw new Error('Usuario no encontrado ')
  if (!await bcrypt.compare(password, user.password)) throw new Error('Datos incorrectos ')
  if (user.isBanned && !(user.isVerified)) throw new Error('Usuario en proceso de eliminacion ')
  if (!(user.isVerified)) throw new Error('Usuario no verificado ')
  if (user.isBanned) throw new Error('Usuario baneado ')

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
export default loginController
