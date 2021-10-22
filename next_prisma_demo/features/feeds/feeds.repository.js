/* eslint-disable no-param-reassign */
import { Result } from '@/lib/api/Result'
import prisma from '@/lib/clients/db'
import { validatedFilters } from '@/lib/repository/validateFilters'

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
    console.log(error)

    return Result.failure('Error getting list of feeds')
  }
}

export const create = async (data) => {
  try {
    const feed = await prisma.feed.create({ data: { ...data } })

    return Result.success(feed)
  } catch (error) {
    console.log(error)

    return Result.failure('Failed creating feed')
  }
}

export const exist = async (identifier) => {
  try {
    const feed = await prisma.feed.findUnique({
      where: {
        ...identifier,
      },
    })

    return Result.success(!!feed)
  } catch (error) {
    console.log(error)

    return Result.failure('Error creating feeds')
  }
}
