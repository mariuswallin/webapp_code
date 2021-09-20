/**
 *
 * @param {boolean} started - Trigges av klikk på "start game"
 * @param {function} started - Trigger funksjonen initGame i App.js som setter isStarted til true
 * @param {array} started - Gir oss tilgang til state-variabelen player i App.js. Brukes til å oppdatere verdien i input slik at feltet blir controlled
 * @param {function} addPlayer - Trigges av onChange i input. Trigger addPlayer i App.js som oppdaterer players state
 * @returns PlayerForm
 */
const PlayerForm = ({ started, initGame, players, addPlayer }) => {
  // brukes til å sjekke at det er fylt inn data i begge inputs
  const isDisabled = () => !players.playerOne || !players.playerTwo

  return (
    <>
      {/* Skjuler skjema når applikasjonen har startet */}
      {/* onSubmit trigges når vi klikker på 'start game' */}
      {!started ? (
        <form onSubmit={initGame}>
          <label htmlFor="playerOne">Add player one</label>
          <input
            name="playerOne"
            id="playerOne"
            type="text"
            value={players.playerOne}
            onChange={addPlayer}
          />
          <label htmlFor="playerTwo">Add player two</label>
          {/* onChange trigges når vi skriver i inputen */}
          {/* value peker til 'players' i App.js som er et objekt vi får som props */}
          <input
            name="playerTwo"
            id="playerTwo"
            type="text"
            value={players.playerTwo}
            onChange={addPlayer}
          />
          <button type="submit" disabled={isDisabled()}>
            Start game
          </button>
        </form>
      ) : null}
    </>
  )
}

export default PlayerForm
