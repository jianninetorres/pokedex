import React, { useState } from "react";
import { View, Text } from "react-native";

import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  return (
    <View>
      <Text>Search screen</Text>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onQuerySubmit={() => console.log(query)}
      />
    </View>
  );
};

export default SearchScreen;
