const BoardHistory = ({ history }) => (
  <>
    {history?.length > 0 ? (
      <ul>
        {history.map((move, index) => (
          <li key={move + index}>
            <span>
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
