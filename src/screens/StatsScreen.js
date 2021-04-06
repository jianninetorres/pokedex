import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsScreen = ({ navigation }) => {
  const name = navigation.getParam("name");
  return (
    <View>
      <Text>Stats screen for {name}</Text>
    </View>
  );
};

export default StatsScreen;
