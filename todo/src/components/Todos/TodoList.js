import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, removeTodo, completeTodo }) => (
  <ul id="todos">
    {todos &&
      todos.length > 0 &&
      todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          completeTodo={completeTodo}
        />
      ))}
  </ul>
)

export default TodoList
