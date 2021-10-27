/* eslint-disable consistent-return */
/* eslint-disable sort-imports */
/* eslint-disable no-plusplus */
import axios from 'axios'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { create } from '@/features/users/users.service'
import prisma from '@/lib/clients/db'

const url = 'http://localhost:3000/api/users'

/**
 * Tester servicen og dermed repository.
 * Får ikke testet controlleren her da "res" ikke
 * er ekte res.
 * Dette er en form for "smoke-test", da den tester
 * store deler av applikasjonen og har en del avhengigheter
 */
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
      it('should respond with success true', async () => {
        server.use(
          rest.post(url, async (req, res, ctx) => {
            const { email } = req.body
            const data = await create({ email })

            return res(ctx.json(data))
          })
        )

        const response = await axios.post(url, { email: 'test@test.no' })

        expect(response.data.success).toBe(true)
      })

      it('should respond with correct data', async () => {
        server.use(
          rest.post(url, async (req, res, ctx) => {
            const { email } = req.body
            const data = await create({ email })

            return res(ctx.status(201), ctx.json(data))
          })
        )

        const response = await axios.post(url, { email: 'test@test.no' })

        expect(response.data.error).toBe(undefined)
        expect(response.data.data.email).toBe('test@test.no')
        expect(response.data.data.nickname).toBeNull()
      })
    })
    describe('when no email is passed', () => {
      it('should respond with success false', async () => {
        server.use(
          rest.post(url, async (req, res, ctx) => {
            const { email } = req.body
            const data = await create({ email })

            return res(ctx.json(data))
          })
        )

        const response = await axios.post(url)

        expect(response.data.success).toBe(false)
      })

      it('should respond with error message', async () => {
        server.use(
          rest.post(url, async (req, res, ctx) => {
            const { email } = req.body
            const data = await create({ email })

            return res(ctx.status(201), ctx.json(data))
          })
        )

        const response = await axios.post(url)

        expect(response.data.error).toBe('Failed finding user')
        expect(response.data.data).toBe(undefined)
      })
    })
  })
})
