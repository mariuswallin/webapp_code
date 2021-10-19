// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const feedbacks = []

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { feedback } = req.body

    if (feedback.length > 10) {
      res.status(400).json({ message: 'Text to long' })
    } else {
      feedbacks.push(feedback)
      res.status(201).json(feedbacks)
    }
  } else {
    res.status(200).json(feedbacks)
  }
}
