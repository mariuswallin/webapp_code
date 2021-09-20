import { useState } from 'react'
import Board from './components/Board'
import BoardHistory from './components/BoardHistory'
import PlayerForm from './components/PlayerForm'
import Winner from './components/Winner'

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const calculateWinner = (board) => {
  for (const combination of winningCombinations) {
    const [first, second, third] = combination
    if (
      board[first] &&
      board[first] === board[second] &&
      board[first] === board[third]
    ) {
      return {
        winner: board[first],
        winningSquares: [first, second, third],
      }
    }
  }
  return {
    winner: null,
    winningSquares: [],
  }
}

const initialBoard = Array(9).fill(null)

const App = () => {
  const [player, setPlayer] = useState(null)
  const [players, setPlayers] = useState({ playerOne: '', playerTwo: '' })
  const [board, setBoard] = useState(initialBoard)
  const { winner, winningSquares } = calculateWinner(board)
  const [started, setStarted] = useState(false)
  const [history, setHistory] = useState([])

  const nextPlayer =
    player === players.playerOne ? players.playerTwo : players.playerOne

  const addPlayer = (event) => {
    const inputName = event.target.name
    const inputValue = event.target.value
    setPlayers((prev) => ({ ...prev, [inputName]: inputValue }))
  }

  const handleClick = (index) => {
    if (board[index] || winner) {
      return
    }
    const boardStatus = [...board]
    boardStatus[index] = player
    setBoard(boardStatus)
    setHistory((prev) => [...prev, { player, value: index }])
    setPlayer(nextPlayer)
  }

  const resetGame = () => {
    setBoard(initialBoard)
    setStarted(true)
    setHistory([])
    setPlayer(Object.values(players)[Math.floor(Math.random(0, 1) * 2)])
  }

  const initGame = (event) => {
    event.preventDefault()
    resetGame()
  }

  return (
    <>
      <PlayerForm
        started={started}
        initGame={initGame}
        players={players}
        addPlayer={addPlayer}
      />
      {started && (
        <section>
          <p>Current player {player}</p>
          <Board
            board={board}
            handleClick={handleClick}
            winningSquares={winningSquares}
          />
        </section>
      )}
      <Winner
        winner={winner}
        winningSquares={winningSquares}
        resetGame={resetGame}
      />
      <BoardHistory history={history} />
    </>
  )
}

export default App
