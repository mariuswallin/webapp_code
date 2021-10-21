import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Dummydata

async function main() {
  console.log('Start seeding ...')
  // Kalle på seed funksjoner
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
