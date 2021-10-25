import * as usersRepo from './users.repository'

export const create = async ({ email }) => {
  const user = await usersRepo.exist({ email })

  if (!user.success) return { success: false, error: user.error }

  if (user) return { success: false, error: 'User already exist' }

  const createdUser = await usersRepo.create({ email })

  if (!createdUser.success) return { success: false, error: createdUser.error }

  return { success: false, error: createdUser.data }
}
