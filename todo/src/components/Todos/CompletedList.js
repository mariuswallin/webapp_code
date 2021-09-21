import React from 'react'
import CompletedItem from './CompletedItem'

const CompletedList = ({ todos }) => (
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
      {todos &&
        todos.length > 0 &&
        todos.map((todo, idx) => <CompletedItem key={idx} todo={todo} />)}
    </ul>
  </section>
)

export default CompletedList
