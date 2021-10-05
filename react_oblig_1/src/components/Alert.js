const Alert = ({ setInputFromChild, inputFromChild, handleClick }) => {
  const handleChange = (event) => {
    console.log('CHANGED')
    setInputFromChild(event.currentTarget.value)
  }

  return (
    <>
      <input type="text" onChange={handleChange} value={inputFromChild} />
      <button type="button" onClick={handleClick}>
        Knapp
      </button>
    </>
  )
}

export default Alert
