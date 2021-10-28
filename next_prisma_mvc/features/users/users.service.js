import * as usersRepo from './users.repository'

export const create = async ({ email, nickname }) => {
  const user = await usersRepo.exist({ email })

  // feil med hentingen av data fra databasen via ORM
  if (user?.error) return { success: false, error: user.error }

  // bruker finnes hvis data har verdi
  if (user.data) return { success: false, error: 'User already exist' }

  const createdUser = await usersRepo.create({ email, nickname })

  // feil ved lagring av bruker via ORM
  if (!createdUser.success) return { success: false, error: createdUser.error }

  return { success: true, data: createdUser.data }
}

export const list = async () => {
  const users = await usersRepo.findMany()

  if (users?.error) return { success: false, error: users.error }

  return { success: true, data: users.data }
}

export const getUserFeeds = async ({ email }) => {
  const user = await usersRepo.exist({ email })

  // feil med hentingen av data fra databasen via ORM
  if (user?.error) return { success: false, error: user.error }

  // bruker finnes hvis data har verdi
  if (!user.data) return { success: false, error: 'User does not exist' }

  const userWithFeeds = await usersRepo.findFeeds({ email })

  if (userWithFeeds?.error)
    return { success: false, error: userWithFeeds.error }

  return { success: true, data: userWithFeeds.data }
}
