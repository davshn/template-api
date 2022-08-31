import request from 'supertest'

import { registerTestUser, destroyTestUser, signInTestUser } from '../testUtilities'
import server from '../../server'
import { userToken } from '../../types/auth'

describe('User should logout on correct info', () => {
  let userToken: userToken
  const deviceInfo = { deviceInfo: 'Testing' }
  const { VERSION } = process.env

  beforeAll(async () => {
    await registerTestUser()
    userToken = await signInTestUser()
  })

  test('It should respond with a 422 status on bad info', async () => {
    const response = await request(server).post('/authentication/logout').set('Version', VERSION as string).set('Authorization', userToken.token).send({})
    expect(response.statusCode).toBe(422)
  })

  test('It should respond 401 on malformed token', async () => {
    const response = await request(server).post('/authentication/logout').set('Version', VERSION as string).set('Authorization', userToken.token).send(deviceInfo)
    expect(response.statusCode).toBe(401)
  })

  test('It should logout user on correct info', async () => {
    const response = await request(server).post('/authentication/logout').set('Version', VERSION as string).set('Authorization', 'Bearer ' + userToken.token).send(deviceInfo)
    expect(response.statusCode).toBe(200)
  })

  afterAll(async () => {
    await destroyTestUser()
  })
})
