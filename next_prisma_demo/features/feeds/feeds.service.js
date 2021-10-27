import * as feedsRepo from './feeds.repository'
import { Result } from '@/lib/api/Result'
import { FeedErrorTypes } from '@/lib/types/errors'

export const list = async (query) => {
  const feeds = await feedsRepo.findMany(query)

  return feeds
}

export const create = async ({ url, name }) => {
  const { success, data: feed, error } = await feedsRepo.exist({ url })

  if (!success) return Result.failure(error)

  if (feed)
    return Result.failure(
      FeedErrorTypes.FeedExists(`Item with ${url} already exist`)
    )

  const createdFeed = await feedsRepo.create({ url, name })

  if (!createdFeed.success) return Result.failure(createdFeed.error)

  return Result.success(createdFeed)
}

export const getByUrl = async ({ url }) => {
  const { success, data: feed, error } = await feedsRepo.findUnique({ url })

  if (!success) return Result.failure(error)
  if (!feed) {
    return Result.failure(
      FeedErrorTypes.FeedNotExists(`Item with ${url} does not exist`)
    )
  }

  return Result.success(feed)
}

export const deleteByUrl = async ({ url }) => {
  const { success, data: feed, error } = await feedsRepo.exist({ url })

  if (!success) return Result.failure(error)

  if (!feed) {
    return Result.failure(
      FeedErrorTypes.FeedNotExists(`Item with ${url} does not exist`)
    )
  }

  const removedFeed = await feedsRepo.removeById(feed.id)

  if (!removedFeed.success) return Result.failure(removedFeed.error)

  return Result.success(removedFeed)
}

export const putByUrl = async (url, data) => {
  const { success, data: feed, error } = await feedsRepo.exist({ url })

  if (!success) return Result.failure(error)

  if (!feed) {
    return Result.failure(
      FeedErrorTypes.FeedExists(`Item with ${url} does not exist`)
    )
  }

  if (data?.url) {
    const feedUpdatedUrl = await feedsRepo.exist({ url: data.url })

    if (feedUpdatedUrl?.data) {
      return Result.failure(
        FeedErrorTypes.FeedExists(`Item with ${data.url} already exist`)
      )
    }
  }

  const updatedFeed = await feedsRepo.updateById(feed.id, data)

  if (!updatedFeed.success) return Result.failure(updatedFeed.error)

  return Result.success(updatedFeed)
}

export const getFeedFollowers = async (url) => {
  const { success, data: feed, error } = await feedsRepo.exist({ url })

  if (!success) return Result.failure(error)

  if (!feed) {
    return Result.failure(
      FeedErrorTypes.FeedNotExists(`Feed with ${url} does not exist`)
    )
  }
  const followers = await feedsRepo.findFollowers(feed.id)

  if (!followers.success) return Result.failure(followers.error)

  return Result.success(followers)
}
