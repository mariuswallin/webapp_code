/**
 *
 * @param {array} history - Prop fra App.js. Inneholder en liste med objekter {value: 'rute klikket på', player: 'navn'}
 * @returns BoardHistory
 */
const BoardHistory = ({ history }) => (
  // Bruker React.Fragment da vi ikke har noen <div></div>, <section></section> eller liknende rundt koden
  <>
    {/* Sjekker at history har noen verdier */}
    {history?.length > 0 ? (
      <ul>
        {/* Bruker array.map() for å gå igjennom listen */}
        {history.map((move, index) => (
          <li key={move + index}>
            <span>
              {/* Skriver ut verdien .player fra objektet {value: '', player: ''} */}
              #{index}: Player: {move.player} clicked square
            </span>
            <span>{move.value}</span>
          </li>
        ))}
      </ul>
    ) : null}
  </>
)

export default BoardHistory
