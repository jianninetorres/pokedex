import React from "react";
import { Image, StyleSheet } from "react-native";

const PokemonImage = ({ name }) => {
  return (
    <>
      <Image
        source={{
          uri: `https://img.pokemondb.net/artwork/large/${name}.jpg`,
        }}
        style={styles.image}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 120,
    resizeMode: "contain",
  },
  imageL: {
    width: 200,
    height: 240,
    resizeMode: "contain",
  },
});

export default PokemonImage;
