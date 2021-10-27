/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable sort-imports */
/* eslint-disable no-plusplus */

import httpMocks from 'node-mocks-http'

import { prismaMock } from '../../__mocks__/prismaMock'
import { createUser, listAllUsers } from '@/features/users/users.controller'

const url = 'http://localhost:3000/api/users'

describe('User registration', () => {
  describe('Creating user', () => {
    describe('when passed user email', () => {
      it('should respond with status 201 Created', async () => {
        const user = {
          id: 1,
          email: 'hello@test.no',
          nickname: null,
        }
        const request = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {
            email: 'test@test.no',
          },
        })

        const response = httpMocks.createResponse()

        prismaMock.user.create.mockResolvedValue(user)

        const result = await createUser(request, response)

        expect(result.statusCode).toBe(201)
      })
      it('should respond with correct data', async () => {
        const user = {
          id: 1,
          email: 'hello@test.no',
          nickname: null,
        }
        const request = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {
            email: 'hello@test.no',
          },
        })

        const response = httpMocks.createResponse()

        prismaMock.user.create.mockResolvedValue(user)

        const result = await createUser(request, response)

        const resultAsJson = result._getJSONData()

        expect(resultAsJson.success).toBe(true)
        expect(resultAsJson.data.email).toBe('hello@test.no')
        expect(resultAsJson.data.nickname).toBeNull()
      })
    })
    describe('when no user email is passed', () => {
      it('should respond with status 400', async () => {
        const request = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {},
        })

        const response = httpMocks.createResponse()

        const result = await createUser(request, response)

        expect(result.statusCode).toBe(400)
      })
      it('should respond with success false and error message', async () => {
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
    describe('when email already exist', () => {
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

        await createUser(userOne, responseOne)

        prismaMock.user.findUnique.mockResolvedValue(true)

        const resultTwo = await createUser(userTwo, responseTwo)
        const resultAsJsonTwo = resultTwo._getJSONData()

        expect(resultTwo.statusCode).toBe(500)
        expect(resultAsJsonTwo.error).toBe('User already exist')
      })
    })
    describe('when creating multiple users', () => {
      it('should respond with multiple users', async () => {
        const users = [
          { id: 1, email: 'test@test.no', nickname: null },
          { id: 2, email: 'test2@test.no', nickname: null },
        ]
        const request = httpMocks.createRequest({
          method: 'GET',
          url,
        })

        const response = httpMocks.createResponse()

        prismaMock.user.findMany.mockResolvedValue(users)

        const result = await listAllUsers(request, response)
        const resultAsJson = result._getJSONData()

        expect(result.statusCode).toBe(200)
        expect(resultAsJson.data.length).toBe(2)
      })
    })
    describe('when failing creating user', () => {
      it('should respond with status 500 and error', async () => {
        const request = httpMocks.createRequest({
          method: 'POST',
          url,
          body: {
            email: 'test@test.no',
          },
        })

        const response = httpMocks.createResponse()

        prismaMock.user.create.mockRejectedValue()

        const result = await createUser(request, response)
        const resultAsJson = result._getJSONData()

        expect(result.statusCode).toBe(500)
        expect(resultAsJson.error).toBe('Failed creating user')
      })
    })
  })
})
