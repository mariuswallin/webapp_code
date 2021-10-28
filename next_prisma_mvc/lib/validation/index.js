export const validate = {
  minLength(length, value) {
    if (length && value?.length >= length) return true

    return false
  },
  isEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true
    }

    return false
  },
}
