import bcrypt from 'bcrypt'

import { models } from '../models'
import { userToken, userModel, userRoles } from '../types/auth'
import { signAuthToken } from '../utils/signTokens'

export const registerTestUser = async (): Promise<void> => {
  const salt = await bcrypt.genSalt(10)
  const newUser = {
    name: 'Test',
    lastname: 'Test',
    documentNumber: '1111111111',
    documentType: 'CC',
    email: 'test@test.com',
    password: await bcrypt.hash('Test123*', salt),
    phone: '1111111111'
  }

  await models.User.create(newUser)
}

export const registerAdminUser = async (): Promise<void> => {
  const salt = await bcrypt.genSalt(10)
  const newUser = {
    name: 'Admin',
    lastname: 'Admin',
    documentNumber: '1111111111000',
    documentType: 'CC',
    email: 'admin@admin.com',
    password: await bcrypt.hash('Admin123*', salt),
    phone: '1111111111000'
  }

  await models.User.create(newUser)
}

export const destroyTestUser = async (): Promise<void> => {
  await models.User.destroy({ where: { email: 'test@test.com' } })
}

export const destroyAdminUser = async (): Promise<void> => {
  await models.User.destroy({ where: { email: 'admin@admin.com' } })
}

export const signInTestUser = async (): Promise<userToken> => {
  const user = await models.User.findOne({ where: { email: 'test@test.com' } }) as userModel
  user.set({ isVerified: true })
  await user.save()

  const authToken = signAuthToken(user.id, user.email)
  return {
    token: authToken,
    refreshToken: ''
  }
}

export const signInAdminUser = async (): Promise<userToken> => {
  const user = await models.User.findOne({ where: { email: 'admin@admin.com' } }) as userModel
  user.set({ isVerified: true, role: userRoles.ADMIN })
  await user.save()

  const authToken = signAuthToken(user.id, user.email)
  return {
    token: authToken,
    refreshToken: ''
  }
}
