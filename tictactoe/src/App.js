import { useState } from 'react'
import Board from './components/Board'
import BoardHistory from './components/BoardHistory'
import PlayerForm from './components/PlayerForm'
import Winner from './components/Winner'

// Inneholder liste over kombinasjonene som gjør at man vinner
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

// Funksjon brukt til å sjekke om brukeren vinner
// Tar i mot board som er selve oversikten over hvilke ruter som er klikket på
const calculateWinner = (board) => {
  for (const combination of winningCombinations) {
    // Deconstructer ut verdiene fra en gitt kombinasjon og gir de variabelnavnet first, second og third
    // ex. [0, 1, 2] som er første kombinasjon gir oss
    // const first = 0;
    // const second = 1;
    // const third = 2;
    const [first, second, third] = combination

    // Sjekker om board verdiene har samme navn i den kombinasjonen som gir seier
    if (
      board[first] &&
      board[first] === board[second] &&
      board[first] === board[third]
    ) {
      // Hvis kombinasjonen matcher returneres et objekt med winner: 'navnet', winningSquares: 'liste med verdiene som gir seier
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
  // Ulike states vi trenger i applikasjon
  // [value, setValue] = useState()
  // value er selve verdien vi lagrer
  // setValue brukes til å oppdatere value setValue(myValue)
  // useState(null) gjør det mulig å håndtere state i React. null er i dette tilfellet startverdien vår.
  const [player, setPlayer] = useState(null)
  const [players, setPlayers] = useState({ playerOne: '', playerTwo: '' })
  const [board, setBoard] = useState(initialBoard)

  // Trigger calculateWinner(board) hver gang App blir 'laget på nytt' som følge av at staten har endret seg
  const { winner, winningSquares } = calculateWinner(board)
  const [started, setStarted] = useState(false)
  const [history, setHistory] = useState([])

  // Oppdaterer hvem som er neste spiller. Hvis nåværende er playerOne sett neste spiller til å være playerTwo
  const nextPlayer =
    player === players.playerOne ? players.playerTwo : players.playerOne

  const addPlayer = (event) => {
    const inputName = event.target.name
    const inputValue = event.target.value
    setPlayers((prev) => ({ ...prev, [inputName]: inputValue }))
  }

  // Tar i mot index slik at vi vet hvilken rute som ble klikket på
  const handleClick = (index) => {
    // Sjekker om ruten er klikket på fra før eller om vi har en vinner
    // Hvis tilfelle så avsluttes funksjonen
    if (board[index] || winner) {
      return
    }
    // Lager en kopi av board med ...spread
    const boardStatus = [...board]
    // Legger brukerinformasjon til 'ruten' (indexen) som ble klikket på
    boardStatus[index] = player
    // Oppdaterer statuen til board via setBoard (oppdaterer staten)
    setBoard(boardStatus)
    // Oppdaterer historien. Tar gammel state med ...prev og legger til player og indexen som spiller klikket på. Vi lager en 'ny' oppdatert array med info om hvem og hva som ble trykket på
    setHistory((prev) => [...prev, { player, value: index }])
    // Oppdaterer hvem som er neste spiller
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
