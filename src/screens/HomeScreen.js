import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Grid from "../components/Grid";

const HomeScreen = () => {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>All Pokemon</Text>
      <Grid />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
