import request from 'supertest'
import server from '../../server'

const { VERSION } = process.env

const testUser = {
  email: 'test@test.com',
  password: 'strinG12*',
  deviceInfo: 'string'
}

describe('Verify version app is correct', () => {
  test('It should advance to the endpoint if version is correct', async () => {
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(testUser)
    expect(response.statusCode).toBe(400)
  })
  test('It should respond with 426 if the app version is incorrect', async () => {
    const response = await request(server).post('/authentication/login').set('Version', '0.0.0').send(testUser)
    expect(response.statusCode).toBe(426)
  })
})
