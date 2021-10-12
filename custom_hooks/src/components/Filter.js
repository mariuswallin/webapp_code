const Filter = ({ options, handleFilter }) => (
  <select onChange={handleFilter}>
    <option value="">Alle</option>
    {options?.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

export default Filter
