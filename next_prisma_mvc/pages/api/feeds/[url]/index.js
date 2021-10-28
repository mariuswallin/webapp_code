// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as feedsController from '@/features/feeds/feeds.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await feedsController.getFeedByUrl(req, res)
      break
    case 'delete':
      await feedsController.removeFeedbyUrl(req, res)
      break
    case 'put':
      await feedsController.updateFeedbyUrl(req, res)
      break
    default:
      res.status(405).end()
  }
}
