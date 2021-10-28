import * as feedsService from './feeds.service'

// GET
// /api/feeds
export const listFeeds = async (req, res) => {
  const feeds = await feedsService.list()

  if (feeds.error) return res.status(500).json(feeds.error)

  return res.status(200).json(feeds)
}

// POST
// /api/feeds
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

  // Sjekker hva slags feil servicen gir
  // Dette for å sikre rett statuskode
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

  return res.status(201).json(createdFeed)
}

// GET
// /api/feeds/{url}
// /api/feeds/www.myurl.com
export const getFeedByUrl = async (req, res) => {
  const { url } = req.query

  if (!url)
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: url',
    })

  const feed = await feedsService.getByUrl({
    url,
  })

  if (!feed?.success) {
    switch (feed?.type) {
      case 'Feed.NotExist':
        return res.status(404).json({
          success: false,
          error: feed.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: feed.error,
        })
    }
  }

  return res.status(200).json(feed)
}

// PUT
// /api/feeds/{url}
// /api/feeds/www.myurl.com
// BODY: {name: ..., url: ...}
export const updateFeedbyUrl = async (req, res) => {
  const { url } = req.query
  const data = req.body

  if (!url)
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, url or email',
    })

  const feed = await feedsService.putByUrl(url, data)

  if (!feed?.success) {
    switch (feed?.type) {
      case 'Feed.NotExist':
        return res.status(404).json({
          success: false,
          error: feed.error,
        })
      case 'Feed.Duplicate':
        return res.status(409).json({
          success: false,
          error: feed.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: feed.error,
        })
    }
  }

  return res.status(200).json(feed)
}

// DELETE
// /api/feeds/{url}
// /api/feeds/www.myurl.com
export const removeFeedbyUrl = async (req, res) => {
  const { url } = req.query

  if (!url)
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, url or email',
    })

  const removedFeed = await feedsService.deleteByUrl({
    url,
  })

  if (!removedFeed?.success) {
    switch (removedFeed?.type) {
      case 'Feed.NotExist':
        return res.status(404).json({
          success: false,
          error: removedFeed.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: removedFeed.error,
        })
    }
  }

  return res.status(204).end()
}
