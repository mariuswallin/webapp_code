import { Result } from '@/lib/api'
import prisma from '@/lib/clients/db'
import { PrismaError } from '@/lib/types/errors'

export const create = async (data) => {
  try {
    const user = await prisma.user.create({ data })

    return Result.success(user)
  } catch (error) {
    return Result.failure(PrismaError.Create('user', 'Failed creating user'))
  }
}

export const exist = async (identifier) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        ...identifier,
      },
    })

    return Result.success(user)
  } catch (error) {
    return Result.failure(
      PrismaError.Read(
        'user',
        `Error finding user with identifier: ${identifier}`
      )
    )
  }
}
