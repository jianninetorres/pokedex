import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SectionList,
} from "react-native";
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
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.wrapper}>
          {queryResults.id ? (
            <>
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
                            colours.pokemonTypes[
                              queryResults.types[0].type.name
                            ].textColour,
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
                            colours.pokemonTypes[
                              queryResults.types[0].type.name
                            ].textColour,
                        }
                      : { color: colours.default.bodyBg },
                  ]}
                >
                  {capitalize(name)}
                </Text>
                <>
                  <PokemonImage name={name} width="l" id={queryResults.id} />
                </>
              </View>
              <View
                key={queryResults.id}
                style={[styles.statsContainer, styles.statsContainerRow]}
              >
                <View>
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
                </View>
                <View>
                  <>
                    <Text style={styles.sectionTitle}>Base experience</Text>
                    <View style={styles.listContainer}>
                      <Text style={[styles.list, styles.listWhite]}>
                        {queryResults.base_experience}
                      </Text>
                    </View>
                  </>
                </View>
              </View>
              <View
                style={[styles.statsContainer, styles.statsContainerColumn]}
              >
                <Text>
                  <Text style={styles.sectionTitle}>Stats</Text>
                </Text>
                <FlatList
                  style={[styles.list, styles.listWhite]}
                  data={queryResults.stats}
                  keyExtractor={(result) => result.stat.name}
                  scrollEnabled={false}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.listContainer}>
                        <Text
                          key={item.stat.name}
                          style={[styles.list, styles.listWhite]}
                        >
                          {removeDashes(capitalize(item.stat.name))}:{" "}
                          {item.base_stat}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
                Damage Relations
              </Text>
              <View style={[styles.statsContainer, styles.statsContainerRow]}>
                <View>
                  <Text style={styles.sectionSecondaryTitle}>Strengths</Text>
                  {typesResults[0] ? (
                    <>
                      <SectionList
                        sections={[
                          {
                            title: "2x damage",
                            data: typesResults[0].double_damage_to,
                          },
                          {
                            title: "1/2 damage",
                            data: typesResults[0].half_damage_to,
                          },
                          {
                            title: "No damage",
                            data: typesResults[0].no_damage_to,
                          },
                        ]}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => {
                          return (
                            <View
                              style={[
                                styles.listContainer,
                                { borderRadius: 20, overflow: "hidden" },
                              ]}
                            >
                              <Text
                                key={item.name}
                                style={[
                                  styles.list,
                                  styles.listDark,
                                  {
                                    backgroundColor:
                                      colours.pokemonTypes[item.name].bgColour,
                                    fontWeight: "bold",
                                    paddingVertical: 2,
                                    paddingHorizontal: 10,
                                  },
                                ]}
                              >
                                {item.name}
                              </Text>
                            </View>
                          );
                        }}
                        renderSectionHeader={({ section: { title, data } }) => (
                          <>
                            {data.length > 0 ? (
                              <Text style={styles.sectionSecondaryTitle}>
                                {title}
                              </Text>
                            ) : (
                              <>
                                <Text style={styles.sectionSecondaryTitle}>
                                  {title}
                                </Text>
                                <Text style={[styles.list, styles.listWhite]}>
                                  -
                                </Text>
                              </>
                            )}
                          </>
                        )}
                      />
                    </>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.sectionSecondaryTitle}>Weaknesses</Text>
                  {typesResults[0] ? (
                    <>
                      <SectionList
                        sections={[
                          {
                            title: "2x damage",
                            data: typesResults[0].double_damage_from,
                          },
                          {
                            title: "1/2 damage",
                            data: typesResults[0].half_damage_from,
                          },
                          {
                            title: "No damage",
                            data: typesResults[0].no_damage_from,
                          },
                        ]}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => {
                          return (
                            <View
                              style={[
                                styles.listContainer,
                                { borderRadius: 20, overflow: "hidden" },
                              ]}
                            >
                              <Text
                                key={item.name}
                                style={[
                                  styles.list,
                                  styles.listDark,
                                  {
                                    backgroundColor:
                                      colours.pokemonTypes[item.name].bgColour,
                                    fontWeight: "bold",
                                    paddingVertical: 2,
                                    paddingHorizontal: 10,
                                  },
                                ]}
                              >
                                {item.name}
                              </Text>
                            </View>
                          );
                        }}
                        renderSectionHeader={({ section: { title, data } }) => (
                          <>
                            {data.length > 0 ? (
                              <Text style={styles.sectionSecondaryTitle}>
                                {title}
                              </Text>
                            ) : (
                              <>
                                <Text style={styles.sectionSecondaryTitle}>
                                  {title}
                                </Text>
                                <Text style={[styles.list, styles.listWhite]}>
                                  -
                                </Text>
                              </>
                            )}
                          </>
                        )}
                      />
                    </>
                  ) : null}
                </View>
              </View>
              <View
                style={[styles.statsContainer, styles.statsContainerColumn]}
              >
                <Text style={styles.sectionTitle}>Moves</Text>
                <FlatList
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
                            styles.listWhite,
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
            </>
          ) : null}
        </View>
      </ScrollView>
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
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: "100%",
    display: "flex",
  },
  statsContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  statsContainerColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  listContainer: {
    marginVertical: 8,
  },
  list: {
    fontSize: 15,
  },
  listWhite: {
    color: colours.default.fontWhite,
  },
  listDark: {
    color: colours.default.fontDark,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colours.default.fontWhite,
  },
  sectionSecondaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 4,
    marginVertical: 16,
    color: colours.default.fontWhite,
  },
  typesStyles: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  typesStylesTitle: {
    fontWeight: "bold",
    color: colours.default.fontWhite,
  },
  typesStylesList: {
    marginHorizontal: 5,
    color: colours.default.fontWhite,
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
