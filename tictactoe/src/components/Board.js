const Board = ({ board, handleClick, winningSquares }) => (
  <>
    {board?.length > 0 ? (
      <ul id="board">
        {board.map((item, index) => (
          <li className="square" key={index}>
            <button
              className={`${winningSquares.includes(index) ? 'winning' : ''}`}
              type="button"
              onClick={() => handleClick(index)}
            >
              {item || index}
            </button>
          </li>
        ))}
      </ul>
    ) : null}
  </>
)

export default Board
