import * as feedsRepo from './feeds.repository'
import * as usersRepo from '@/features/users/users.repository'

export const list = async () => {
  const feeds = await feedsRepo.findMany()

  if (!feeds.success) return { success: false, error: feeds.error }

  return { success: true, data: feeds.data }
}

export const create = async ({ url, name, email }) => {
  const feed = await feedsRepo.exist({ url })

  if (!feed.success) return { success: false, error: feed.error }

  if (feed.data) {
    return {
      success: false,
      type: 'Feed.Duplicate',
      error: `Item with ${url} already exist`,
    }
  }

  // sjekker om bruker finnes for å sikre at vi
  // kan lage en releasjon mellom user og feed
  const user = await usersRepo.exist({ email })

  if (!user.success) {
    return { success: false, error: user.error }
  }

  if (!user.data) {
    return {
      success: false,
      type: 'User.NotExist',
      error: `User with ${email} does not exist`,
    }
  }

  // sender nødvendig data for å lage en feed
  const createdFeed = await feedsRepo.create({
    url,
    name,
    userId: user.data.id,
  })

  if (!createdFeed.success) {
    return { success: false, error: createdFeed.error }
  }

  return { success: true, data: createdFeed.data }
}

export const getByUrl = async ({ url }) => {
  const feed = await feedsRepo.findUnique({ url })

  if (!feed.success) return { success: false, error: feed.error }
  if (!feed.data)
    return {
      success: false,
      type: 'Feed.NotExist',
      error: `Feed with ${url} does not exist`,
    }

  return { success: true, data: feed.data }
}

export const putByUrl = async (url, data) => {
  const feed = await feedsRepo.exist({ url })

  if (!feed.success) {
    return { success: false, error: feed.error }
  }

  if (!feed.data) {
    return {
      success: false,
      type: 'Feed.NotExist',
      error: `Feed with ${url} does not exist`,
    }
  }

  // brukes til å sjekke vi prøver å endre url`en til en feed
  // må da sjekke om den nye urlen finnes fra før
  if (data?.url) {
    const feedWithUpdateUrl = await feedsRepo.exist({ url: data.url })

    if (feedWithUpdateUrl?.data) {
      return {
        success: false,
        type: 'Feed.Duplicate',
        error: `Item with ${data.url} already exist`,
      }
    }
  }

  const updatedFeed = await feedsRepo.updateById(feed.data.id, data)

  if (!updatedFeed.success) {
    return { success: false, error: updatedFeed.error }
  }

  return { success: true, data: updatedFeed.data }
}

export const deleteByUrl = async ({ url }) => {
  const feed = await feedsRepo.exist({ url })

  if (!feed.success) {
    return { success: false, error: feed.error }
  }

  if (!feed.data) {
    return {
      success: false,
      type: 'Feed.NotExist',
      error: `Feed with ${url} does not exist`,
    }
  }

  const removedFeed = await feedsRepo.removeById(feed.data.id)

  if (!removedFeed.success) return { success: false, error: removedFeed.error }

  return { success: true, data: removedFeed.data }
}
