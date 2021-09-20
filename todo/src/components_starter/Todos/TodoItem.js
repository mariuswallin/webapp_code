import React from 'react'

// TODO: Add todo prop to show todo content from parent (TodoList)
// TODO: Add completedTodo prop handler to update state on parent
// TODO: Add removeTodo prop handler to update state on parent
// TODO: Add clickhandler on id="complete"
// TODO: Add clickhandler on id="remove"

const TodoItem = () => (
  <article className="card">
    <header>
      <h2>Title</h2>
      <p>CreatedDate</p>
    </header>
    <section>
      <button type="button" id="complete">
        Complete
      </button>
      <button type="button" id="remove">
        Remove
      </button>
    </section>
  </article>
)

export default TodoItem
