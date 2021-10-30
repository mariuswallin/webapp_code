import { UserErrors } from './users.errors'
import * as usersRepo from './users.repository'
import { Result } from '@/lib/api/result'

export const create = async ({ email, nickname }) => {
  const user = await usersRepo.exist({ email })

  // feil med hentingen av data fra databasen via ORM
  if (!user?.success) {
    Result.failure(user.error)
  }

  // bruker finnes hvis data har verdi
  if (user.data) {
    return Result.failure(UserErrors.exist(email))
  }

  const createdUser = await usersRepo.create({ email, nickname })

  // feil ved lagring av bruker via ORM
  if (!createdUser.success) {
    return Result.failure(createdUser.error)
  }

  return Result.success(createdUser.data)
}

export const list = async () => {
  const users = await usersRepo.findMany()

  if (users?.success) {
    Result.failure(users.error)
  }

  return Result.success(users.data)
}

export const getUserFeeds = async ({ email }) => {
  const user = await usersRepo.exist({ email })

  // feil med hentingen av data fra databasen via ORM
  if (user?.success) return { success: false, error: user.error }

  // bruker finnes hvis data har verdi
  if (!user.data) return { success: false, error: 'User does not exist' }

  const userWithFeeds = await usersRepo.findFeeds({ email })

  if (!userWithFeeds?.success)
    return { success: false, error: userWithFeeds.error }

  return { success: true, data: userWithFeeds.data }
}
