import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import useResults from "../hooks/useResults";
import getSpecies from "../hooks/getSpecies";
import getTypes from "../hooks/getTypes";
import PokemonImage from "../components/PokemonImage";
import { capitalize, removeDashes } from "../utils/helpers";
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
  const [typesQuery, typesResults, setTypesResults] = getTypes();

  useEffect(() => {
    searchQuery(name);
    // setPokemonId(parseInt(extractId(url)));
    species(name);
    typesQuery(name);
  }, []);

  return (
    <>
      {/* {queryResults ? ( */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.wrapper}>
          {/* header */}
          <View
            style={[
              styles.header,
              queryResults.types
                ? {
                    backgroundColor:
                      colours.pokemonTypes[queryResults.types[0].type.name]
                        .bgColour,
                  }
                : { backgroundColor: colours.default.bodyBg },
            ]}
          >
            <Text
              style={
                queryResults.types
                  ? {
                      color:
                        colours.pokemonTypes[queryResults.types[0].type.name]
                          .textColour,
                    }
                  : { color: colours.default.bodyBg }
              }
            >
              # {queryResults.id}
            </Text>
            <Text
              style={[
                styles.title,
                queryResults.types
                  ? {
                      color:
                        colours.pokemonTypes[queryResults.types[0].type.name]
                          .textColour,
                    }
                  : { color: colours.default.bodyBg },
              ]}
            >
              {capitalize(name)}
            </Text>
            {queryResults.id ? (
              <>
                <PokemonImage name={name} width="l" id={queryResults.id} />
              </>
            ) : null}
          </View>
          {/* Types and base experience */}
          <View
            key={queryResults.id}
            style={[styles.statsContainer, styles.statsContainerRow]}
          >
            <View>
              {queryResults.types ? (
                <View style={styles.typesStyles}>
                  <FlatList
                    scrollEnabled={false}
                    data={queryResults.types}
                    keyExtractor={(result) => result.type.name}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.typeContainer}>
                          <Text key={item.url} style={styles.typesStylesList}>
                            <View
                              style={[
                                styles.typeColor,
                                {
                                  backgroundColor:
                                    colours.pokemonTypes[item.type.name]
                                      .bgColour,
                                },
                              ]}
                            ></View>{" "}
                            {capitalize(item.type.name)}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              ) : null}
            </View>
            <View>
              {queryResults.base_experience ? (
                <>
                  <Text style={styles.sectionTitle}>Base experience</Text>
                  <View style={styles.listContainer}>
                    <Text style={styles.list}>
                      {queryResults.base_experience}
                    </Text>
                  </View>
                </>
              ) : null}
            </View>
          </View>
          {/* Stats */}
          <View style={[styles.statsContainer, styles.statsContainerColumn]}>
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
                  <View style={styles.listContainer}>
                    <Text key={item.stat.name} style={styles.list}>
                      {removeDashes(capitalize(item.stat.name))}:{" "}
                      {item.base_stat}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {/* Damage relations */}
          <View style={[styles.statsContainer, styles.statsContainerColumn]}>
            <View>
              <Text style={styles.sectionTitle}>Damage Relations</Text>
              {typesResults[0] ? (
                <>
                  <View
                    style={[styles.statsContainer, styles.statsContainerRow]}
                  >
                    <Text style={styles.sectionSecondaryTitle}>
                      Double Damage from
                    </Text>
                    <FlatList
                      data={typesResults[0].double_damage_from}
                      keyExtractor={(result) => result.name}
                      scrollEnabled={true}
                      renderItem={({ item }) => {
                        return (
                          <View
                            style={[styles.listContainer, { marginTop: 0 }]}
                          >
                            <Text key={item.name} style={styles.list}>
                              {item.name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  <View
                    style={[styles.statsContainer, styles.statsContainerRow]}
                  >
                    <Text style={styles.sectionSecondaryTitle}>
                      Double Damage to
                    </Text>
                    <FlatList
                      data={typesResults[0].double_damage_to}
                      keyExtractor={(result) => result.name}
                      scrollEnabled={true}
                      renderItem={({ item }) => {
                        return (
                          <View
                            style={[styles.listContainer, { marginTop: 0 }]}
                          >
                            <Text key={item.name} style={styles.list}>
                              {item.name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </>
              ) : null}
            </View>
          </View>
          {/* Moves */}
          <View style={[styles.statsContainer, styles.statsContainerColumn]}>
            <Text>
              {queryResults.moves ? (
                <Text style={styles.sectionTitle}>Moves</Text>
              ) : null}
            </Text>
            <View>
              <FlatList
                style={styles.list}
                data={queryResults.moves}
                keyExtractor={(result) => result.move.name}
                scrollEnabled={true}
                numColumns={2}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.moveContainer}>
                      <Text
                        key={item.move.name}
                        style={[
                          styles.list,
                          {
                            alignSelf: "flex-start",
                          },
                        ]}
                      >
                        {removeDashes(capitalize(item.move.name))}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
    borderTopLeftRadius: 200,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 32,
    maxWidth: 320,
  },
  statsContainer: {
    padding: 32,
    width: "100%",
    display: "flex",
  },
  statsContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // borderWidth: 1,
    // borderColor: "orange",
    // backgroundColor: colours.default.navigator,
  },
  statsContainerColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
    // borderWidth: 1,
    // borderColor: "blue",
  },
  listContainer: {
    marginVertical: 8,
  },
  list: {
    fontSize: 15,
    // marginVertical: 5,
    color: colours.default.font,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colours.default.font,
  },
  sectionSecondaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 4,
    color: colours.default.font,
  },
  typesStyles: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  typesStylesTitle: {
    fontWeight: "bold",
    color: colours.default.font,
  },
  typesStylesList: {
    marginHorizontal: 5,
    color: colours.default.font,
    alignSelf: "flex-start",
  },
  typeContainer: {
    backgroundColor: colours.default.typeBackground,
    marginVertical: 4,
    padding: 5,
    borderRadius: 6,
  },
  typeColor: {
    width: 10,
    height: 10,
    alignSelf: "center",
  },
  moveContainer: {
    width: "100%",
    maxWidth: 110,
    marginVertical: 8,
  },
});

export default StatsScreen;
