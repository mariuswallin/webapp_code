const PlayerForm = ({ started, initGame, players, addPlayer }) => {
  const isDisabled = () => !players.playerOne || !players.playerTwo

  return (
    <>
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
