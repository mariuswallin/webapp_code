/* eslint-disable no-param-reassign */
import { Result } from '@/lib/api'
import prisma from '@/lib/clients/db'
import { PrismaError } from '@/lib/types/errors'

export const create = async ({ userId, feedId }) => {
  try {
    const followers = await prisma.feedFollow.create({
      data: {
        user: {
          connect: { id: userId },
        },
        feed: {
          connect: { id: feedId },
        },
      },
    })

    return Result.success(followers)
  } catch (error) {
    return Result.failure(
      PrismaError.Create('feedFollow', 'Failed create following')
    )
  }
}

export const exist = async ({ userId, feedId }) => {
  try {
    const followers = await prisma.feedFollow.findUnique({
      where: {
        userId_feedId: {
          userId,
          feedId,
        },
      },
    })

    return Result.success(followers)
  } catch (error) {
    return Result.failure(
      PrismaError.Read('followers', 'Failed finding followers')
    )
  }
}
