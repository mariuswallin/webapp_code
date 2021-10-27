import * as followersService from './followers.service'
import { ApiResponse, ErrorHandler } from '@/lib/api'

export const createFeedFollowing = async (req, res) => {
  const { url } = req.query
  const { email } = req.body

  if (!email || !url)
    return ApiResponse(res).badRequest('Missing required fields: email or url')

  const createdFollowing = await followersService.create({
    email,
    url,
  })

  if (!createdFollowing?.success) {
    return ErrorHandler(res, createdFollowing.error)
  }

  return ApiResponse(res).created(createdFollowing.data)
}
