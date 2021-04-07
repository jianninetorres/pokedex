import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const NavigationButton = ({ children, screen, dataObj, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen, dataObj)}>
      {children}
    </TouchableOpacity>
  );
};

export default withNavigation(NavigationButton);
