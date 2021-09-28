import Pokemon from './Pokemon'

const Pokemons = ({ pokemons }) => (
  <section className="pokemons">
    {pokemons?.length > 0
      ? pokemons.map((pokemon) => (
          <Pokemon key={pokemon.name} pokemon={pokemon} />
        ))
      : null}
  </section>
)

export default Pokemons
