import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { capitalize, extractId } from "../utils/helpers";
import getFullList from "../hooks/getFullList";
import PokemonImage from "../components/PokemonImage";
import NavigationButton from "../components/NavigationButton";

const Grid = () => {
  const [results, showInitialList, errorMessage] = getFullList();

  const listOfAllPokemon = results.results;

  return (
    <View style={styles.wrapper}>
      <View>
        <FlatList
          data={listOfAllPokemon}
          keyExtractor={(result) => result.name}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <View style={styles.pokemonContainer}>
                <NavigationButton
                  screen="Stats"
                  dataObj={{
                    name: item.name,
                    url: item.url, // https://pokeapi.co/api/v2/pokemon/
                  }}
                >
                  <PokemonImage name={item.name} id={extractId(item.url)} />
                  <Text style={styles.pokemonName}>
                    {capitalize(item.name)}
                  </Text>
                </NavigationButton>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  pokemonContainer: {
    flexGrow: 1,
    padding: 10,
    alignItems: "center",
  },
  pokemonName: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Grid;
