import * as feedFollowController from '@/features/feed-follow/feedFollow.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await feedFollowController.listFeedFollowers(req, res)
      break
    default:
      res.status(405).end()
  }
}
