import Board from './Board'

const Step2 = ({ step, rows, columns }) => (
  <>
    <h2>Step {step + 1}</h2>
    <Board rows={rows} columns={columns} />
  </>
)

export default Step2
