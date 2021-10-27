import * as feedsRepo from '../feeds/feeds.repository'
import * as usersRepo from '../users/users.repository'
import * as followersRepo from './followers.repository'
import { Result } from '@/lib/api/Result'
import { FeedErrorTypes, UserErrorTypes } from '@/lib/types/errors'

export const create = async ({ email, url }) => {
  const feed = await feedsRepo.exist({ url })

  if (!feed?.success) return Result.failure(feed?.error)

  if (!feed?.data)
    return Result.failure(
      FeedErrorTypes.FeedNotExists(`Feed with ${url} does not exist`)
    )

  const user = await usersRepo.exist({ email })

  if (user?.error) return Result.failure(user?.error)

  if (!user?.data) return Result.failure(UserErrorTypes.UserNotExists(email))

  const following = await followersRepo.exist({
    userId: user.data.id,
    feedId: feed.data.id,
  })

  if (!following?.success) return Result.failure(following?.error)

  if (following?.data)
    return Result.failure(UserErrorTypes.AlreadyFollowing(url))

  const {
    success,
    data: createdFollowing,
    error,
  } = await followersRepo.create({
    userId: user.data.id,
    feedId: feed.data.id,
  })

  if (!success) return Result.failure(error)

  return Result.success(createdFollowing)
}
