import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colours from "../utils/colours";

const SearchBar = ({ query, onQueryChange, onQuerySubmit }) => {
  return (
    <View style={styles.containerStyles}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search by name or National Pokedex number"
        placeholderTextColor="#818182"
        style={styles.inputStyles}
        value={query}
        onChangeText={onQueryChange}
        onEndEditing={onQuerySubmit}
        clearButtonMode="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    backgroundColor: colours.default.navigator,
  },
  inputStyles: {
    backgroundColor: "#ebecf0",
    padding: 10,
    height: 50,
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 16,
    fontSize: 13,
  },
});

export default SearchBar;
