import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const amalie = {
  email: 'amalie@hiof.no',
  nickname: 'amaliedev',
}

const aleksander = {
  email: 'aleksander@hiof.no',
  nickname: 'aleksander',
}

async function main() {
  console.log('Start seeding ...')
  await prisma.user.create({ data: { ...amalie } })
  await prisma.user.create({ data: { ...aleksander } })
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
