import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const PokemonImage = ({ name, navigation }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Stats", { name: name })}
      >
        <Image
          source={{
            uri: `https://img.pokemondb.net/artwork/large/${name}.jpg`,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 120,
    resizeMode: "contain",
  },
});

export default withNavigation(PokemonImage);
