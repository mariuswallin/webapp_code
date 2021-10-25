/* eslint-disable no-param-reassign */
import { Result } from '@/lib/api'
import prisma from '@/lib/clients/db'
import { validatedFilters } from '@/lib/repository/validateFilters'
import { PrismaError } from '@/lib/types/errors'

const validFeedFilters = ['url', 'name']

export const findMany = async (query) => {
  try {
    let feeds

    const { hasValidFilters, filters } = validatedFilters(
      validFeedFilters,
      query
    )

    if (hasValidFilters) {
      feeds = await prisma.feed.findMany({
        where: {
          ...filters,
        },
      })
    } else {
      feeds = await prisma.feed.findMany()
    }

    return Result.success(feeds)
  } catch (error) {
    return Result.failure(PrismaError.Read('feed', 'Failed finding feeds'))
  }
}

export const create = async (data) => {
  try {
    const feed = await prisma.feed.create({ data })

    return Result.success(feed)
  } catch (error) {
    return Result.failure(PrismaError.Read('feed', 'Failed creating feed'))
  }
}

export const exist = async (identifier) => {
  try {
    const feed = await prisma.feed.findUnique({
      where: {
        ...identifier,
      },
    })

    return Result.success(feed)
  } catch (error) {
    return Result.failure(
      PrismaError.Read(
        'feed',
        `Error finding feed with identifier: ${identifier}`
      )
    )
  }
}

export const findUnique = async (identifier) => {
  try {
    const feed = await prisma.feed.findUnique({
      where: {
        ...identifier,
      },
    })

    return Result.success(feed)
  } catch (error) {
    return Result.failure(
      PrismaError.Read(
        'feed',
        `Error finding feed with identifier: ${identifier}`
      )
    )
  }
}

export const updateById = async (id, { name, url }) => {
  try {
    const feed = await prisma.feed.update({
      where: { id },
      data: { name, url },
    })

    return Result.success(feed)
  } catch (error) {
    return Result.failure(PrismaError.Update('feed', 'Failed updating feed'))
  }
}

export const removeById = async (id) => {
  try {
    const feed = await prisma.feed.delete({ where: { id } })

    return Result.success(feed)
  } catch (error) {
    return Result.failure(PrismaError.Delete('feed', 'Failed deleting feed'))
  }
}

export const findFollowers = async (id) => {
  try {
    const feed = await prisma.feed.findUnique({
      where: { id },
      include: {
        followers: true,
      },
    })

    return Result.success(feed)
  } catch (error) {
    return Result.failure(
      PrismaError.Read('feed', 'Failed finding followers of feed')
    )
  }
}
