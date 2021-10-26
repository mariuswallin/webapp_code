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

  if (feed.data)
    return {
      success: false,
      type: 'Feed.Duplicate',
      error: `Item with ${url} already exist`,
    }
  const user = await usersRepo.exist({ email })

  if (!user.success) return { success: false, error: user.error }
  if (!user.data)
    return {
      success: false,
      type: 'User.NotExist',
      error: `User with ${email} does not exist`,
    }

  const createdFeed = await feedsRepo.create({
    url,
    name,
    userId: user.data.id,
  })

  if (!createdFeed.success) return { success: false, error: createdFeed.error }

  return { success: true, data: createdFeed.data }
}

// export const getByUrl = async ({ url }) => {
//   const { success, data: feed, error } = await feedsRepo.findUnique({ url })

//   if (!success) return Result.failure(error)
//   if (!feed) {
//     return Result.failure(
//       FeedErrorTypes.FeedNotExists(`Item with ${url} does not exist`)
//     )
//   }

//   return Result.success(feed)
// }

// export const deleteByUrl = async ({ url }) => {
//   const { success, data: feed, error } = await feedsRepo.exist({ url })

//   if (!success) return Result.failure(error)

//   if (!feed) {
//     return Result.failure(
//       FeedErrorTypes.FeedNotExists(`Item with ${url} does not exist`)
//     )
//   }

//   const removedFeed = await feedsRepo.removeById(feed.id)

//   if (!removedFeed.success) return Result.failure(removedFeed.error)

//   return Result.success(removedFeed)
// }

// export const putByUrl = async (url, data) => {
//   const { success, data: feed, error } = await feedsRepo.exist({ url })

//   if (!success) return Result.failure(error)

//   if (!feed) {
//     return Result.failure(
//       FeedErrorTypes.FeedExists(`Item with ${url} does not exist`)
//     )
//   }

//   if (data?.url) {
//     const feedUpdatedUrl = await feedsRepo.exist({ url: data.url })

//     if (feedUpdatedUrl?.data) {
//       return Result.failure(
//         FeedErrorTypes.FeedExists(`Item with ${data.url} already exist`)
//       )
//     }
//   }

//   const updatedFeed = await feedsRepo.updateById(feed.id, data)

//   if (!updatedFeed.success) return Result.failure(updatedFeed.error)

//   return Result.success(updatedFeed)
// }

// export const getFeedFollowers = async (url) => {
//   const { success, data: feed, error } = await feedsRepo.exist({ url })

//   if (!success) return Result.failure(error)

//   if (!feed) {
//     return Result.failure(
//       FeedErrorTypes.FeedNotExists(`Feed with ${url} does not exist`)
//     )
//   }
//   const followers = await feedsRepo.findFollowers(feed.id)

//   if (!followers.success) return Result.failure(followers.error)

//   return Result.success(followers)
// }
