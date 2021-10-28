export const ApiResponse = (res) => ({
  ok: (data) => {
    // Logging error
    return res.status(200).json({ success: true, data })
  },
  created: (data) => {
    // Logging error
    return res.status(201).json({ success: true, data })
  },
  badRequest: (error = 'Dataen du har fylt ut innholder feil') => {
    // Logging error
    return res.status(400).json({ success: false, error })
  },
  conflict: (error = 'Ressursen finnes allerede') => {
    // Logging error
    return res.status(409).json({ success: false, error })
  },
  serverError: (error = 'Forespørselen feilet') => {
    // Logging error
    return res.status(500).json({ success: false, error })
  },
})
