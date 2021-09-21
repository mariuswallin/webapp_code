import { useState } from 'react'
import Input from './Input'

const FormSingle = ({ onSubmit }) => {
  // Lagrer endringene i input name="name" via useState
  const [name, setName] = useState('')
  // Lagrer endringene i input name="age" via useState
  const [age, setAge] = useState('')

  // Funksjonen som trigges når vi skriver i input name="name" inne i Input komponenten
  const handleNameChange = (event) => {
    console.log('Name', event.currentTarget.value)
    // Henter ut verdien i inputfeltet
    setName(event.currentTarget.value)
  }

  // Funksjonen som trigges når vi skriver i input name="age" inne i Input komponenten
  const handleAgeChange = (event) => {
    console.log('Age', event.currentTarget.value)
    // Henter ut verdien i inputfeltet
    setAge(event.currentTarget.value)
  }

  return (
    <>
      Name: {JSON.stringify(name)}
      Age: {JSON.stringify(age)}
      {/* onSubmit trigges når vi trykker på 'send' knappen */}
      <form onSubmit={onSubmit}>
        <Input
          name="name"
          id="name"
          type="text"
          label="Name"
          // onChange er prop som sendes til Input komponente. handleNameChange er funksjonen som trigges når vi skriver i inputen
          onChange={handleNameChange}
          value={name}
        />
        <Input
          name="age"
          id="age"
          type="text"
          label="Age"
          // onChange er prop som sendes til Input komponente. handleAgeChange er funksjonen som trigges når vi skriver i inputen
          onChange={handleAgeChange}
          value={age}
        />

        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default FormSingle
