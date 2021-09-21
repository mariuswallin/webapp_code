import { useState } from 'react'
import Input from './Input'

const Form = ({ inputs, onSubmit }) => {
  const [form, setForm] = useState({})

  const handleChange = (event) => {
    console.log('change')
    const { name } = event.currentTarget
    const { value } = event.currentTarget
    console.log(name)
    console.log(value)
    // Brukes til å "beholde" gammel state og oppdatere den inputen vi skriver i
    // [name] ref til name="name" eller name="age" på inputfeltene
    // value er selve verdien
    // ex {name: 'Et navn', age: 3215}
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      {JSON.stringify(form)}
      <form onSubmit={onSubmit}>
        {/* Lager form elementer basert på prop inputs som kommer fra App.js */}
        {inputs?.length > 0
          ? inputs.map((input) => (
              <Input
                key={input.id}
                name={input.name}
                id={input.id}
                type={input.type}
                label={input.label}
                onChange={handleChange}
                // brukes for å sette verdier. Da vi har objekt må vi ref til 'key' på objektet
                // key blir age eller name da det er det vi har kalt name='name' eller name='age' på inputen
                value={form[input.name] ?? input.value}
              />
            ))
          : null}
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default Form
