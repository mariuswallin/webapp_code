import * as feedsRepo from './feeds.repository'
import { Result } from '@/lib/api/Result'

export const list = async (query) => {
  const { data, error } = await feedsRepo.findMany(query)

  if (error) return { success: false, error }

  return { success: true, data }
}

export const create = async ({ url, name }) => {
  const feed = await feedsRepo.exist(url)

  if (feed.success)
    return Result.failure(
      FeedErrorTypes.FeedExist,
      `Another item with this ${url} already exist`
    )

  const { data: createdFeed, error } = await feedsRepo.create({ url, name })

  if (error) return Result.failure(error)

  return Result.success(createdFeed)
}
