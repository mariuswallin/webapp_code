/* eslint-disable consistent-return */
/* eslint-disable sort-imports */
/* eslint-disable no-plusplus */
import axios from 'axios'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { createUser } from '@/features/users/users.controller'
import prisma from '@/lib/clients/db'

const url = 'http://localhost:3000/api/users'

describe('User registration', () => {
  const server = setupServer()

  beforeEach(async () => {
    await prisma.user.deleteMany({})
  })
  beforeAll(() => {
    server.listen()
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => {
    server.close()
  })

  describe('Creating user', () => {
    describe('when passed user email', () => {
      it('should respond with status 201 Created', async () => {
        let response

        server.use(
          rest.post(url, async (req, res, ctx) => {
            try {
              const d = await createUser(req, res)

              console.log('DATA')
              console.log(d)
            } catch (error) {
              console.log('ERROR')
              console.log(error)
            }

            return res(ctx.status(201), ctx.json({ success: true }))
          })
        )
        try {
          response = await axios.post(url, { email: 'test@test.no' })
        } catch (error) {
          response = error.response
        }
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Name must be filled out')
        expect(response.data.success).toBe(false)
      })
    })
  })
})
