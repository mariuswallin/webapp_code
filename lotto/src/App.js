import { useState } from 'react'
import Lotto from './components/Lotto'

const steps = [{ name: 'Create board' }, { name: 'Add letters' }]

export default function App() {
  const [step, setStep] = useState(0)

  const next = () => {
    setStep((s) => s + 1)
  }

  const back = () => {
    setStep((s) => s - 1)
  }

  return (
    <div className="App">
      <Lotto step={step} />
      {step > 0 ? (
        <button className="stepBtn" type="button" onClick={back}>
          Back
        </button>
      ) : null}
      {step === 0 ? (
        <button className="stepBtn" type="button" onClick={next}>
          {steps[step]?.name}
        </button>
      ) : null}
    </div>
  )
}
