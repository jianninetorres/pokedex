import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import colours from "../utils/colours";
import NavigationButton from "../components/NavigationButton";
import PokemonImage from "../components/PokemonImage";
import { capitalize, extractId } from "../utils/helpers";

const evolutions = ({ data }) => {
  const [evolutionsResults, speciesResults] = data;
  let chain = evolutionsResults.chain.evolves_to;
  let evolutionSequence = [];
  let level = null;

  const getEvolutionLevel = (name) => {
    evolutionSequence.filter((pkmn, index) => {
      return pkmn.name === name
        ? (level = evolutionSequence[index + 1].evolutionLevel)
        : null;
    });
  };

  const getEvolutionChain = () => {
    if (chain.length > 0) {
      evolutionSequence.push(
        // add the first pokemon
        (evolutionSequence[evolutionsResults.chain.species.name] = {
          name: evolutionsResults.chain.species.name,
          url: evolutionsResults.chain.species.url,
          evolutionLevel: null,
        })
      );
      chain.map((pokemon, index) => {
        // add the second pokemon
        evolutionSequence[index + 1] = {
          name: pokemon.species.name,
          url: pokemon.species.url,
          evolutionLevel: pokemon.evolution_details[0].min_level,
        };
        if (pokemon.evolves_to[0]) {
          // add the third pokemon
          evolutionSequence[index + 2] = {
            name: pokemon.evolves_to[0].species.name,
            url: pokemon.evolves_to[0].species.url,
            evolutionLevel:
              pokemon.evolves_to[0].evolution_details[0].min_level,
          };
        }
      });

      return (
        <View
          style={[
            styles.statsContainer,
            styles.statsContainerColumn,
            { paddingHorizontal: 0 },
          ]}
        >
          <View
            style={[
              styles.statsContainer,
              styles.statsContainerColumn,
              { paddingVertical: 0 },
            ]}
          >
            <Text style={[styles.sectionSecondaryTitle, styles.listWhite]}>
              Evolves from
            </Text>
            {speciesResults.evolves_from_species ? (
              <NavigationButton
                screen="Stats"
                dataObj={{
                  name: speciesResults.evolves_from_species.name,
                  url: speciesResults.evolves_from_species.url,
                }}
              >
                <PokemonImage
                  name={speciesResults.evolves_from_species.name}
                  id={extractId(speciesResults.evolves_from_species.url)}
                />
                <Text style={styles.listWhite}>
                  {getEvolutionLevel(speciesResults.evolves_from_species.name)}
                  {level ? `Lvl ${level}` : null}{" "}
                  {capitalize(speciesResults.evolves_from_species.name)}
                </Text>
              </NavigationButton>
            ) : (
              <Text style={styles.listWhite}> - </Text>
            )}
            <Text style={[styles.sectionSecondaryTitle, styles.listWhite]}>
              Family
            </Text>
            <View style={[styles.statsContainerRow]}>
              <FlatList
                data={evolutionSequence}
                keyExtractor={(result) => result.name}
                horizontal={true}
                scrollEnabled={true}
                renderItem={({ item, index }) => {
                  return (
                    <NavigationButton
                      screen="Stats"
                      dataObj={{
                        name: evolutionSequence[index].name,
                        url: evolutionSequence[index].url,
                      }}
                    >
                      <PokemonImage
                        name={item}
                        id={extractId(evolutionSequence[index].url)}
                      />
                      <Text style={styles.listWhite}>
                        {capitalize(evolutionSequence[index].name)}
                      </Text>
                    </NavigationButton>
                  );
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <>
      {evolutionsResults.id ? (
        getEvolutionChain()
      ) : (
        <Text style={[styles.sectionSecondaryTitle, styles.listWhite]}>-</Text>
      )}
    </>
  );
};

export default evolutions;

const styles = StyleSheet.create({
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
  listWhite: {
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
});
