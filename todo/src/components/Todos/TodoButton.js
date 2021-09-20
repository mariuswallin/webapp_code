import React from 'react'

const Button = ({ name, clickHandler }) => (
  <button id="new" type="button" onClick={clickHandler}>
    {name}
  </button>
)

export default Button
