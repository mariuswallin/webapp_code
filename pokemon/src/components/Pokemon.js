import { useEffect, useState } from 'react'

const Pokeman = ({ pokemon }) => {
  const [experience, setExperience] = useState(null)

  const getPokemonInfo = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setExperience(data?.base_experience)
  }

  useEffect(() => {
    getPokemonInfo(pokemon?.url)
  }, [pokemon?.url])

  return (
    <article className="pokemon">
      <h2>{pokemon.name}</h2>
      <p>Experience: {experience}</p>
      <button type="button" onClick={() => getPokemonInfo(pokemon.url)}>
        Se pokemon experience
      </button>
    </article>
  )
}

export default Pokeman
