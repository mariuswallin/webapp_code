import * as usersRepo from './users.repository'

export const create = async ({ email }) => {
  const user = await usersRepo.exist({ email })

  // feil med hentingen av data fra databasen via ORM
  if (user?.error) return { success: false, error: user.error }

  // bruker finnes hvis data har verdi
  if (user.data) return { success: false, error: 'User already exist' }

  const createdUser = await usersRepo.create({ email })

  // feil ved lagring av bruker via ORM
  if (!createdUser.success) return { success: false, error: createdUser.error }

  return { success: true, data: createdUser.data }
}
