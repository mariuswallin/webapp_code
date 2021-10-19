import { useState } from 'react'

import axios from 'axios'

const CreateFeedback = () => {
  const [feedback, setFeedback] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = await axios.post('/api/feedbacks', { feedback })

    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  )
}

export default CreateFeedback
