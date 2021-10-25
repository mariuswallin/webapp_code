import * as feedsService from './feeds.service'
import { ApiResponse, ErrorHandler } from '@/lib/api'

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

  const {
    success,
    data: feed,
    error,
  } = await feedsService.create({
    name,
    url,
  })

  if (!success) {
    return ErrorHandler(res, error)
  }

  return ApiResponse(res).created(feed.data)
}

export const getFeedByUrl = async (req, res) => {
  const { url } = req.query

  if (!url) return ApiResponse(res).badRequest('Missing required field url')

  const feed = await feedsService.getByUrl({
    url,
  })

  if (!feed?.success) {
    return ErrorHandler(res, feed.error)
  }

  return ApiResponse(res).created(feed.data)
}

export const updateFeedbyUrl = async (req, res) => {
  const { url } = req.query
  const data = req.body

  if (!url) return ApiResponse(res).badRequest('Missing required field url')

  const feed = await feedsService.putByUrl(url, data)

  if (feed?.error) {
    return ErrorHandler(res, feed.error)
  }

  return ApiResponse(res).ok(feed.data)
}

export const removeFeedbyUrl = async (req, res) => {
  const { url } = req.query

  if (!url) return ApiResponse(res).badRequest('Missing required field url')

  const removedFeed = await feedsService.deleteByUrl({
    url,
  })

  if (!removedFeed.success) {
    return ErrorHandler(res, removedFeed.error)
  }

  return ApiResponse(res).ok(removedFeed.data)
}

export const listFeedFollowers = async (req, res) => {
  const { url } = req.query

  const followers = await feedsService.getFeedFollowers(url)

  if (!followers.success) return ErrorHandler(res, followers.error)

  return ApiResponse(res).ok(followers.data)
}
