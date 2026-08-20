import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MovieFinderTheme } from '@/constants/movie-finder-theme';
import { useMovieLibrary } from '@/features/library/movie-library';
import { movieById } from '@/features/movies/movie-data';
import type { RootTabParamList } from '@/navigation/app-navigation';

import styles from './styles';

export function NextUpScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
  const { pendingIds } = useMovieLibrary();
  const [filter, setFilter] = useState<'Tonight' | 'Available now'>('Tonight');
  const [tonightTitle, setTonightTitle] = useState<string | null>(null);
  const pendingMovies = pendingIds.map(movieById);
  const heroMovie = pendingMovies[0];
  const queueMovies = pendingMovies.slice(1);

  if (!heroMovie) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Next up</Text>
            <Text style={styles.count}>{pendingMovies.length} saved</Text>
          </View>
          <Pressable
            onPress={() => setFilter((currentFilter) => (currentFilter === 'Tonight' ? 'Available now' : 'Tonight'))}
            style={({ pressed }) => [styles.filter, pressed && styles.pressed]}
          >
            <SymbolView
              name={{ ios: 'line.3.horizontal.decrease', android: 'filter_list', web: 'filter_list' }}
              size={22}
              tintColor={MovieFinderTheme.blue}
            />
            <Text style={styles.filterText}>{filter}</Text>
            <SymbolView
              name={{ ios: 'chevron.down', android: 'expand_more', web: 'expand_more' }}
              size={17}
              tintColor={MovieFinderTheme.blue}
            />
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <Image contentFit="cover" source={{ uri: heroMovie.posterUrl }} style={styles.heroPoster} />
          <View style={styles.heroInfo}>
            <Text style={styles.heroTitle}>{heroMovie.title}</Text>
            <Text style={styles.reason}>{heroMovie.tasteReason}</Text>
            <View style={styles.infoRow}>
              <SymbolView
                name={{ ios: 'location', android: 'location_on', web: 'location_on' }}
                size={20}
                tintColor={MovieFinderTheme.blue}
              />
              <Text style={styles.infoText}>{heroMovie.theatre ?? 'Ready to stream from your services'}</Text>
              <SymbolView
                name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                size={18}
                tintColor={MovieFinderTheme.textSecondary}
              />
            </View>
            <View style={styles.infoRow}>
              <SymbolView
                name={{ ios: 'play.rectangle.fill', android: 'play_circle', web: 'play_circle' }}
                size={20}
                tintColor={MovieFinderTheme.blue}
              />
              <Text style={styles.infoText}>{heroMovie.streaming ?? 'Theatrical release'}</Text>
              <SymbolView
                name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                size={18}
                tintColor={MovieFinderTheme.textSecondary}
              />
            </View>
            <Pressable
              onPress={() => setTonightTitle(heroMovie.title)}
              style={({ pressed }) => [styles.pickButton, pressed && styles.pressed]}
            >
              <SymbolView
                name={{ ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' }}
                size={21}
                tintColor="#FFFFFF"
              />
              <Text style={styles.pickText}>Pick for tonight</Text>
            </Pressable>
          </View>
        </View>

        {tonightTitle && (
          <View style={styles.choiceBanner}>
            <SymbolView
              name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
              size={18}
              tintColor={MovieFinderTheme.success}
            />
            <Text style={styles.choiceText}>Tonight’s pick: {tonightTitle}</Text>
          </View>
        )}

        <View style={styles.queue}>
          {queueMovies.map((movie) => (
            <Pressable
              key={movie.id}
              onPress={() => setTonightTitle(movie.title)}
              style={({ pressed }) => [styles.queueRow, pressed && styles.pressed]}
            >
              <Image contentFit="cover" source={{ uri: movie.posterUrl }} style={styles.queuePoster} />
              <View style={styles.queueText}>
                <Text style={styles.queueTitle}>{movie.title}</Text>
                <Text style={styles.queueAvailability}>
                  {movie.streaming ?? movie.theatre ?? 'Availability to be checked'}
                </Text>
              </View>
              <SymbolView
                name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                size={22}
                tintColor={MovieFinderTheme.textSecondary}
              />
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={() => navigation.navigate('Profile')}
          style={({ pressed }) => [styles.profileLink, pressed && styles.pressed]}
        >
          <SymbolView
            name={{ ios: 'globe', android: 'language', web: 'language' }}
            size={21}
            tintColor={MovieFinderTheme.textSecondary}
          />
          <Text style={styles.profileText}>Spain · Prime Video, Netflix</Text>
          <Text style={styles.profileAction}>Profile</Text>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={18}
            tintColor={MovieFinderTheme.blue}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
