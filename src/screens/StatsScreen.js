import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import useResults from "../hooks/useResults";
import PokemonImage from "../components/PokemonImage";

const StatsScreen = ({ navigation }) => {
  const name = navigation.getParam("name");
  const [queryResults, searchQuery, queryErrorMessage] = useResults();

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
        <View>
          <Text>{queryResults.id}</Text>
          <View>
            <Text>Types</Text>
            <FlatList
              data={queryResults.types}
              keyExtractor={(result) => result.name}
              renderItem={({ item }) => {
                return <Text key={item.type.name}>{item.type.name}</Text>;
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default StatsScreen;
