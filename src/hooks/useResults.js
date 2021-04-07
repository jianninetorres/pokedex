import { useState } from "react";
import pokeapi from "../api/pokeapi";

export default () => {
  const [queryResults, setResults] = useState({});
  const [errorMessage, queryErrorMessage] = useState("");

  const searchQuery = async (name) => {
    try {
      const response = await pokeapi.get(`/pokemon/${name}`);
      setResults(response.data);
      console.log("response.data: ", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return [queryResults, setResults, searchQuery, queryErrorMessage];
};
