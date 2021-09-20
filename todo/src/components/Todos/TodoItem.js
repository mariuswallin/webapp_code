import React from 'react'

const TodoItem = ({ todo, completeTodo, removeTodo }) => (
  <article className="card">
    <header>
      <h2>{todo.title}</h2>
      <p>{todo.created.toLocaleString('no-NB')}</p>
    </header>
    <section>
      <button type="button" id="complete" onClick={() => completeTodo(todo.id)}>
        Complete
      </button>
      <button type="button" id="remove" onClick={() => removeTodo(todo.id)}>
        Remove
      </button>
    </section>
  </article>
)

export default TodoItem
