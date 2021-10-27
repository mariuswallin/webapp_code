// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as followersController from '@/features/followers/followers.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      await followersController.createFeedFollowing(req, res)
      break
    default:
      res.status(405).end()
  }
}
