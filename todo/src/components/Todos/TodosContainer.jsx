import React, { useState } from 'react'
import TodoList from './TodoList.jsx'
import Title from '../Title.jsx'
import Modal from '../Modal.jsx'
import Button from './TodoButton.jsx'
import CompletedList from './CompletedList.jsx'

const TodosContainer = () => {
  const [modal, setModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [todos, setTodos] = useState([])
  const [completed, setCompleted] = useState([])

  const addTodo = () => {
    setTodos((prev) => [
      { id: todos.length, created: new Date(), ...formData },
      ...prev,
    ])
    setModal(false)
  }

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const completeTodo = (id) => {
    const todoItem = todos.find((todo) => todo.id === id)
    removeTodo(id)
    setCompleted((prev) => [{ date: new Date(), ...todoItem }, ...prev])
  }

  return (
    <div className="todosWrapper">
      {/* <pre>{JSON.stringify(todos)}</pre> */}
      {modal && (
        <Modal
          addTodo={addTodo}
          setFormData={setFormData}
          formData={formData}
          setModal={setModal}
        />
      )}
      <Button name="New todo" clickHandler={() => setModal(!modal)} />
      {todos && todos.length < 1 ? (
        <p>Ingen todos</p>
      ) : (
        <>
          <Title title="Mine todos" />
          <TodoList
            removeTodo={removeTodo}
            completeTodo={completeTodo}
            todos={todos}
          />
        </>
      )}
      {completed && completed.length < 1 ? (
        <p>Ingen completed todos</p>
      ) : (
        <CompletedList completedTodos={completed} />
      )}
    </div>
  )
}

export default TodosContainer
