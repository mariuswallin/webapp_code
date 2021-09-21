import { useState } from 'react';
import Form from './components/Form'
import Result from './components/Result'

const grades = ['a', 'b', 'c']

const extremAccurateGradeCreator = () =>
  grades[Math.floor(Math.random() * grades.length)]

const App = () => {
  const [result, setResult] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    setResult(extremAccurateGradeCreator())
  }

  return (
    <div className="App">
      <Result grade={result} />
      <Form handleSubmit={handleSubmit} />
    </div>
  )
}

export default App
