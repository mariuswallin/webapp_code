// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const quiz = [
  {
    question: 'Spørsmål 1',
    answers: [
      {
        answere: 'Alternativ 1',
      },
      {
        answere: 'Alternativ 2',
      },
      {
        answere: 'Alternativ 3',
      },
      {
        answere: 'Alternativ 4',
        correct: true,
      },
    ],
  },
  {
    question: 'Spørsmål 2',
    answers: [
      {
        answere: 'Alternativ 1',
      },
      {
        answere: 'Alternativ 2',
      },
      {
        answere: 'Alternativ 3',
      },
      {
        answere: 'Alternativ 4',
        correct: true,
      },
    ],
  },
]

export default function handler(req, res) {
  if (req.method === 'POST') {
    // tar i mot data som sendes med forespørselen
    const data = req.body

    // undersøke om request body har key = question
    if (!data?.question) {
      // hvis ikke returner 400 Bad Request
      // sender med feilmelding
      res
        .status(400)
        .json({ success: false, error: 'Fyll ut all nødvendig data' })
    } else {
      // legger til data i quiz listen vår
      quiz.push(data)

      // sender status 201 (Created) og den nye oppdaterte listen
      res.status(201).json({ success: true, data: quiz })
    }
  } else if (req.method === 'PUT') {
    // sender status 405 => metoden er ikke lov
    res.status(405).end()
  } else {
    // håndterer alle andre responser
    res.status(200).json({ success: true, data: quiz })
  }
}
