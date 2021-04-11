import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import useResults from "../hooks/useResults";
import getSpecies from "../hooks/getSpecies";
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
  const [
    species,
    setSpeciesResults,
    speciesResults,
    speciesErrorMessage,
  ] = getSpecies();

  const [pokemonId, setPokemonId] = useState(0);

  useEffect(() => {
    searchQuery(name);
    setPokemonId(parseInt(extractId(url)));
    species(name);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{capitalizeName(name)}</Text>
        <PokemonImage name={name} width="l" id={pokemonId} />
      </View>
      {queryResults ? (
        <View key={queryResults.id} style={styles.statsContainer}>
          <View>
            <Text style={styles.sectionTitle}>ID: {queryResults.id}</Text>
            <Text style={styles.sectionTitle}>
              Base experience: {queryResults.base_experience}
            </Text>
            {queryResults.types ? (
              <View style={styles.typesStyles}>
                <Text style={{ fontWeight: "bold" }}>Types: </Text>
                <FlatList
                  scrollEnabled={false}
                  horizontal={true}
                  data={queryResults.types}
                  keyExtractor={(result) => result.type.name}
                  renderItem={({ item }) => {
                    return (
                      <Text key={item.url} style={{ marginHorizontal: 5 }}>
                        {item.type.name}
                      </Text>
                    );
                  }}
                />
              </View>
            ) : null}
          </View>
          <View>
            <Text>
              {queryResults.types ? (
                <Text style={styles.sectionTitle}>Stats</Text>
              ) : null}
            </Text>
            <FlatList
              style={styles.list}
              data={queryResults.stats}
              keyExtractor={(result) => result.stat.name}
              renderItem={({ item }) => {
                return (
                  <>
                    <Text key={item.stat.name} style={styles.list}>
                      {item.stat.name}: {item.base_stat}
                    </Text>
                    {/* <Text key={item.base_stat} style={styles.list}>
                      {item.base_stat}
                    </Text> */}
                  </>
                );
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "flex-start",
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
    borderTopLeftRadius: 200,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 32,
  },
  statsContainer: {
    padding: 32,
    // padding: 64,
    // borderStyle: "solid",
    // borderWidth: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    // marginHorizontal: 10,
    marginVertical: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  typesStyles: {
    display: "flex",
    flexDirection: "row",
  },
});

export default StatsScreen;
