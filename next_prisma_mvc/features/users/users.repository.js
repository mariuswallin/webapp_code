import { PrismaErrors } from '@/lib/api/errors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

export const create = async (data) => {
  // bruker try/catch for å håndtere feil gitt av Prisma
  try {
    // bruker prisma clienten til å lage bruker
    // .create er metoden vi bruker for å lage noe
    const user = await prisma.user.create({ data })

    return Result.success(user)
  } catch (error) {
    return Result.failure(PrismaErrors.create('user', undefined, error))
  }
}

export const exist = async ({ email }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return Result.success(user)
  } catch (error) {
    return Result.failure(PrismaErrors.read('user', undefined, error))
  }
}

export const findMany = async () => {
  try {
    const users = await prisma.user.findMany()

    return Result.success(users)
  } catch (error) {
    return Result.failure(PrismaErrors.read('user', undefined, error))
  }
}

export const findFeeds = async ({ email }) => {
  try {
    const userWithFeeds = await prisma.user.findMany({
      where: {
        email,
      },
      include: {
        feeds: {
          select: {
            name: true,
          },
        },
      },
    })

    return { success: true, data: userWithFeeds }
  } catch (error) {
    return { success: false, error: 'Failed finding user with feeds' }
  }
}
