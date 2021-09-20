/**
 *
 * @param {boolean} started - Prop fra App.js. Oppdaters ved klikk på "start game" i denne komponenten
 * @param {function} initGame - Prop fra App.js. Trigger funksjonen initGame i App.js som setter isStarted til true
 * @param {array} players - Prop fra App.js. Gir oss tilgang til state-variabelen players i App.js. Brukes til å oppdatere verdien i input slik at feltet blir controlled
 * @param {function} addPlayer - Prop fra App.js. Trigges av onChange i input her i komponenten. Trigger addPlayer i App.js som oppdaterer players
 * @returns PlayerForm
 */
const PlayerForm = ({ started, initGame, players, addPlayer }) => {
  // brukes til å sjekke at det er fylt inn data i begge inputs (knappen er ikke aktiv før det)
  const isDisabled = () => !players.playerOne || !players.playerTwo

  return (
    <>
      {/* Skjuler skjema når vi har trykket på 'Start game' - applikasjonen har startet */}
      {/* onSubmit (prop fra App.js) trigges når vi klikker på 'start game' */}
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
          {/* onChange trigges når vi skriver i inputen. Trigger addPlayer som kommer som prop fra App.js */}
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
