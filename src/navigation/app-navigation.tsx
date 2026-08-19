import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  type StaticParamList,
} from "@react-navigation/native";
import * as Linking from "expo-linking";
import { Platform } from "react-native";

import { ExploreScreen } from "@/features/explore/explore-screen";
import { HomeScreen } from "@/features/home/home-screen";

import { WebTabBar } from "./web-tab-bar";

const RootTabs = createBottomTabNavigator({
  initialRouteName: "Home",
  screenOptions: {
    headerShown: false,
  },
  tabBar: (props) =>
    Platform.OS === "web" ? (
      <WebTabBar {...props} />
    ) : (
      <BottomTabBar {...props} />
    ),
  screens: {
    Home: {
      screen: HomeScreen,
      linking: "",
      options: {
        tabBarLabel: "Home",
      },
    },
    Explore: {
      screen: ExploreScreen,
      linking: "explore",
      options: {
        tabBarLabel: "Explore",
      },
    },
  },
});

export type RootTabParamList = StaticParamList<typeof RootTabs>;

const Navigation = createStaticNavigation(RootTabs);

export function AppNavigation(): React.JSX.Element {
  return (
    <Navigation
      linking={{ enabled: "auto", prefixes: [Linking.createURL("/")] }}
    />
  );
}
