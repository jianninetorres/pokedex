import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = ({ query, onQueryChange, onQuerySubmit }) => {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        style={styles.backgroundStyle}
        value={query}
        onChangeText={onQueryChange}
        onEndEditing={onQuerySubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#e1e1e1",
    padding: 15,
    height: 50,
    borderRadius: 6,
    marginHorizontal: 16,
    fontSize: 18,
  },
});

export default SearchBar;
