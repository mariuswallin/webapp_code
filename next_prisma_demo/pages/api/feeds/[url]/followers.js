// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as feedsController from '@/features/feeds/feeds.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await feedsController.listFeedFollowers(req, res)
      break
    default:
      res.status(405).end()
  }
}
