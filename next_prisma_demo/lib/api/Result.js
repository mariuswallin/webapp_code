export const Result = {
  success(data) {
    return { success: true, data }
  },
  failure(type = 'Fail', error) {
    return { type, success: false, error }
  },
}

// TODO: Refactor to generic Errorhandler

/*
if (createdFeed?.error) {
    switch (createdFeed.type) {
      case 'conflict':
        return ApiResponse(res).conflict(createdFeed?.error)
      case 'notFound':
        return ApiResponse(res).notFound(createdFeed?.error)
      case 'fail':
        return ApiResponse(res).serverError(createdFeed?.error)
      default:
        break
    }
  } else {
    return ApiResponse(res).created(createdFeed)
  }
*/

// TODO: Add specific types and link to docs and more, check video 400

/*

export const UserErrorTypes = {
  UserExists: 'User.AlreadyExists',
  ...
}

*/
