// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { method, body } = req

  switch (method?.toLowerCase()) {
    case 'post':
      res.status(201).json()
      break
    case 'get':
      res.status(200).json()
      break
    case 'delete':
      res.status(204).end()
      break
    case 'put':
      res.status(200).json()
      break
    default:
      res.status(405).end()
  }
}
