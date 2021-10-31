// TODO: Ikke brukt i applikasjonen. Kun demo
export const createUserDto = ({ name, username, birthYear, password }) => {
  return {
    name,
    username,
    birthYear,
    password,
    role: 'USER',
  }
}

export const userCreatedDto = ({ id, name, username, birthYear }) => {
  return {
    id,
    name,
    username,
    age: new Date().getFullYear() - birthYear,
  }
}
