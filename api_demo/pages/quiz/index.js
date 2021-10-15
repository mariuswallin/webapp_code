import { useEffect, useState } from 'react'

import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'

const Quiz = () => {
  const [quiz, setQuiz] = useState([])

  const getQuizzes = async () => {
    try {
      // GET-request til /api/quiz
      const response = await axios.get('/api/quiz')

      // response.data kommer fra axios
      // success er noe som jeg har laget i responsen
      if (response?.data?.success) {
        // oppdaterer state med data fra API
        setQuiz(response.data.data)
      }
    } catch (error) {
      // console.log av feilen
      console.log(error?.response?.data)
    }
  }

  // trigger henting av data når komponenten lages
  useEffect(() => {
    getQuizzes()
  }, [])

  return (
    <div>
      <Head>
        <title>Quiz</title>
      </Head>
      <h1>Quiz</h1>
      <Image
        alt="Mountains"
        src={
          'https://images.unsplash.com/photo-1627483298235-f3bac2567c1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        }
        layout="responsive"
        width={700}
        height={475}
      />
      {/* Kun for å debugge å se hva som kommer tilbake */}
      <section>{JSON.stringify(quiz)}</section>
    </div>
  )
}

export default Quiz
