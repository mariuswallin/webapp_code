// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { numberOne, numberTwo, method } = req.body
  let sum = 0

  if (method === 'divide') {
    sum = numberOne / numberTwo
  }

  res.status(200).json(sum)
}
