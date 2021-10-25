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
