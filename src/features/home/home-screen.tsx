import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getTrendingMovies } from '@/api/tmdb';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import styles from './styles';

export function HomeScreen() {
  const {
    data: trendingMovies,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['movies', 'trending', 'week'],
    queryFn: getTrendingMovies,
  });

  function renderMovieList() {
    if (isPending) return <ThemedText>Loading trending movies…</ThemedText>;

    if (isError) return <ThemedText>Unable to load movies.</ThemedText>;

    return trendingMovies.map((movie) => <ThemedText key={movie.id}>{movie.title}</ThemedText>);
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <ThemedText>TRENDING MOVIES</ThemedText>
          {renderMovieList()}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}
