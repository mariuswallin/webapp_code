import * as usersService from './users.service'

export const createUsers = async (req, res) => {
  const { email } = req.body

  if (!email)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field' })

  const createdUser = await usersService.create({ email })

  if (!createdUser?.success)
    return res.status(500).json({
      success: false,
      error: createdUser.error,
    })

  return res.status(201).json({
    success: true,
    data: createdUser.data,
  })
}
