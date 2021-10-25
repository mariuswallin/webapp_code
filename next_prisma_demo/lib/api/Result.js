export const Result = {
  success(data) {
    return { success: true, data }
  },
  failure(error) {
    return { success: false, error }
  },
}
