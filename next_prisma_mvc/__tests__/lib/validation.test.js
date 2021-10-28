import { validate } from '@/lib/validation'

// for alle type kombinasjoner https://gist.github.com/cjaoude/fd9910626629b53c4d25

const wrongEmails = [
  'email@example..com',
  '@example.com',
  'email.example.com',
  'email..email@example.com',
]
const correctEmails = [
  'email@example.com',
  'firstname.lastname@example.com',
  '1234567890@example.com',
]

describe('Validation', () => {
  describe('When validating email', () => {
    it('should return false when wrong email is provided', () => {
      const emails = wrongEmails.filter((email) => validate.isEmail(email))

      expect(emails.length).toBe(0)
    })
    it('should return true when wrong email is provided', () => {
      const emails = correctEmails.filter((email) => validate.isEmail(email))

      expect(emails.length).toBe(correctEmails.length)
    })
  })
  describe('When validating min-length', () => {
    it('should return false when length is not provided', () => {
      const hasMinLength = validate.minLength(null, 'test')

      expect(hasMinLength).toBeFalsy()
    })
    it('should return false when value is not provided', () => {
      const hasMinLength = validate.minLength(2)

      expect(hasMinLength).toBeFalsy()
    })
    it('should return false when value is to short', () => {
      const hasMinLength = validate.minLength(5, 'test')

      expect(hasMinLength).toBeFalsy()
    })
    it('should return true when value has minimum length', () => {
      const hasMinLength = validate.minLength(2, 'te')

      expect(hasMinLength).toBeTruthy()
    })
  })
})
