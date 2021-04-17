import { useState } from "react";
import { extractId } from "../utils/helpers";

export default () => {
  const [typesResults, setTypesResults] = useState({});
  const [typesErrorMessage, setTypesErrorMessage] = useState("");

  const typesQuery = async (name) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.types;
      })
      .then((data) => {
        const ids = data.map((type) => {
          return type.type.url;
        });

        return ids;
      })
      .then((types) => {
        let results = types.map((type) =>
          fetch(type).then((response) => response.json())
        );

        return Promise.all(results).then((data) => {
          return data.map((datum) => {
            return datum.damage_relations;
          });
        });
      })
      .then((response) => {
        setTypesResults(response);
      })
      .then((typesResults) => {
        return typesResults;
      });
  };

  return [typesQuery, typesResults, setTypesResults];
};
