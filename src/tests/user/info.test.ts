import request from 'supertest'

import { registerTestUser, destroyTestUser, signInTestUser } from '../testUtilities'
import server from '../../server'
import { userToken } from '../../types/auth'

describe('User should give own user info and prove authentication', () => {
  let userToken: userToken

  beforeAll(async () => {
    await registerTestUser()
    userToken = await signInTestUser()
  })

  test('It should respond 401 on malformed token', async () => {
    const response = await request(server).get('/user/info').set('Authorization', userToken.token)
    expect(response.statusCode).toBe(401)
  })

  test('It should give own user info on correct token', async () => {
    const response = await request(server).get('/user/info').set('Authorization', 'Bearer ' + userToken.token)
    expect(response.statusCode).toBe(200)
  })

  afterAll(async () => {
    await destroyTestUser()
  })
})
