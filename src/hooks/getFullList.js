import { useState, useEffect } from "react";
import pokeapi from "../api/pokeapi";

export default () => {
  const [results, setResults] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const showInitialList = async () => {
    try {
      const response = await pokeapi.get(`/pokemon`, {
        params: {
          limit: 150,
        },
      });
      setResults(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showInitialList();
  }, []);

  return [results, showInitialList, errorMessage];
};
