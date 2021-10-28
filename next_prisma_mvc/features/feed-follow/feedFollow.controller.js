import * as feedFollowService from './feedFollow.service'

export const createFeedFollowing = async (req, res) => {
  // hente url fra /api/feeds/{url}/follow
  const { url } = req.query
  // hente email fra request.body sendt med f.eks axios
  const { email } = req.body

  if (!email || !url) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: url or email',
    })
  }

  const createdFollowing = await feedFollowService.create({
    email,
    url,
  })

  // Sjekker hva slags feil servicen gir
  // Dette for å sikre rett statuskode
  if (!createdFollowing.success) {
    switch (createdFollowing?.type) {
      case 'Feed.NotExist':
        return res.status(404).json({
          success: false,
          error: createdFollowing.error,
        })
      case 'User.NotExist':
        return res.status(404).json({
          success: false,
          error: createdFollowing.error,
        })
      case 'FeedFollowing.Exist':
        return res.status(409).json({
          success: false,
          error: createdFollowing.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: createdFollowing.error,
        })
    }
  }

  return res.status(201).json(createdFollowing)
}

export const listFeedFollowers = async (req, res) => {
  // hente url fra /api/feeds/{url}/follow
  const { url } = req.query

  if (!url) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: url',
    })
  }

  const feedFollowers = await feedFollowService.getFeedFollowers(url)

  // Sjekker hva slags feil servicen gir
  // Dette for å sikre rett statuskode
  if (!feedFollowers.success) {
    switch (feedFollowers?.type) {
      case 'Feed.NotExist':
        return res.status(404).json({
          success: false,
          error: feedFollowers.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: feedFollowers.error,
        })
    }
  }

  return res.status(200).json(feedFollowers)
}
