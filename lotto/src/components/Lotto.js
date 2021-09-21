/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'

const Lotto = ({ step }) => {
  const [grid, setGrid] = useState({ columns: '0', rows: '0' })

  const handleGridCreation = (data) => {
    setGrid({ ...data })
  }

  switch (step) {
    case 0:
      return (
        <Step1
          step={step}
          grid={grid}
          handleGridCreation={handleGridCreation}
        />
      )
    case 1:
      return <Step2 step={step} {...grid} />
    default:
      break
  }
}

export default Lotto
