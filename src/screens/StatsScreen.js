import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import useResults from "../hooks/useResults";
import PokemonImage from "../components/PokemonImage";

const StatsScreen = ({ navigation }) => {
  const name = navigation.getParam("name");
  const [queryResults, searchQuery, queryErrorMessage] = useResults();

  useEffect(() => {
    searchQuery(name);
  }, []);

  return (
    <View>
      <Text>Stats screen for {name}</Text>
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
                return <Text>{item.type.name}</Text>;
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default StatsScreen;
