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
