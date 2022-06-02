import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Search from "../screens/Search";
import PokemonView from "../PokemonView";
import Favorites from "../screens/Favorites";

const screens = {
  Home: {
    screen: Search,
    navigationOptions: {
      title: "Search Pokemon",
      headerStyle: {
        backgroundColor: "#eee",
      },
    },
  },
  FavoritesPage: {
    screen: Favorites,
    navigationOptions: {
      title: "Favorites",
      headerStyle: {
        backgroundColor: "#eee",
      },
    },
  },
};
const HomePage = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: {
      backgroundColor: "#333",
      height: 60,
    },
  },
});

export default createAppContainer(HomePage);
