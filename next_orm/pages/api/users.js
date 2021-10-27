/* eslint-disable consistent-return */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as usersController from '@/features/users/users.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method.toLowerCase()) {
    case 'post':
      await usersController.createUser(req, res)
      break
    default:
      return res.status(200).json({ message: method })
  }
}
