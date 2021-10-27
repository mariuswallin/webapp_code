/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable sort-imports */
/* eslint-disable no-plusplus */

import httpMocks from 'node-mocks-http'

import { createUser } from '@/features/users/users.controller'
import prisma from '@/lib/clients/db'

const url = 'http://localhost:3000/api/users'

describe('User registration', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({})
  })

  describe('Creating user', () => {
    describe('when passed user email', () => {
      it('should respond with status 201 Created', async () => {
        const request = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {
            email: 'test@test.no',
          },
        })

        const response = httpMocks.createResponse()

        const result = await createUser(request, response)

        expect(result.statusCode).toBe(201)
      })
      it('should respond with correct data', async () => {
        const request = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {
            email: 'test@test.no',
          },
        })

        const response = httpMocks.createResponse()

        const result = await createUser(request, response)

        const resultAsJson = result._getJSONData()

        expect(resultAsJson.success).toBe(true)
        expect(resultAsJson.data.email).toBe('test@test.no')
        expect(resultAsJson.data.nickname).toBeNull()
      })
      it('should have added user to database', async () => {
        const userOne = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {
            email: 'test@test.no',
          },
        })

        const userTwo = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {
            email: 'test2@test.no',
          },
        })

        const responseOne = httpMocks.createResponse()
        const responseTwo = httpMocks.createResponse()

        await createUser(userOne, responseOne)
        await createUser(userTwo, responseTwo)
        const users = await prisma.user.findMany({})

        expect(users.length).toBe(2)
      })
    })
    describe('when no user email is provided', () => {
      it('should respond with status 400 Bad Request', async () => {
        const request = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {},
        })

        const response = httpMocks.createResponse()

        await createUser(request, response)

        expect(response.statusCode).toBe(400)
      })
      it('should respond with status false and error message', async () => {
        const request = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {},
        })

        const response = httpMocks.createResponse()

        const result = await createUser(request, response)
        const resultAsJson = result._getJSONData()

        expect(resultAsJson.success).toBe(false)
        expect(resultAsJson.error).toBe('Missing required field: email')
      })
    })
    describe('when same email is provided', () => {
      it('should respond with status 500', async () => {
        const userOne = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {
            email: 'test@test.no',
          },
        })

        const userTwo = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {
            email: 'test@test.no',
          },
        })

        const responseOne = httpMocks.createResponse()
        const responseTwo = httpMocks.createResponse()

        const resultOne = await createUser(userOne, responseOne)
        const resultAsJsonOne = resultOne._getJSONData()

        const resultTwo = await createUser(userTwo, responseTwo)
        const resultAsJsonTwo = resultTwo._getJSONData()

        const users = await prisma.user.findMany({})

        expect(resultAsJsonOne.success).toBe(true)
        expect(resultAsJsonTwo.success).toBe(false)
        expect(resultOne.statusCode).toBe(201)
        expect(resultTwo.statusCode).toBe(500)
        expect(users.length).toBe(1)
      })
    })
  })
})