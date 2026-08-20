import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { MovieFinderTheme } from '@/constants/movie-finder-theme';
import { useMovieLibrary } from '@/features/library/movie-library';
import { movies } from '@/features/movies/movie-data';

import styles from './styles';

export function ForYouScreen() {
  const { addFavourite, favouriteIds } = useMovieLibrary();
  const [cardIndex, setCardIndex] = useState(0);
  const translateX = useSharedValue(0);

  const candidates = movies.filter((movie) => !favouriteIds.includes(movie.id));
  const movie = candidates[cardIndex % candidates.length] ?? movies[0];

  function makeChoice(choice: 'favourite' | 'skip'): void {
    if (choice === 'favourite') {
      addFavourite(movie.id);
      setCardIndex(0);
    } else {
      setCardIndex((currentIndex) => currentIndex + 1);
    }
    translateX.value = 0;
  }

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > 88) {
        scheduleOnRN(makeChoice, 'favourite');
        return;
      }

      if (translateX.value < -88) {
        scheduleOnRN(makeChoice, 'skip');
        return;
      }

      translateX.value = withSpring(0);
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${interpolate(translateX.value, [-180, 180], [-8, 8])}deg` },
    ],
  }));

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>YOUR TASTE MAKER</Text>
          <Text style={styles.title}>For you</Text>
        </View>
        <View style={styles.privateBadge}>
          <SymbolView
            name={{ ios: 'lock.fill', android: 'lock', web: 'lock' }}
            size={14}
            tintColor={MovieFinderTheme.blue}
          />
          <Text style={styles.privateText}>Private</Text>
        </View>
      </View>

      <Text style={styles.intro}>Swipe right for movies you’d happily watch again.</Text>

      <View style={styles.deck}>
        <View style={styles.backCard} />
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.card, cardStyle]}>
            <Image contentFit="cover" source={{ uri: movie.posterUrl }} style={styles.poster} />
            <View style={styles.posterShade} />
            <View style={styles.cardContent}>
              <Text style={styles.cardMeta}>
                {movie.year} · {movie.runtime}
              </Text>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieDescription}>
                {movie.director} · {movie.genres.join(', ')}
              </Text>
              <View style={styles.reasonPill}>
                <Text style={styles.reasonText}>A good fit for your taste</Text>
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={styles.swipeHint}>
        <SymbolView
          name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
          size={18}
          tintColor={MovieFinderTheme.textSecondary}
        />
        <Text style={styles.hintText}>Skip</Text>
        <View style={styles.hintLine} />
        <Text style={styles.hintText}>Add to taste</Text>
        <SymbolView
          name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
          size={18}
          tintColor={MovieFinderTheme.blue}
        />
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityLabel="Skip movie"
          onPress={() => makeChoice('skip')}
          style={({ pressed }) => [styles.roundButton, pressed && styles.pressed]}
        >
          <SymbolView
            name={{ ios: 'xmark', android: 'close', web: 'close' }}
            size={24}
            tintColor={MovieFinderTheme.textSecondary}
          />
        </Pressable>
        <Pressable
          accessibilityLabel="Add movie to taste"
          onPress={() => makeChoice('favourite')}
          style={({ pressed }) => [styles.primaryRoundButton, pressed && styles.pressed]}
        >
          <SymbolView
            name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }}
            size={24}
            tintColor="#FFFFFF"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
