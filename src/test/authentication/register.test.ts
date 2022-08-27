import request from 'supertest'

import { models } from '../../models'
import server from '../../server'
import { userModel } from '../../types/auth'

const { VERSION } = process.env

describe('Register should create users correctly avoiding bad info', () => {
  const newUser = {
    name: 'Test',
    lastname: 'Test',
    documentNumber: '1111111111',
    documentType: 'CC',
    email: 'test@test.com',
    password: 'Test123*',
    phone: '1111111111'
  }

  beforeAll(async () => {
    await models.User.destroy({ where: { email: newUser.email } })
  })

  test('It should respond with a 422 status on bad info', async () => {
    const response = await request(server).post('/authentication/register').set('Version', VERSION as string).send({})
    expect(response.statusCode).toBe(422)
  })

  test('It should create a new user on correct info', async () => {
    const response = await request(server).post('/authentication/register').set('Version', VERSION as string).send(newUser)
    const user = await models.User.findOne({ where: { email: newUser.email } }) as userModel
    expect(user?.name).toBe('Test')
    expect(response.statusCode).toBe(201)
  })

  test('It should respond 400 on repeated email', async () => {
    newUser.name = 'Testing'
    const response = await request(server).post('/authentication/register').set('Version', VERSION as string).send(newUser)
    const user = await models.User.findOne({ where: { email: newUser.email } }) as userModel
    expect(user?.name).toBe('Test')
    expect(response.statusCode).toBe(400)
  })

  afterAll(async () => {
    await models.User.destroy({ where: { email: newUser.email } })
  })
})
