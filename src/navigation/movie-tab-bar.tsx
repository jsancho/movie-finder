import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MovieFinderTheme } from '@/constants/movie-finder-theme';

const tabIcons = {
  ForYou: { ios: 'heart', android: 'favorite_border', web: 'favorite_border' },
  Search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  NextUp: { ios: 'play.rectangle', android: 'playlist_play', web: 'playlist_play' },
  Profile: { ios: 'person', android: 'person_outline', web: 'person_outline' },
} as const;

export function MovieTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : route.name;
        const isFocused = state.index === index;
        const color = isFocused ? MovieFinderTheme.blue : MovieFinderTheme.textSecondary;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            key={route.key}
            onPress={() => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
            }}
            style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
          >
            <SymbolView name={tabIcons[route.name as keyof typeof tabIcons]} size={24} tintColor={color} />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: MovieFinderTheme.surface,
    borderTopColor: MovieFinderTheme.line,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    paddingTop: 10,
  },
  tab: { alignItems: 'center', flex: 1, gap: 5, minHeight: 48 },
  tabPressed: { opacity: 0.62 },
  label: { fontSize: 12, fontWeight: '600' },
});
