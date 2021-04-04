import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import getFullList from "../hooks/getFullList";
import PokemonImage from "../components/PokemonImage";

const Grid = () => {
  const [results, showInitialList, errorMessage] = getFullList();

  const listOfAllPokemon = results.results;

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={listOfAllPokemon}
        keyExtractor={(result) => result.name}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <View style={styles.pokemonContainer}>
              <Text>{capitalizeName(item.name)}</Text>
              <PokemonImage name={item.name} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonContainer: {
    flexGrow: 1,
    flexBasis: 100,
    padding: 5,
  },
});

export default Grid;
