import { Request } from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { models } from '../models'
import { userToken } from '../types/auth'
import { signAuthToken, signRefreshToken } from '../utils/signTokens'

export const registerController = async (req: Request): Promise<any> => {
  const salt = await bcrypt.genSalt(10)

  await models.User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    documentNumber: req.body.documentNumber,
    documentType: req.body.documentType,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    phone: req.body.phone
  })
}

export const loginController = async (req: Request): Promise<userToken> => {
  const email = req.body.email
  const password = req.body.password
  const deviceInfo = req.body.deviceInfo
  const user = await models.User.findOne({ where: { email } }) as any

  if (user === null) throw new Error('Usuario no encontrado')
  if (!await bcrypt.compare(password, user.password)) throw new Error('Datos incorrectos ')
  if (!(user.isVerified as boolean)) throw new Error('Usuario no verificado ')
  if (user.isBanned as boolean) throw new Error('Usuario baneado ')

  const tokenId = uuidv4()
  const authToken = signAuthToken(user.id, user.email)
  const refToken = signRefreshToken(tokenId)

  await user.set({ deviceInfo: { ...user.deviceInfo, [deviceInfo]: tokenId } })
  await user.save()

  return {
    token: authToken,
    refreshToken: refToken
  }
}
