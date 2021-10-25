import * as usersRepo from './users.repository'
import { Result } from '@/lib/api'
import { UserErrorTypes } from '@/lib/types/errors'

export const create = async ({ email }) => {
  const { success, data: user, error } = await usersRepo.exist({ email })

  if (!success) return Result.failure(error)

  if (user) return Result.failure(UserErrorTypes.UserExists(email))

  const createdUser = await usersRepo.create({ email })

  if (!createdUser.success) Result.failure(createdUser.error)

  return Result.success(createdUser)
}
