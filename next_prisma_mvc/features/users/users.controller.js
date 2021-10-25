import * as usersService from './users.service'

export const createUser = async (req, res) => {
  const { email } = req.body

  // 400 Bad Request hvis email mangler
  if (!email)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field: email' })

  const createdUser = await usersService.create({
    email,
  })

  // 500 Internal Server Error hvis noe går galt i servicen
  if (!createdUser?.success) {
    return res.status(500).json({
      success: false,
      error: createdUser.error,
    })
  }

  return res.status(201).json({
    success: true,
    error: createdUser.error,
  })
}
