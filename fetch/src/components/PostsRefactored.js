/* eslint-disable jsx-a11y/no-autofocus */
// importerer useState for å kunne bruke hooket
import { useEffect, useState } from 'react'

const baseUrl = `https://jsonplaceholder.typicode.com/posts`

// Lager en generell hjelpefunksjon for å bruke fetch
const handleFetch = async (url) => {
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    return { success: true, data }
  }
  return { success: false, error: 'Noe gikk galt' }
}

// Lager to funksjoner som kan brukes for å hente Posts
const getPosts = async () => handleFetch(baseUrl)
const getPost = async (id) => handleFetch(`${baseUrl}/${id}`)

// Refactorering av Posts
const PostsRefactored = () => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')

  const handleInputChange = (event) => {
    setId(event.currentTarget.value)
  }

  useEffect(() => {
    const handleData = async () => {
      // nullstiller error når vi prøver å hente data på nytt
      setError(false)
      // oppdaterer loading verdien slik at brukeren vet at noe skjer
      setLoading(true)
      let data = null

      // sjekker om id har en verdi. Hvis ikke hent hele listen med posts
      if (!id) {
        data = await getPosts()
      } else {
        data = await getPost(id)
      }
      // Sjekker at vi har data og at hentingen var suksessfull
      if (data && data?.success) {
        // sjekker om vi har fått en liste tilbake
        if (Array.isArray(data?.data)) {
          setPosts(data?.data?.slice(0, 10))
        } else {
          // hvis vi ikke fikk en liste tilbake 'fake' at vi har en liste
          // gjør dette for å gjenbruke setPosts() og fortsatt få posts.map() til å fungere
          setPosts([data?.data])
        }
      } else {
        // Oppdaterer med feilmeldingen
        setError(data?.error)
        // Nullstiller listen med posts
        setPosts([])
      }
      // setter loading til false for å få vist resultatet av det vi har gjort
      setLoading(false)
    }

    handleData()
    // trigger useEffect når komponenten lages og når id oppdateres
  }, [id])

  // returnerer JSX <p>Laster ...</p> mens vi venter på data
  if (loading) return <p>Laster ...</p>

  return (
    <>
      {error ? <p>Noe gikk galt</p> : null}
      {posts && !error ? (
        <ul>
          {posts?.map((post) => (
            // bruker key for at React skal ha god ytelse (kreves av React)
            <li key={post.id}>{post?.title}</li>
          ))}
        </ul>
      ) : null}
      <input type="text" autoFocus onChange={handleInputChange} value={id} />
    </>
  )
}

// eksporterer PostsRefactored for at vi skal kunne bruke den i App.js
export default PostsRefactored
