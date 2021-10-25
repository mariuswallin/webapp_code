import prisma from '@/lib/clients/db'

export const create = async (data) => {
  try {
    const user = await prisma.user.create({ data })

    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: 'Failed creating user' }
  }
}

export const exist = async ({ email }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: 'Failed finding user' }
  }
}
