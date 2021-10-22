import * as feedsRepo from './feeds.repository'
import * as feedsService from './feeds.service'
import { ApiResponse } from '@/lib/api/ApiRespons'

export const listFeeds = async (req, res) => {
  const { query } = req

  const { data: feeds, error } = await feedsService.list(query)

  if (error) return ApiResponse(res).serverError(error)

  return ApiResponse(res).ok(feeds)
}

export const createFeed = async (req, res) => {
  // TODO: Validate fields => Happy path
  const { name, url } = req.body

  if (!name || !url)
    return ApiResponse(res).badRequest('Missing required fields: name or url')

  const createdFeed = await feedsService.create({
    name,
    url,
  })

  if (createdFeed?.error) {
    switch (createdFeed.type) {
      case 'conflict':
        return ApiResponse(res).conflict(createdFeed?.error)
      case 'notFound':
        return ApiResponse(res).notFound(createdFeed?.error)
      case 'fail':
        return ApiResponse(res).serverError(createdFeed?.error)
      default:
        break
    }
  } else {
    return ApiResponse(res).created(createdFeed)
  }
}

export const updateFeed = () => {}

export const removeFeed = () => {}
