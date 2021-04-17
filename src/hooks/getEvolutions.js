import { useState } from "react";

export default () => {
  const [evolutionsResults, setEvolutionsResults] = useState({});
  const [evolutionsErrorMessage, setEvolutionsErrorMessage] = useState("");

  const evolutions = async (name) => {
    try {
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .then((data) => {
          return data.evolution_chain;
        })
        .then((data) => {
          let results = fetch(data.url).then((response) => response.json());
          return Promise.resolve(results).then((data) => {
            return data;
          });
        })
        .then((response) => {
          setEvolutionsResults(response);
        })
        .then((evolutionsResults) => {
          return evolutionsResults;
        });
    } catch (err) {
      setEvolutionsErrorMessage(err);
    }
  };

  return [
    evolutions,
    setEvolutionsResults,
    evolutionsResults,
    evolutionsErrorMessage,
  ];
};
