/**
 *
 * @param {string} label - Label teksten
 * @param {string} type - Input type
 * @param {string} name - Input name
 * @param {string} id - Input id og label htmlFor for å koble de sammen
 * @param {function} onChange - Funksjon som trigges i App.js når vi skriver i inputen
 * @param {string} value - Verdien vi får tilbake fra App.js når vi skriver i inputen

 * @returns Input
 */
const Input = ({ label, type, name, id, onChange, value }) => (
  <div className="input-wrapper">
    {/* Bruker {} til å si at her kommer dynamiske verdier */}
    <label htmlFor={id}>
      {label}
      <input
        type={type}
        name={name}
        id={id}
        // onChange event => trigger onChange funksjonen fra App.js når vi skriver i inputen
        onChange={onChange}
        placeholder={label}
        value={value}
      />
    </label>
  </div>
)

export default Input
