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

  // 500 Internal Server Error hvis noe går galt
  if (!createdUser?.success) {
    return res.status(500).json({
      success: false,
      error: createdUser.error,
    })
  }

  // 201 Created om alt går bra
  return res.status(201).json({
    success: true,
    data: createdUser.data,
  })
}

export const listAllUsers = async (req, res) => {
  const users = await usersService.list()

  if (!users?.success) {
    return res.status(500).json({
      success: false,
      error: users.error,
    })
  }

  return res.status(200).json({
    success: true,
    data: users.data,
  })
}

export const listUserFeeds = async (req, res) => {
  const { email } = req.query

  if (!email)
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: email',
    })

  const users = await usersService.getUserFeeds({ email })

  if (!users?.success) {
    return res.status(500).json({
      success: false,
      error: users.error,
    })
  }

  return res.status(200).json({
    success: true,
    data: users.data,
  })
}
