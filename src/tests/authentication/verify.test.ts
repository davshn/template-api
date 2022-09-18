import request from 'supertest'

import { models } from '../../models'
import { registerTestUser, destroyTestUser } from '../testUtilities'
import server from '../../server'
import { userModel } from '../../types/auth'

describe('User should verify if correct token is send', () => {
  beforeAll(async () => {
    await registerTestUser()
  })

  test('It should respond 400 on incorrect user', async () => {
    const user = await models.User.findOne({ where: { email: 'test@test.com' } }) as userModel
    const response = await request(server).get('/authentication/verify/' + user.id + '/' + 'test@tet.com')
    expect(response.statusCode).toBe(400)
  })

  test('It should respond 400 on incorrect token', async () => {
    const user = await models.User.findOne({ where: { email: 'test@test.com' } }) as userModel
    const response = await request(server).get('/authentication/verify/' + 'asdasdasdasdasdasdasd' + '/' + user.email)
    expect(response.statusCode).toBe(400)
  })

  test('It should verify user on correct token', async () => {
    const user = await models.User.findOne({ where: { email: 'test@test.com' } }) as userModel
    const response = await request(server).get('/authentication/verify/' + user.id + '/' + user.email)
    expect(response.statusCode).toBe(201)
  })

  afterAll(async () => {
    await destroyTestUser()
  })
})
