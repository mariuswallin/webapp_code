export const UserErrors = {
  exist(identifier) {
    return {
      type: 'User.Exist',
      message: `User with ${identifier} already exist`,
    }
  },
}
