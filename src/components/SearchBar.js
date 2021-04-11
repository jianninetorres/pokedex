import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = ({ query, onQueryChange, onQuerySubmit }) => {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search by name or National Pokedex number"
        placeholderTextColor="#818182"
        style={styles.backgroundStyle}
        value={query}
        onChangeText={onQueryChange}
        onEndEditing={onQuerySubmit}
        clearButtonMode="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
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
