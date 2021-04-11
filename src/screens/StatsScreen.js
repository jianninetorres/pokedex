import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import useResults from "../hooks/useResults";
import getSpecies from "../hooks/getSpecies";
import PokemonImage from "../components/PokemonImage";
import { capitalize, removeDashes } from "../utils/helpers";
import types from "../utils/types";
import colours from "../utils/colours";

const StatsScreen = ({ navigation }) => {
  const name = navigation.getParam("name");
  // const url = navigation.getParam("url");
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

  useEffect(() => {
    searchQuery(name);
    // setPokemonId(parseInt(extractId(url)));
    species(name);
  }, []);

  return (
    <>
      {/* {queryResults ? ( */}
      <View style={styles.wrapper}>
        <View
          style={[
            styles.header,
            queryResults.types
              ? { backgroundColor: types[queryResults.types[0].type.name] }
              : { backgroundColor: colours.default.bodyBg },
          ]}
        >
          <Text style={styles.title}>{capitalize(name)}</Text>
          {queryResults.id ? (
            <PokemonImage name={name} width="l" id={queryResults.id} />
          ) : null}
        </View>
        <View key={queryResults.id} style={styles.statsContainer}>
          <View>
            {queryResults.id ? (
              <Text style={styles.sectionTitle}>ID: {queryResults.id}</Text>
            ) : null}
            {queryResults.base_experience ? (
              <Text style={styles.sectionTitle}>
                Base experience: {queryResults.base_experience}
              </Text>
            ) : null}
            {queryResults.types ? (
              <View style={styles.typesStyles}>
                <Text style={styles.typesStylesTitle}>Types: </Text>
                <FlatList
                  scrollEnabled={false}
                  horizontal={true}
                  data={queryResults.types}
                  keyExtractor={(result) => result.type.name}
                  renderItem={({ item }) => {
                    return (
                      <Text key={item.url} style={styles.typesStylesList}>
                        {capitalize(item.type.name)}
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
              scrollEnabled={false}
              renderItem={({ item }) => {
                return (
                  <>
                    <Text key={item.stat.name} style={styles.list}>
                      {removeDashes(capitalize(item.stat.name))}:{" "}
                      {item.base_stat}
                    </Text>
                  </>
                );
              }}
            />
          </View>
        </View>
      </View>
      {/* ) : null} */}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colours.default.bodyBg,
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
    // backgroundColor: types[`${queryResults.types[0].type.name}`],
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
    color: colours.default.bodyBg,
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
    fontSize: 15,
    marginVertical: 5,
    color: colours.default.font,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 16,
    color: colours.default.font,
  },
  typesStyles: {
    display: "flex",
    flexDirection: "row",
  },
  typesStylesTitle: {
    fontWeight: "bold",
    color: colours.default.font,
  },
  typesStylesList: {
    marginHorizontal: 5,
    color: colours.default.font,
  },
});

export default StatsScreen;
