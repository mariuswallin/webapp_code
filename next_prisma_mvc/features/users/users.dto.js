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

export const putUserDto = ({ id, name }) => {
  return {
    id,
    name,
  }
}

export const deleteUserDto = ({ id }) => {
  return {
    id,
  }
}
