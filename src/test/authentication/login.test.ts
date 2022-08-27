import request from 'supertest'

import server from '../../server'

const { VERSION } = process.env

describe('Login should give a token avoiding bad info', () => {
  const newUser = {
    email: 'test@test.com',
    password: 'Test123*',
    deviceInfo: 'Testing'
  }

  test('It should respond with a 422 status on bad info', async () => {
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send({})
    expect(response.statusCode).toBe(422)
  })

  test('It should respond with a 400 status on user not exist', async () => {
    newUser.email = 'testing@testing.com'
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(newUser)
    newUser.email = 'test@test.com'
    expect(response.statusCode).toBe(400)
  })

  test('It should respond with a 400 status on wrong password', async () => {
    newUser.password = 'testingQ1*'
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(newUser)
    newUser.password = 'Test123*'
    expect(response.statusCode).toBe(400)
  })

  test('It should respond with 400 status on banned user', async () => {
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(newUser)
    expect(response.statusCode).toBe(400)
  })

  test('It should respond with 400 status on not verified user', async () => {
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(newUser)
    expect(response.statusCode).toBe(400)
  })

  test('It should login on right info', async () => {
    const response = await request(server).post('/authentication/login').set('Version', VERSION as string).send(newUser)
    expect(response.statusCode).toBe(200)
  })
})
