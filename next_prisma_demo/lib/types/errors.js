export const PrismaError = {
  Create(resource, message) {
    return { resource, type: 'serverError', error: message }
  },
  Read(resource, message) {
    return { resource, type: 'serverError', error: message }
  },
  Update(resource, message) {
    return { resource, type: 'serverError', error: message }
  },
  Delete(resource, message) {
    return {
      resource,
      type: 'serverError',
      error: message,
    }
  },
}

export const FeedErrorTypes = {
  FeedExists(message = 'Feed.AlreadyExists') {
    return { type: 'conflict', error: message }
  },
  FeedNotExists(message = 'Feed.NotExist') {
    return { type: 'notFound', error: message }
  },
}

export const UserErrorTypes = {
  UserExists(identifier) {
    return {
      type: 'conflict',
      error: `User with ${identifier} already exist`,
    }
  },
  UserNotExists(identifier) {
    return {
      type: 'notFound',
      error: `User with ${identifier} does not exist`,
    }
  },
  AlreadyFollowing(feed) {
    return {
      type: 'conflict',
      error: `User are already following ${feed}`,
    }
  },
}
