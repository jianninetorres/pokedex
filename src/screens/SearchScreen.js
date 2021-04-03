import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import useResults from "../hooks/useResults";

import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, searchQuery, errorMessage] = useResults();

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
