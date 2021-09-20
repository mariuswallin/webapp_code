import React from 'react'

const Modal = ({ addTodo, setFormData, formData, setModal }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    addTodo()
  }

  const updateValue = (event) => {
    const inputValue = { [event.target.name]: event.target.value }
    setFormData((prev) => ({
      ...prev,
      ...inputValue,
    }))
  }

  return (
    <section id="modal">
      <section className="modal_inner_wrapper">
        <header>
          <h3>New todo</h3>
          <button type="button" onClick={() => setModal(false)}>
            X
          </button>
        </header>
        <form id="todo_form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={formData.title}
            name="title"
            onChange={updateValue}
          />
          <label htmlFor="description">Description</label>
          <input
            value={formData.description}
            name="description"
            onChange={updateValue}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </section>
  )
}

export default Modal
