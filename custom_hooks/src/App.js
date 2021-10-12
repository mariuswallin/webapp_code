import Filter from './components/Filter'
import List from './components/List'
import { useOptions } from './hooks/useOptions'

const initialProducts = [
  { id: 1, brand: 'apple', name: 'IPhone', price: 200 },
  { id: 2, brand: 'microsoft', name: 'Surface Pro', price: 122 },
  { id: 3, brand: 'google', name: 'Google Nest', price: 45 },
  { id: 4, brand: 'amazon', name: 'Alexa', price: 111 },
  { id: 5, brand: 'apple', name: 'MacBook', price: 999 },
  { id: 6, brand: 'apple', name: 'Air Pods', price: 133 },
]

const initialBooks = [
  { id: 1, category: 'fiction', name: 'Running to the woods', price: 200 },
  { id: 2, category: 'science', name: 'Galaxy', price: 122 },
  { id: 3, category: 'fiction', name: 'Under water', price: 45 },
  { id: 4, category: 'fiction', name: 'In the sky', price: 111 },
  { id: 5, category: 'biography', name: 'Obama', price: 999 },
  { id: 6, category: 'other', name: 'Kamasutra', price: 133 },
]

const App = () => {
  const { options } = useOptions(initialProducts, 'brand')

  // TODO: Lage custom hook useFilter for å håndtere filtreringen
  const handleFilter = () => {
    console.log('Filter')
  }
  return (
    <main>
      <Filter options={options} handleFilter={handleFilter} />
      <List list={initialProducts} />
    </main>
  )
}

export default App
