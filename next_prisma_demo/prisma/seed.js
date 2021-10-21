import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Dummydata

const users = [
  { nickname: 'Test', email: 'test@test.no' },
  { nickname: 'Test 2', email: 'test2@test.no' },
]

const feeds = [
  { name: 'Feed 1', url: 'www.vg.no' },
  { name: 'Feed 2', url: 'www.hiof.no' },
]

const tags = [{ name: 'tag1' }, { name: 'tag2' }, { name: 'tag3' }]

const createUsers = async () => {
  const usersPromises = users.map(async (user) => {
    await prisma.user.create({
      data: {
        ...user,
      },
    })
  })

  await Promise.all(usersPromises)
}

const createUsersWithFeed = async () => {
  await Promise.all(
    users.map(async (user, index) => {
      await prisma.user.create({
        data: {
          ...user,
          feeds: {
            create: {
              ...feeds[index],
              tags: {
                create: {
                  ...tags[index],
                },
              },
            },
          },
        },
      })
    })
  )
}

const createFollowers = async () => {
  const user = await prisma.user.findUnique({
    where: {
      email: 'test@test.no',
    },
  })

  const feed = await prisma.feed.findUnique({
    where: {
      url: 'www.vg.no',
    },
  })

  await prisma.feedFollow.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      feed: {
        connect: { id: feed.id },
      },
    },
  })
}

const createFeeds = async () => {
  const feedPromises = feeds.map(async (feed) => {
    await prisma.feed.create({
      data: {
        ...feed,
      },
    })
  })

  console.log(feedPromises)

  await Promise.all(feedPromises)
}

const createTags = async () => {
  await Promise.all(
    tags.map(async (tag) => {
      await prisma.feedTag.create({
        data: {
          ...tag,
        },
      })
    })
  )
}

async function main() {
  console.log('Start seeding ...')
  await prisma.feedFollow.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.feed.deleteMany({})
  await prisma.feedTag.deleteMany({})
  // await createUsers()
  // await createUsersWithFeed()
  // await createFollowers()
  await createFeeds()
  // await createTags()
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
