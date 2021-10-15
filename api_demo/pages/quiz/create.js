import { useState } from 'react'

import axios from 'axios'

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState([])
  const [error, setError] = useState(null)
  const [question, setQuestion] = useState('')

  // håndtere endringer i input
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const createQuiz = async () => {
    try {
      // sender POST-request via axios.post
      // sender til /api/quiz
      // sender med data { question }
      const response = await axios.post('/api/quiz', { question })

      if (response?.data?.success) {
        setQuiz(response.data.data)
      }
    } catch (err) {
      // hvis feil oppdatere error staten
      // err?.response?.data? kommer fra axios
      // .error har vi laget selv i API
      setError(err?.response?.data?.error)
    }
  }

  // håndtere sending av skjema
  const handleSubmit = async (event) => {
    // forhindre default adferd
    event.preventDefault()
    // trigge funksjonen som sender data til API
    await createQuiz()
  }

  // Hvis feil gi beskjed om dette til brukeren
  // Vi skal håndtere denne bedre i fremtidig leksjoner
  if (error) {
    return <p>Noe gikk galt: {error}</p>
  }

  return (
    <div>
      <h1>Create Quiz</h1>
      <form style={{ marginBottom: '2rem' }} onSubmit={handleSubmit}>
        <label htmlFor="question">Lag nytt spørsmål</label>
        <input
          id="question"
          type="text"
          name="question"
          value={question}
          onChange={handleQuestionChange}
        />
        <button type="submit">Send</button>
      </form>
      <section>{JSON.stringify(quiz)}</section>
    </div>
  )
}

export default CreateQuiz
