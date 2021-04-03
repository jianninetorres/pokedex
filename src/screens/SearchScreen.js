import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import pokeapi from "../api/pokeapi";

import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});

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
    searchQuery("pikachu");
  }, []);

  return (
    <View>
      <Text>Search screen</Text>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onQuerySubmit={() => searchQuery(query)}
      />
    </View>
  );
};

export default SearchScreen;
