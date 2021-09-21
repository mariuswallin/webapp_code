const BoardItem = ({ number, numbers, guess, setGuess }) => (
  <button
    key={number}
    type="button"
    className={`board-item ${guess.includes(number) ? 'checked' : ''} ${
      numbers.map((n) => guess.find((g) => g === n))?.includes(number)
        ? 'winning'
        : ''
    }`}
    onClick={() => setGuess((prev) => [...prev, number])}
    disabled={guess?.length >= 7}
  >
    {number}
  </button>
)

export default BoardItem
