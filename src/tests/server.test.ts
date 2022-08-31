import request from 'supertest'

import server from '../server'

describe('Server is running', () => {
  test('It should respond with a 404 status in /', async () => {
    const response = await request(server).get('/').send()
    expect(response.statusCode).toBe(404)
  })
  test('It should respond with a 301 status in /documentation', async () => {
    const response = await request(server).get('/documentation').send()
    expect(response.statusCode).toBe(301)
  })
})
