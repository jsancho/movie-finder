import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { MovieLibraryProvider } from '@/features/library/movie-library';
import { AppNavigation } from '@/navigation/app-navigation';

SplashScreen.preventAutoHideAsync();

const fifteenMinutesInMs = 15 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: fifteenMinutesInMs,
    },
  },
});

export default function App(): React.JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MovieLibraryProvider>
            <AnimatedSplashOverlay />
            <AppNavigation />
          </MovieLibraryProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
