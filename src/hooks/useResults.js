import { useState } from "react";
import pokeapi from "../api/pokeapi";

export default () => {
  const [results, setResults] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const searchQuery = async (name) => {
    try {
      const response = await pokeapi.get(`/pokemon/${name}`);
      setResults(response.data);
      console.log(response.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  return [results, searchQuery, errorMessage];
};
