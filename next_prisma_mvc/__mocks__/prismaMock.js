/* eslint-disable no-use-before-define */
import { mockDeep, mockReset } from 'jest-mock-extended'

import prisma from '@/lib/clients/db'

jest.mock('@/lib/clients/db', () => ({
  __esModule: true,
  default: mockDeep(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma
