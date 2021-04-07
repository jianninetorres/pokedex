import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import useResults from "../hooks/useResults";
import PokemonImage from "../components/PokemonImage";

const StatsScreen = ({ navigation }) => {
  const name = navigation.getParam("name");
  const [
    queryResults,
    setResults,
    searchQuery,
    queryErrorMessage,
  ] = useResults();

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  useEffect(() => {
    searchQuery(name);
  }, []);

  return (
    <View>
      <Text>Stats screen for {capitalizeName(name)}</Text>
      <PokemonImage name={name} />
      {queryResults ? (
        <View key={queryResults.id}>
          <Text>{queryResults.id}</Text>
          <View>
            <Text>Types</Text>
            <FlatList
              data={queryResults.types}
              keyExtractor={(result) => result.id}
              renderItem={({ item }) => {
                return <Text key={item.id}>{item.type.name}</Text>;
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default StatsScreen;
