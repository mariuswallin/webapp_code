import * as usersService from './users.service'
import { ApiResponse } from '@/lib/api/apiResponse'
import { validate } from '@/lib/validation'

export const createUser = async (req, res) => {
  const { email, nickname } = req.body

  // 400 Bad Request hvis valideringen feiler
  if (!validate.minLength(3, nickname) || !validate.isEmail(email))
    return ApiResponse(res).badRequest(
      'Missing required field: email or nickname'
    )

  const createdUser = await usersService.create({
    email,
    nickname,
  })

  // 409 Conflict eller 500 Internal Server Error hvis noe går galt
  if (!createdUser.success) {
    switch (createdUser?.error?.type) {
      case 'User.Exist':
        return ApiResponse(res).conflict(createdUser?.error?.message)
      default:
        return ApiResponse(res).serverError(createdUser?.error?.message)
    }
  }

  // 201 Created om alt går bra
  return ApiResponse(res).created(createdUser.data)
}

export const listAllUsers = async (req, res) => {
  const users = await usersService.list()

  if (!users?.success) {
    return ApiResponse(res).serverError(users.error)
  }

  return ApiResponse(res).ok(users)
}

export const listUserFeeds = async (req, res) => {
  const { email } = req.query

  if (!email)
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: email',
    })

  const users = await usersService.getUserFeeds({ email })

  if (!users?.success) {
    return res.status(500).json({
      success: false,
      error: users.error,
    })
  }

  return res.status(200).json({
    success: true,
    data: users.data,
  })
}
