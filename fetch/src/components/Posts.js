// importerer useState for å kunne bruke hooket
import { useEffect, useState } from 'react'

// Lager en komponent kalt Posts
const Posts = () => {
  // Lager statevariabler som vi kan bruke til å lagre dataen vi får tilbake fra API
  const [posts, setPosts] = useState([])
  // Lager en statevariabel som jeg kan oppdatere om vi får en feil
  const [error, setError] = useState(false)
  // Lager en statevariabel for å holde på det vi skriver i inputen
  const [id, setId] = useState('')

  // lager en funksjon vi kan bruke til å oppdater id`en når vi skriver i inputfeltet
  const handleInputChange = (event) => {
    setId(event.currentTarget.value)
  }

  // setter opp useEffect
  // tar i mot en callback () => {}
  // inne i denne callbacken trigger vi det vi ønsker at skal skje
  useEffect(() => {
    // sjekker om id har en verdi. Hvis ikke avbryt
    if (!id) return
    const getPost = async () => {
      // Venter på svarer fra fetch kallet
      // bruker `` for å kunne ha en dynamisk streng
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      )
      // sjekker om responsen vi får tilbake er ok
      if (response.ok) {
        // Venter på konverteringen til JSON av svaret fra fetch
        const data = await response.json()
        // Oppdaterer listen med dataen vi har fått tilbake
        // Må ha data inne [] her for å "fake" at det er en liste
        setPosts([data])
      } else {
        // oppdaterer error staten hvis responsen ikke er ok
        setError(true)
        // nullstiller listen hvis feil
        setPosts([])
      }
    }

    getPost()
    // trigger useEffect når komponenten lages og når id oppdaters
  }, [id])

  // Lager en funksjon som skal trigges på klikk
  // Bruker async da vi må vente på svarer fra urlen nedenfor
  const getPosts = async () => {
    // Venter på svarer fra fetch kallet
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // sjekker om responsen vi får tilbake er ok
    if (response.ok) {
      // Venter på konverteringen til JSON av svaret fra fetch
      const data = await response.json()
      // Oppdaterer listen med posts med dataen vi har fått tilbake
      // Velger å vise kun 10 posts
      setPosts(data?.slice(0, 10))
    } else {
      // oppdaterer error staten hvis responsen ikke er ok
      setError(true)
    }
  }

  // JSX vi vil at skal skrives ut som HTML
  // Bruker Fragments <></> for å wrappe innholdet (kunne brukt en div e.l)
  return (
    <>
      {/* bruker conditional til å skrive ut meldingen hvis noe er feil */}
      {error ? <p>Noe gikk galt</p> : null}
      {/* bruker .map() på posts for å skrive ut listen vi får tilbake */}
      {/* bruker ?. for å forhindre at vi prøver å gjøre noe hvis verdien er null / undefined */}
      <ul>
        {posts?.map((post) => (
          // bruker key for at React skal ha god ytelse (kreves av React)
          <li key={post.id}>{post?.title}</li>
        ))}
      </ul>
      {/* Lager en inputknapp med onChange event for å lytte til endringer */}
      {/* Legger til value for at React skal vite hva verdien */}
      <input type="text" onChange={handleInputChange} value={id} />
      {/* Lager en knapp med onClick event. Klikk trigger getPosts over */}
      <button type="button" onClick={getPosts}>
        Hent posts
      </button>
    </>
  )
}

// eksporterer Posts for at vi skal kunne bruke den i App.js
export default Posts
