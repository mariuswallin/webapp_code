/* eslint-disable no-param-reassign */
import prisma from '@/lib/clients/db'

export const findMany = async () => {
  try {
    const feeds = await prisma.feed.findMany()

    return { success: true, data: feeds }
  } catch (error) {
    return { success: false, error: 'Failed finding feeds' }
  }
}

export const create = async ({ url, name, userId }) => {
  try {
    const feed = await prisma.feed.create({
      data: {
        url,
        name,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return { success: true, data: feed }
  } catch (error) {
    return { success: false, error: 'Failed creating feed' }
  }
}

export const exist = async (identifier) => {
  try {
    const feed = await prisma.feed.findUnique({
      where: {
        ...identifier,
      },
    })

    return { success: true, data: feed }
  } catch (error) {
    return { success: false, error: 'Failed finding feeds' }
  }
}

export const findUnique = async (identifier) => {
  try {
    const feed = await prisma.feed.findUnique({
      where: {
        ...identifier,
      },
    })

    return { success: true, data: feed }
  } catch (error) {
    return { success: false, error: 'Failed finding feed' }
  }
}

export const updateById = async (id, { name, url }) => {
  try {
    const feed = await prisma.feed.update({
      where: { id },
      data: { name, url },
    })

    return { success: true, data: feed }
  } catch (error) {
    return { success: false, error: 'Failed updating feed' }
  }
}

export const removeById = async (id) => {
  try {
    const feed = await prisma.feed.delete({ where: { id } })

    return { success: true, data: feed }
  } catch (error) {
    return { success: false, error: 'Failed deleting feed' }
  }
}

// export const findFollowers = async (id) => {
//   try {
//     const feed = await prisma.feed.findUnique({
//       where: { id },
//       include: {
//         followers: true,
//       },
//     })

//     return Result.success(feed)
//   } catch (error) {
//     return Result.failure(
//       PrismaError.Read('feed', 'Failed finding followers of feed')
//     )
//   }
// }
