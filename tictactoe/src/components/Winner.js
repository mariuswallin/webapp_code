const Winner = ({ winner, winningSquares, resetGame }) => (
  <>
    {winner ? (
      <section>
        <p>
          Congratulations {winner} with the {winningSquares} combination
        </p>
        <button type="button" onClick={resetGame}>
          New game
        </button>
      </section>
    ) : null}
  </>
)

export default Winner
