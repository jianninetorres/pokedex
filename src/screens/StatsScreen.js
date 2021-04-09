import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import useResults from "../hooks/useResults";
import PokemonImage from "../components/PokemonImage";
import { capitalizeName, extractId } from "../utils/helpers";

const StatsScreen = ({ navigation }) => {
  const name = navigation.getParam("name");
  const url = navigation.getParam("url");
  const [
    queryResults,
    setResults,
    searchQuery,
    queryErrorMessage,
  ] = useResults();

  useEffect(() => {
    searchQuery(name);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{capitalizeName(name)}</Text>
        <PokemonImage name={name} width="l" id={extractId(url)} />
      </View>
      {queryResults ? (
        <View key={queryResults.id} style={styles.statsContainer}>
          <Text>{queryResults.id}</Text>
          {queryResults.types ? <Text>Types</Text> : null}
          <FlatList
            data={queryResults.types}
            keyExtractor={(result) => result.name}
            renderItem={({ item }) => {
              return <Text key={item.url}>{item.type.name}</Text>;
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
