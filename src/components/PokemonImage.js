import React from "react";
import { Image, StyleSheet } from "react-native";

// the endpoint pokemon/ from calling showInitialList in the Grid component returns the name

// the endpoint pokemon/name from searchQuery in the Home screen returns an id

const PokemonImage = ({ width, name, id }) => {
  return (
    <>
      {id !== "" ? (
        <Image
          source={{
            uri: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
          }}
          style={width === "l" ? styles.imageL : styles.image}
        />
      ) : (
        <Image
          source={{
            uri: `https://img.pokemondb.net/artwork/large/${name}.jpg`,
          }}
          style={width === "l" ? styles.imageL : styles.image}
        />
      )}
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
