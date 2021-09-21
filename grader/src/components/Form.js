import { useState } from "react";

const Form = ({ handleSubmit }) => {
  const [value, setValue] = useState("");

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Skriv studentnavn"
        />
        <button type="submit">Prøv lykken</button>
      </form>
    </>
  );
};

export default Form