import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, type StaticParamList } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { ForYouScreen } from '@/features/for-you/for-you-screen';
import { NextUpScreen } from '@/features/next-up/next-up-screen';
import { ProfileScreen } from '@/features/profile/profile-screen';
import { SearchScreen } from '@/features/search/search-screen';

import { MovieTabBar } from './movie-tab-bar';

const RootTabs = createBottomTabNavigator({
  initialRouteName: 'ForYou',
  screenOptions: {
    headerShown: false,
  },
  tabBar: (props) => <MovieTabBar {...props} />,
  screens: {
    ForYou: {
      screen: ForYouScreen,
      linking: '',
      options: {
        tabBarLabel: 'For you',
      },
    },
    Search: {
      screen: SearchScreen,
      linking: 'search',
      options: {
        tabBarLabel: 'Search',
      },
    },
    NextUp: {
      screen: NextUpScreen,
      linking: 'next-up',
      options: {
        tabBarLabel: 'Next up',
      },
    },
    Profile: {
      screen: ProfileScreen,
      linking: 'profile',
      options: {
        tabBarLabel: 'Profile',
      },
    },
  },
});

export type RootTabParamList = StaticParamList<typeof RootTabs>;

const Navigation = createStaticNavigation(RootTabs);

export function AppNavigation(): React.JSX.Element {
  return <Navigation linking={{ enabled: 'auto', prefixes: [Linking.createURL('/')] }} />;
}
