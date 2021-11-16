import React, { useState } from "react";
import { Button, View, TextInput, StyleSheet } from "react-native";
import colours from "../utils/colours";

const SearchBar = ({ query, onQueryChange, onQuerySubmit }) => {
  const [isSearchButtonVisible, setisSearchButtonVisible] = useState(false);

  return (
    <View style={styles.containerStyles}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
        placeholder="Search by name or National Pokedex number"
        placeholderTextColor="#818182"
        style={styles.inputStyles}
        value={query}
        onChangeText={onQueryChange}
        onEndEditing={onQuerySubmit}
        onFocus={() => setisSearchButtonVisible(true)}
        clearButtonMode="always"
      />
      {isSearchButtonVisible ? (
        <View style={styles.buttonsContainer}>
          <Button title="Search" onPress={onQuerySubmit} />
          <Button
            title="Cancel"
            onPress={() => setisSearchButtonVisible(false)}
          />
        </View>
      ) : null}
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
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default SearchBar;
