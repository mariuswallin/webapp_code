import { useState } from 'react'
// Importerer Input for å kunne bruke komponenten her
import Input from './Input'

/**
 *
 * @param {array} inputs - Array med objekter som har info vi trenger til å lage Input komponenter
 * @param {function} onSubmit - Funksjon som trigges i App.js når vi trykker på submit
 * @returns Form
 */
const Form = ({ inputs, onSubmit }) => {
  const [form, setForm] = useState({ age: '', name: '' })

  const handleChange = (event) => {
    console.log('change')
    const { name } = event.currentTarget
    const { value } = event.currentTarget
    console.log(name)
    console.log(value)

    // [name] ref til name="name" eller name="age" på inputfeltet
    // value er selve verdien
    // ex {name: 'Et navn', age: 3215}
    // (prev) => ({...}) brukes til å "beholde" gammel state og oppdatere verdien til inputen vi skriver i (den inputen som har name='name' som matcher nøkkelen i form staten)
    setForm((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        {/* Brukes bare til debugging, se hva som er i form state */}
        {JSON.stringify(form)}
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
