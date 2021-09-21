/* eslint-disable no-plusplus */
import { useState } from 'react'
import BoardItem from './BoardItem'

const Board = ({ rows, columns }) => {
  const [board, setBoard] = useState([])
  const [numbers, setNumbers] = useState([])
  const [guess, setGuess] = useState([])

  const createRandomNumber = () =>
    Math.floor(Math.random(0, 1) * (rows * columns))

  const newNumber = () => {
    const number = createRandomNumber()
    if (!numbers.includes(number)) {
      setNumbers((prev) => [...prev, number])
    }
  }
  const createBoard = () => {
    const boardNumbers = []
    for (let i = 0; i < rows * columns; i++) {
      boardNumbers.push(i)
    }
    setBoard(boardNumbers)
  }

  return (
    <>
      {numbers.length <= 7 &&
      numbers.filter((number) => guess.includes(number))?.length === 7 ? (
        <h1>Congratulations you won 7 million</h1>
      ) : (
        <>
          {numbers?.length > 0 ? (
            <p className="saved">{numbers.join(' ')}</p>
          ) : null}

          {guess?.length !== 7 && board?.length > 0 && (
            <h3>Click to select your 7 lucky numbers</h3>
          )}
          <button
            className="numbersBtn"
            type="button"
            onClick={newNumber}
            disabled={guess?.length !== 7}
          >
            Draw number
          </button>

          <button
            className="numbersBtn"
            type="button"
            onClick={createBoard}
            disabled={board?.length > 0}
          >
            Add board numbers
          </button>
          <section
            className="board"
            style={{
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {board?.length > 0
              ? board.map((number) => (
                  <BoardItem
                    key={number}
                    number={number}
                    numbers={numbers}
                    guess={guess}
                    setGuess={setGuess}
                  />
                ))
              : null}
          </section>
        </>
      )}
    </>
  )
}

export default Board
