const ListItem = ({ brand, name, price }) => (
  <li>
    <h3>{name}</h3>
    <p>{brand}</p>
    <p>{price},-</p>
  </li>
)

export default ListItem
