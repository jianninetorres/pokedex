import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import useResults from "../hooks/useResults";

import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, searchQuery, errorMessage] = useResults();

  const submitQuery = (query) => {
    return query !== "" ? searchQuery(query) : null;
  };

  return (
    <View>
      <Text>Search screen</Text>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onQuerySubmit={() => submitQuery(query)}
      />
    </View>
  );
};

export default SearchScreen;
