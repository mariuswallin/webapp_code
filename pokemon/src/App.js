import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Pokemons from './components/Pokemons'

const App = () => {
  const [pokemons, setPokemons] = useState([])

  const getPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=25')
    const data = await response.json()
    setPokemons(data?.results)
  }

  useEffect(() => {
    getPokemons()
  }, [])

  return (
    <Layout>
      <Pokemons pokemons={pokemons} />
      <button type="button" onClick={getPokemons}>
        Hent data
      </button>
    </Layout>
  )
}

export default App
