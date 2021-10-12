import ListItem from './ListItem'

const List = ({ list }) => {
  const hasValues = list?.length > 0
  return (
    <section>
      {hasValues ? (
        <ul>
          {list.map((item) => (
            <ListItem key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <p>Ingen verdier i listen</p>
      )}
    </section>
  )
}

export default List
