import { useState, useEffect } from "react";
import pokeapi from "../api/pokeapi";

export default () => {
  const [results, setResults] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const showInitialList = async () => {
    try {
      const response = await pokeapi.get(`/pokemon`);
      setResults(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchQuery = async (name) => {
    try {
      const response = await pokeapi.get(`/pokemon/${name}`);
      setResults(response.data);
      console.log(response.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showInitialList();
  }, []);

  return [results, searchQuery, errorMessage];
};
