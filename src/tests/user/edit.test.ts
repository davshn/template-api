import request from 'supertest'
import bcrypt from 'bcrypt'

import { models } from '../../models'
import { registerTestUser, destroyTestUser, signInTestUser } from '../testUtilities'
import server from '../../server'
import { userToken, userModel } from '../../types/auth'

describe('User could change own info', () => {
  let userToken: userToken

  const newUser = {
    name: 'Edited',
    lastname: 'Edited',
    phone: '2222222'
  }

  const newPassword = {
    password: 'Edited123*'
  }

  beforeAll(async () => {
    await registerTestUser()
    userToken = await signInTestUser()
  })

  test('It should change its own password', async () => {
    const response = await request(server).put('/user/edit').set('Authorization', 'Bearer ' + userToken.token).send(newPassword)
    const userEdited = await models.User.findOne({ where: { email: 'test@test.com' } }) as userModel
    const verifyPass = await bcrypt.compare('Edited123*', userEdited.password)
    expect(verifyPass).toBe(true)
    expect(response.statusCode).toBe(201)
  })

  test('It should change its own info', async () => {
    const response = await request(server).put('/user/edit').set('Authorization', 'Bearer ' + userToken.token).send(newUser)
    const userEdited = await models.User.findOne({ where: { email: 'test@test.com' } }) as userModel
    expect(userEdited.name).toBe('Edited')
    expect(userEdited.lastname).toBe('Edited')
    expect(userEdited.phone).toBe('2222222')
    expect(response.statusCode).toBe(201)
  })

  afterAll(async () => {
    await destroyTestUser()
  })
})
