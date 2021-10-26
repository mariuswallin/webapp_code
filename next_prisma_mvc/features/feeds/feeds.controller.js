import * as feedsService from './feeds.service'

export const listFeeds = async (req, res) => {
  const { query } = req

  const feeds = await feedsService.list(query)

  if (feeds.error) return res.status(500).json(feeds.error)

  return res.status(200).json(feeds)
}

export const createFeed = async (req, res) => {
  // TODO: Validate fields => Happy path
  const { name, url, email } = req.body

  if (!name || !url || !email)
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, url or email',
    })

  const createdFeed = await feedsService.create({
    name,
    url,
    email,
  })

  if (!createdFeed.success) {
    switch (createdFeed?.type) {
      case 'Feed.Duplicate':
        return res.status(409).json({
          success: false,
          error: createdFeed.error,
        })
      case 'User.NotExist':
        return res.status(404).json({
          success: false,
          error: createdFeed.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: createdFeed.error,
        })
    }
  }

  return res.status(200).json(createdFeed)
}

// export const getFeedByUrl = async (req, res) => {
//   const { url } = req.query

//   if (!url) return ApiResponse(res).badRequest('Missing required field url')

//   const feed = await feedsService.getByUrl({
//     url,
//   })

//   if (!feed?.success) {
//     return ErrorHandler(res, feed.error)
//   }

//   return ApiResponse(res).created(feed.data)
// }

// export const updateFeedbyUrl = async (req, res) => {
//   const { url } = req.query
//   const data = req.body

//   if (!url) return ApiResponse(res).badRequest('Missing required field url')

//   const feed = await feedsService.putByUrl(url, data)

//   if (feed?.error) {
//     return ErrorHandler(res, feed.error)
//   }

//   return ApiResponse(res).ok(feed.data)
// }

// export const removeFeedbyUrl = async (req, res) => {
//   const { url } = req.query

//   if (!url) return ApiResponse(res).badRequest('Missing required field url')

//   const removedFeed = await feedsService.deleteByUrl({
//     url,
//   })

//   if (!removedFeed.success) {
//     return ErrorHandler(res, removedFeed.error)
//   }

//   return ApiResponse(res).ok(removedFeed.data)
// }

// export const listFeedFollowers = async (req, res) => {
//   const { url } = req.query

//   const followers = await feedsService.getFeedFollowers(url)

//   if (!followers.success) return ErrorHandler(res, followers.error)

//   return ApiResponse(res).ok(followers.data)
// }
