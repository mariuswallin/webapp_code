// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { numberOne, numberTwo, method } = req.body
  let sum = 0

  if (method === 'divide') {
    if (numberTwo <= 0) {
      res.status(400).json({ message: 'NumberTwo kan ikke være under 0' })

      return
    }
    sum = numberOne / numberTwo
  } else {
    sum = numberOne + numberTwo
  }

  res.status(200).json(sum)
}
