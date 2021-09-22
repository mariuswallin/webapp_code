import Form from './components/Form'
import FormSingle from './components/FormSingle'

// Brukes i Form til å skrive lage formelementer basert på en liste med data
const formInputs = [
  {
    label: 'Name',
    type: 'text',
    name: 'name',
    id: 'name',
    onChange: () => {},
    value: '',
  },
  {
    label: 'Age',
    type: 'number',
    name: 'age',
    id: 'age',
    onChange: () => {},
    value: '',
  },
]

const App = () => {
  // Funksjon brukt når vi trykker på button i Form
  const onSubmit = (event) => {
    event.preventDefault()
    console.log('Submitted')
  }

  return (
    <div className="App">
      {/* Håndterer state med objekt */}
      {/* Sender to props inputs og onSubmit */}
      <Form inputs={formInputs} onSubmit={onSubmit} />
      {/* Håndterer state for en og en verdi */}
      {/* Sender en prop onSubmit */}
      <FormSingle onSubmit={onSubmit} />
    </div>
  )
}

export default App
