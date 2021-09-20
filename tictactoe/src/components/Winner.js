/**
 *
 * @param {string} winner - Props som kommer fra App.js. Brukes til å skrive ut hvem som vant
 * @param {array} winningSquares - Props som kommer fra App.js. Brukes til skrive ut listekombinasjonen som vant
 * @param {function} resetGame - Props som kommer fra App.js. Brukes til starte et nytt spill
 * @returns
 */
const Winner = ({ winner, winningSquares, resetGame }) => (
  <>
    {/* Sjekker om winner har en verdi */}
    {winner ? (
      <section>
        <p>
          {/* Skriver ut winner og winningSquares som er dynamiske verdier  */}
          Congratulations {winner} with the {winningSquares} combination
        </p>
        {/* Registrerer klikk via onClick. Klikk trigger resetGame som kommer som prop fra App.js  */}
        <button type="button" onClick={resetGame}>
          New game
        </button>
      </section>
    ) : null}
  </>
)

export default Winner
