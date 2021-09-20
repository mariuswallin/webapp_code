/**
 *
 * @param {array} board - Prop fra App.js som brukes til å lage boardet
 * @param {function} handleClick - Prop fra App.js som brukes til registrer klikk på en rute i Board. Kaller funksjon handleClick i App.js
 * @param {array} winningSquares - Prop fra App.js som brukes til å markere hvilke ruter som gjør at en player vinner.
 * @returns Board
 */

const Board = ({ board, handleClick, winningSquares }) => (
  <>
    {/* Sjekker at board har liste-elementer (at den har en lengde). Hvis ikke skriver den ikke ut noe */}
    {board?.length > 0 ? (
      <ul id="board">
        {/* bruker .map(item, index) til å lage rutene. 'item' er selve liste-elementet og informasjonen den består av */}
        {board.map((item, index) => (
          // key brukes av React for å ha god ytelse
          <li className="square" key={index}>
            {/* Oppdaterer klassen med klassenavnet 'winning' om winningSquares listen inneholder indexen til ruten vi lager */}
            {/* Klikk på knappen trigger handleClick i App.js. Sender med indexen til ruten vi klikket på */}
            <button
              className={`${winningSquares.includes(index) ? 'winning' : ''}`}
              type="button"
              onClick={() => handleClick(index)}
            >
              {/* Hvis item ikke har noen verdi vises indexen */}
              {item || index}
            </button>
          </li>
        ))}
      </ul>
    ) : null}
  </>
)

export default Board
