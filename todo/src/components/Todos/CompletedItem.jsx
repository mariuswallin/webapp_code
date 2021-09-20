import React from 'react'

const CompletedItem = ({ completed }) => (
  <>
    <li>
      <span className="title">{completed.title}</span>
      <span>{completed.description}</span>
      <span className="date">{completed.date.toLocaleString('no-NB')}</span>
    </li>
  </>
)

export default CompletedItem
