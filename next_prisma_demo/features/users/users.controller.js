import * as usersService from './users.service'
import { ApiResponse, ErrorHandler } from '@/lib/api'

export const createUser = async (req, res) => {
  const { email } = req.body

  if (!email)
    return ApiResponse(res).badRequest('Missing required field: email')

  const createdUser = await usersService.create({
    email,
  })

  if (!createdUser?.success) {
    return ErrorHandler(res, createdUser.error)
  }

  return ApiResponse(res).created(createdUser.data)
}
