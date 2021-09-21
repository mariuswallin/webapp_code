import React from 'react'

const CompletedItem = ({ todo }) => (
  <>
    <li>
      <span className="title">{todo.title}</span>
      <span>{todo.description}</span>
      <span className="date">{todo.date.toLocaleString('no-NB')}</span>
    </li>
  </>
)

export default CompletedItem
