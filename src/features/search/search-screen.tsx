import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MovieFinderTheme } from '@/constants/movie-finder-theme';
import { useMovieLibrary } from '@/features/library/movie-library';
import { movies, type Movie } from '@/features/movies/movie-data';

import styles from './styles';

export function SearchScreen() {
  const { addFavourite, addPending, favouriteIds, pendingIds } = useMovieLibrary();
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [notice, setNotice] = useState('');

  const matchingMovies = movies.filter((movie) => {
    const searchable = `${movie.title} ${movie.director} ${movie.genres.join(' ')}`.toLowerCase();
    return searchable.includes(query.trim().toLowerCase());
  });

  function saveMovie(list: 'favourites' | 'pending'): void {
    if (!selectedMovie) return;
    if (list === 'favourites') addFavourite(selectedMovie.id);
    else addPending(selectedMovie.id);
    setNotice(`${selectedMovie.title} added to ${list === 'favourites' ? 'Favourites' : 'Next up'}.`);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>Find films, directors and genres from TMDB.</Text>
      </View>
      <View style={styles.searchBox}>
        <SymbolView
          name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
          size={21}
          tintColor={MovieFinderTheme.textSecondary}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setQuery}
          placeholder="Search movies, people, genres"
          placeholderTextColor={MovieFinderTheme.textSecondary}
          style={styles.input}
          value={query}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <SymbolView
              name={{ ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' }}
              size={18}
              tintColor={MovieFinderTheme.textSecondary}
            />
          </Pressable>
        )}
      </View>
      <Text style={styles.resultLabel}>{query ? `${matchingMovies.length} results` : 'Popular with your taste'}</Text>
      <ScrollView contentContainerStyle={styles.results} showsVerticalScrollIndicator={false}>
        {matchingMovies.map((movie) => (
          <Pressable
            key={movie.id}
            onPress={() => {
              setNotice('');
              setSelectedMovie(movie);
            }}
            style={({ pressed }) => [styles.result, pressed && styles.pressed]}
          >
            <Image contentFit="cover" source={{ uri: movie.posterUrl }} style={styles.poster} />
            <View style={styles.resultText}>
              <Text numberOfLines={1} style={styles.movieTitle}>
                {movie.title}
              </Text>
              <Text style={styles.movieMeta}>
                {movie.year} · {movie.director}
              </Text>
              <Text numberOfLines={1} style={styles.genre}>
                {movie.genres.join(' · ')}
              </Text>
            </View>
            <SymbolView
              name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
              size={20}
              tintColor={MovieFinderTheme.textSecondary}
            />
          </Pressable>
        ))}
        {matchingMovies.length === 0 && (
          <Text style={styles.emptyText}>No matches yet. Try a movie, director, or genre.</Text>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        onRequestClose={() => setSelectedMovie(null)}
        transparent
        visible={selectedMovie !== null}
      >
        {selectedMovie && (
          <View style={styles.modalBackdrop}>
            <View style={styles.detailSheet}>
              <View style={styles.handle} />
              <Pressable
                accessibilityLabel="Close details"
                onPress={() => setSelectedMovie(null)}
                style={styles.closeButton}
              >
                <SymbolView
                  name={{ ios: 'xmark', android: 'close', web: 'close' }}
                  size={19}
                  tintColor={MovieFinderTheme.text}
                />
              </Pressable>
              <Image contentFit="cover" source={{ uri: selectedMovie.posterUrl }} style={styles.detailPoster} />
              <Text style={styles.detailTitle}>{selectedMovie.title}</Text>
              <Text style={styles.detailMeta}>
                {selectedMovie.year} · {selectedMovie.runtime} · {selectedMovie.director}
              </Text>
              <Text style={styles.overview}>{selectedMovie.overview}</Text>
              <View style={styles.availability}>
                <SymbolView
                  name={{ ios: 'location', android: 'location_on', web: 'location_on' }}
                  size={17}
                  tintColor={MovieFinderTheme.blue}
                />
                <Text style={styles.availabilityText}>
                  {selectedMovie.theatre ?? 'Streaming availability checked for Spain'}
                </Text>
              </View>
              <View style={styles.detailActions}>
                <Pressable
                  onPress={() => saveMovie('favourites')}
                  style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}
                >
                  <SymbolView
                    name={{
                      ios: favouriteIds.includes(selectedMovie.id) ? 'heart.fill' : 'heart',
                      android: favouriteIds.includes(selectedMovie.id) ? 'favorite' : 'favorite_border',
                      web: favouriteIds.includes(selectedMovie.id) ? 'favorite' : 'favorite_border',
                    }}
                    size={18}
                    tintColor={MovieFinderTheme.blue}
                  />
                  <Text style={styles.secondaryText}>
                    {favouriteIds.includes(selectedMovie.id) ? 'In Favourites' : 'Favourite'}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => saveMovie('pending')}
                  style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}
                >
                  <Text style={styles.primaryText}>
                    {pendingIds.includes(selectedMovie.id) ? 'In Next up' : 'Add to Next up'}
                  </Text>
                </Pressable>
              </View>
              {notice.length > 0 && <Text style={styles.notice}>{notice}</Text>}
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}
