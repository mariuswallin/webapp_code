import React, { useState } from 'react'
import TodoList from './TodoList.js'
import Title from '../Title.js'
import Modal from '../Modal.js'
import Button from './TodoButton.js'
import CompletedList from './CompletedList.js'

const TodosContainer = () => {
  const [modal, setModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])

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
    setCompletedTodos((prev) => [{ date: new Date(), ...todoItem }, ...prev])
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
      {completedTodos && completedTodos.length < 1 ? (
        <p>Ingen completed todos</p>
      ) : (
        <CompletedList todos={completedTodos} />
      )}
    </div>
  )
}

export default TodosContainer
