import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import getFullList from "../hooks/getFullList";

const HomeScreen = () => {
  const [results, showInitialList, errorMessage] = getFullList();

  const listOfAllPokemon = results.results;

  return (
    <View>
      <Text>Home screen</Text>
      <FlatList
        data={listOfAllPokemon}
        keyExtractor={(result) => result.name}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});

export default HomeScreen;
