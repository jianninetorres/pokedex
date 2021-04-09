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
        <View key={queryResults.id} style={styles.statsContainer}>
          <Text>{queryResults.id}</Text>
          {queryResults.types ? <Text>Types</Text> : null}
          <FlatList
            data={queryResults.types}
            keyExtractor={(result) => result.id}
            renderItem={({ item }) => {
              return <Text key={item.id}>{item.type.name}</Text>;
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 48,
    // borderStyle: "solid",
    // borderTopColor: "transparent",
    // borderBottomColor: "lightgrey",
    // borderLeftColor: "lightgrey",
    // borderRightColor: "lightgrey",
    backgroundColor: "lightblue",
    // borderWidth: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 32,
  },
  statsContainer: {
    marginTop: 32,
    // padding: 64,
  },
});

export default StatsScreen;
