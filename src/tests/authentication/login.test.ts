import request from 'supertest'

import { models } from '../../models'
import { registerTestUser, destroyTestUser } from '../testUtilities'
import server from '../../server'
import { userModel } from '../../types/auth'

const { VERSION } = process.env

describe('Login should give a token avoiding bad info', () => {
  const user = {
    email: 'test@test.com',
    password: 'Test123*',
    deviceInfo: 'Testing'
  }

  beforeAll(async () => {
    await registerTestUser()
  })

  test('It should respond with a 422 status on bad info', async () => {
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send({})
    expect(response.statusCode).toBe(422)
  })

  test('It should respond with a 400 status on user not exist', async () => {
    user.email = 'testing@testing.com'
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(user)
    user.email = 'test@test.com'
    expect(response.statusCode).toBe(400)
  })

  test('It should respond with a 400 status on wrong password', async () => {
    user.password = 'testingQ1*'
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(user)
    user.password = 'Test123*'
    expect(response.statusCode).toBe(400)
  })

  test('It should respond with 400 status on not verified user', async () => {
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(user)
    expect(response.statusCode).toBe(400)
  })

  test('It should respond with 400 status on banned user', async () => {
    const userCreated = await models.User.findOne({ where: { email: 'test@test.com' } }) as userModel
    userCreated.set({ isBanned: true, isVerified: true })
    await userCreated.save()
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(user)
    userCreated.set({ isBanned: false })
    await userCreated.save()
    expect(response.statusCode).toBe(400)
  })

  test('It should login on right info', async () => {
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(user)
    expect(response.statusCode).toBe(200)
  })

  test('It should respond with 429 status on too many tries', async () => {
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(user)
    expect(response.statusCode).toBe(429)
  })

  afterAll(async () => {
    await destroyTestUser()
  })
})
