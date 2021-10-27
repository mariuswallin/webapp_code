import prisma from '@/lib/clients/db'

export const create = async (data) => {
  // bruker try/catch for å håndtere feil gitt av Prisma
  try {
    // bruker prisma clienten til å lage bruker
    // .create er metoden vi bruker for å lage noe
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

export const findMany = async () => {
  try {
    const users = await prisma.user.findMany()

    return { success: true, data: users }
  } catch (error) {
    return { success: false, error: 'Failed finding users' }
  }
}

export const findFeeds = async ({ email }) => {
  try {
    const userWithFeeds = await prisma.user.findMany({
      where: {
        email,
      },
      include: {
        feeds: {
          select: {
            name: true,
          },
        },
      },
    })

    return { success: true, data: userWithFeeds }
  } catch (error) {
    return { success: false, error: 'Failed finding user with feeds' }
  }
}
