export const PrismaErrors = {
  create(resource, message, prismaError) {
    // Logging error prismaError
    console.log(prismaError)

    return { resource, message: message ?? `Failed creating ${resource}` }
  },
  read(resource, message, prismaError) {
    // Logging error prismaError
    console.log(prismaError)

    return { resource, message: message ?? `Failed finding ${resource}` }
  },
  update(resource, message, prismaError) {
    // Logging error prismaError
    console.log(prismaError)

    return { resource, message: message ?? `Failed updating ${resource}` }
  },
  delete(resource, message, prismaError) {
    // Logging error prismaError
    console.log(prismaError)

    return {
      resource,
      message: message ?? `Failed deleting ${resource}`,
    }
  },
}
