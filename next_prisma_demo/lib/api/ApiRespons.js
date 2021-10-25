export const ApiResponse = (res) => ({
  ok: (data) => {
    return res.status(200).json({ success: true, data })
  },
  created: (data) => {
    return res.status(201).json({ success: true, data })
  },
  badRequest: (error = 'Dataen du har fylt ut innholder feil') => {
    return res.status(400).json({ success: false, error })
  },
  notFound: (error = 'Fant ikke ressursen du leter etter') => {
    return res.status(404).json({ success: false, error })
  },
  conflict: (error = 'Ressursen finnes fra før') => {
    return res.status(409).json({ success: false, error })
  },
  serverError: (error = 'Forespørselen feilet') => {
    return res.status(500).json({ success: false, error })
  },
})

export const ErrorHandler = (res, error) => {
  switch (error?.type) {
    case 'conflict':
      return ApiResponse(res).conflict(error)
    case 'notFound':
      return ApiResponse(res).notFound(error)
    case 'serverError':
      return ApiResponse(res).serverError(error)
    default:
      return res
        .status(600)
        .json({ success: false, error: 'Errortype not handled' })
  }
}
