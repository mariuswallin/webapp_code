// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as feedsController from '@/features/feeds/feeds.controller'
import { createFeed, listFeeds } from '@/features/feeds/feeds.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      await feedsController.createFeed(req, res)
      break
    case 'get':
      await feedsController.listFeeds(req, res)
      break
    default:
      res.status(405).end()
  }
}
