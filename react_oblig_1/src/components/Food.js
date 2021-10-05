const Food = ({ food }) => (
  <ul>
    {food?.map((foodItem) => (
      <li key={foodItem}>{foodItem}</li>
    ))}
  </ul>
)

export default Food
