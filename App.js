import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import StatsScreen from "./src/screens/StatsScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
    Stats: StatsScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Pokedex",
    },
  }
);

export default createAppContainer(navigator);
