import { useState } from "react";
import pokeapi from "../api/pokeapi";

export default () => {
  const [speciesResults, setSpeciesResults] = useState({});
  const [speciesErrorMessage, setSpeciesErrorMessage] = useState("");

  const species = async (name) => {
    try {
      const response = await pokeapi.get(`/pokemon-species/${name}`);
      setSpeciesResults(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return [species, setSpeciesResults, speciesResults, speciesErrorMessage];
};
