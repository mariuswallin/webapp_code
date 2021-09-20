import React, { useState } from 'react'
import Button from './TodoButton'

// TODO: Create CompletedList and CompletedItem components (they look like TodoList and TodoItem)
// TODO: Import Modal, TodoList, CompletedList, Title

const TodosContainer = () => {
  // TODO: Set default state for show/hide "modal"
  // TODO: Set default state for formData => {key: value, key:value}
  // TODO: Set default state for todos
  // TODO: Set default state for completed todos

  const addTodo = () => {
    // TODO: Add todo to todoslist (update state)
    // TODO: Close modal (update state)
  }

  const removeTodo = (id) => {
    // TODO: Filter out todo with id
    // TODO: Update todos with new list (update state)
  }

  const completeTodo = (id) => {
    // TODO: Find todoItem
    // TODO: RemoveTodoItem from todos (update state)
    // TODO: Update completedlist with todoItem (update state)
  }

  // TODO: Use <Modal /> with necessary props to handle addTodo, formdata and modal visbility
  // TODO: Finish clickhandler on Button to be able to toggle Modal
  // TODO: Conditional render todos (<p>Ingen todos</p>) when empty and <Title /> with <TodoList /> if not empty
  // TODO: Add necessary props to Title to render "Mine todos"
  // TODO: Add necessary props to TodoList to be able to handle removeTodo, completeTodo and render todos (props drilling)
  // TODO: Add necessary props to CompletedList to be able to render completed
  // TODO: Update console.log with correct function

  return (
    <div className="todosWrapper">
      <p>Modal goes here</p>
      <Button
        name="New todo"
        clickHandler={() => console.log('Handle modal')}
      />
      <p>Ingen todos || Title and TodoList</p>
      <p>Ingen completed || CompletedList</p>
    </div>
  )
}

export default TodosContainer
