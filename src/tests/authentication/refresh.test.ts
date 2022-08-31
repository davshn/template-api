import request from 'supertest'

import { registerTestUser, destroyTestUser } from '../testUtilities'
import { signRefreshToken } from '../../utils/signTokens'
import { models } from '../../models'
import server from '../../server'
import { userModel } from '../../types/auth'

const { VERSION } = process.env

describe('Refresh should give a new token', () => {
  let refToken: string
  const deviceInfo = 'testDevice'
  let refreshInfo = {}
  beforeAll(async () => {
    await registerTestUser()
    refToken = signRefreshToken('11111111111111', 'test@test.com')
    refreshInfo = {
      refreshToken: refToken,
      deviceInfo: deviceInfo
    }
  })

  test('It should respond with 400 status on not verified user', async () => {
    const response = await request(server).post('/authentication/refresh').set('Version', VERSION as string).send(refreshInfo)
    expect(response.statusCode).toBe(400)
  })

  test('It should respond with 400 status on banned user', async () => {
    const userCreated = await models.User.findOne({ where: { email: 'test@test.com' } }) as userModel
    userCreated.set({ isBanned: true, isVerified: true })
    await userCreated.save()
    const response = await request(server).post('/authentication/refresh').set('Version', VERSION as string).send(refreshInfo)
    userCreated.set({ isBanned: false })
    await userCreated.save()
    expect(response.statusCode).toBe(400)
  })

  test('It should respond 200 on correct refreshToken and replace it', async () => {
    const userCreated = await models.User.findOne({ where: { email: 'test@test.com' } }) as userModel
    userCreated.set({ deviceInfo: { ...userCreated.deviceInfo, [deviceInfo]: '11111111111111' } })
    await userCreated.save()
    const response = await request(server).post('/authentication/refresh').set('Version', VERSION as string).send(refreshInfo)
    expect(response.statusCode).toBe(200)
  })

  test('It should respond 400 on incorrect refreshToken and delete all tokens', async () => {
    const response = await request(server).post('/authentication/refresh').set('Version', VERSION as string).send(refreshInfo)
    const userCreated = await models.User.findOne({ where: { email: 'test@test.com' } }) as userModel
    expect(response.statusCode).toBe(400)
    expect(Object.keys(userCreated.deviceInfo).length).toBe(0)
  })

  afterAll(async () => {
    await destroyTestUser()
  })
})
