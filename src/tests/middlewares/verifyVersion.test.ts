import request from 'supertest'
import server from '../../server'

const { VERSION } = process.env

describe('Verify version app is correct', () => {
  test('It should advance to the endpoint if version is correct', async () => {
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send({})
    expect(response.statusCode).toBe(422)
  })
  test('It should respond whit 426 if the app version is incorrect', async () => {
    const response = await request(server).post('/authentication/login').set('Version', '0.0.0').send({})
    expect(response.statusCode).toBe(426)
  })
})
