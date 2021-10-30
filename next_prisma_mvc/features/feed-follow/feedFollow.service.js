import * as feedsRepo from '../feeds/feeds.repository'
import * as usersRepo from '../users/users.repository'
import * as feedFollowRepo from './feedFollow.repository'

export const create = async ({ email, url }) => {
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

  const feedFollowing = await feedFollowRepo.exist({
    userId: user.data.id,
    feedId: feed.data.id,
  })

  if (!feedFollowing.success) {
    return { success: false, error: feedFollowing.error }
  }

  if (feedFollowing?.data) {
    return {
      success: false,
      type: 'FeedFollowing.Exist',
      error: `User with ${email} already follows feed with ${url}`,
    }
  }

  const createdFollowing = await feedFollowRepo.create({
    userId: user.data.id,
    feedId: feed.data.id,
  })

  if (!createdFollowing.success) {
    return { success: false, error: createdFollowing.error }
  }

  return { success: true, data: createdFollowing.data }
}

export const getFeedFollowers = async (url) => {
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

  const feedFollowers = await feedFollowRepo.findMany({ feedId: feed.data.id })
  // const feedFollowers = await feedFollowRepo.findManyExtended({
  //   feedId: feed.data.id,
  // })

  if (!feedFollowers.success) {
    return { success: false, error: feedFollowers.error }
  }

  return { success: true, data: feedFollowers.data }
}
