import { useState } from 'react'
import Alert from './components/Alert'

import Food from './components/Food'
import MyComponent from './components/MyComponent'
import Wrapper from './components/Wrapper'

const food = ['Pizza', 'Hamburger', 'Coke']

const App = () => {
  const [inputFromChild, setInputFromChild] = useState('')
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    console.log('CLICKED')
    console.log(inputFromChild)
    setIsClicked(true)
  }

  return (
    <main>
      <Wrapper>
        <MyComponent title="It works" />
        <Food food={food} />
        <Alert
          setInputFromChild={setInputFromChild}
          inputFromChild={inputFromChild}
          handleClick={handleClick}
        />
        {isClicked ? <p>{inputFromChild}</p> : null}
      </Wrapper>
    </main>
  )
}

export default App
