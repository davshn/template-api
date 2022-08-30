import bcrypt from 'bcrypt'

import { models } from '../models'

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

export const destroyTestUser = async (): Promise<void> => {
  await models.User.destroy({ where: { email: 'test@test.com' } })
}
