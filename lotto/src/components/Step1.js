import { useState } from 'react'

const Step1 = ({ grid, step, handleGridCreation }) => {
  const [columns, setColumns] = useState(grid.columns)
  const [rows, setRows] = useState(grid.rows)

  const handleSubmit = () => {
    handleGridCreation({ columns, rows })
  }

  return (
    <section className="step1">
      <h2>Step {step + 1}</h2>
      <form>
        <label htmlFor="columns">Add columns</label>
        <input
          id="columns"
          name="columns"
          type="text"
          value={columns}
          onChange={(event) => setColumns(event.target.value)}
          onBlur={handleSubmit}
        />
        <label htmlFor="rows">Add rows</label>
        <input
          id="rows"
          name="rows"
          type="text"
          value={rows}
          onChange={(event) => setRows(event.target.value)}
          onBlur={handleSubmit}
        />
      </form>
    </section>
  )
}

export default Step1
