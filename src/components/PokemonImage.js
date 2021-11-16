import React from "react";
import { Image, StyleSheet } from "react-native";

// the endpoint pokemon/ from calling showInitialList in the Grid component returns the name

// the endpoint pokemon/name from searchQuery in the Home screen returns an id

const PokemonImage = ({ width, name, id }) => {
  const pad = (number, length) => {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  return (
    <>
      {id !== "" ? (
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pad(id, 3)}.png`,
          }}
          style={width === "l" ? styles.imageL : styles.image}
        />
      ) : (
        <Image
          source={{
            uri: `https://img.pokemondb.net/sprites/bank/normal/${name}.png`,
          }}
          style={width === "l" ? styles.imageL : styles.image}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 90,
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
