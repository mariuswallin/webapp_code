import React from 'react'
import CompletedItem from './CompletedItem'

const CompletedList = ({ completedTodos }) => (
  <section className="completed-wrapper">
    <section>
      <h2>Completed todos</h2>
    </section>
    <header>
      <p>Title</p>
      <p>Description</p>
      <p>Completed</p>
    </header>
    <ul id="completed">
      {completedTodos &&
        completedTodos.length > 0 &&
        completedTodos.map((completed, idx) => (
          <CompletedItem key={idx} completed={completed} />
        ))}
    </ul>
  </section>
)

export default CompletedList
