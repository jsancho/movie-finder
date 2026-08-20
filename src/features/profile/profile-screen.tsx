import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MovieFinderTheme } from '@/constants/movie-finder-theme';

import styles from './styles';

const countries = ['Spain', 'France', 'United Kingdom'] as const;
const languages = ['English', 'Spanish', 'French'] as const;
const platforms = ['Netflix', 'Prime Video', 'Disney+', 'MUBI'] as const;

export function ProfileScreen() {
  const [countryIndex, setCountryIndex] = useState(0);
  const [languageIndex, setLanguageIndex] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Netflix', 'Prime Video']);
  const [saved, setSaved] = useState(false);

  function togglePlatform(platform: string): void {
    setSelectedPlatforms((currentPlatforms) =>
      currentPlatforms.includes(platform)
        ? currentPlatforms.filter((candidate) => candidate !== platform)
        : [...currentPlatforms, platform],
    );
    setSaved(false);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Availability and recommendations, tuned for you.</Text>

        <Text style={styles.sectionLabel}>LOCATION</Text>
        <Pressable
          onPress={() => {
            setCountryIndex((currentIndex) => (currentIndex + 1) % countries.length);
            setSaved(false);
          }}
          style={({ pressed }) => [styles.settingRow, pressed && styles.pressed]}
        >
          <View style={styles.settingIcon}>
            <SymbolView
              name={{ ios: 'globe', android: 'language', web: 'language' }}
              size={21}
              tintColor={MovieFinderTheme.blue}
            />
          </View>
          <View style={styles.settingCopy}>
            <Text style={styles.settingTitle}>Country</Text>
            <Text style={styles.settingValue}>{countries[countryIndex]} · cinemas and releases</Text>
          </View>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={21}
            tintColor={MovieFinderTheme.textSecondary}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setLanguageIndex((currentIndex) => (currentIndex + 1) % languages.length);
            setSaved(false);
          }}
          style={({ pressed }) => [styles.settingRow, pressed && styles.pressed]}
        >
          <View style={styles.settingIcon}>
            <SymbolView
              name={{ ios: 'character.bubble', android: 'translate', web: 'translate' }}
              size={21}
              tintColor={MovieFinderTheme.blue}
            />
          </View>
          <View style={styles.settingCopy}>
            <Text style={styles.settingTitle}>Language</Text>
            <Text style={styles.settingValue}>{languages[languageIndex]}</Text>
          </View>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={21}
            tintColor={MovieFinderTheme.textSecondary}
          />
        </Pressable>

        <Text style={styles.sectionLabel}>STREAMING SERVICES</Text>
        <View style={styles.platforms}>
          {platforms.map((platform) => {
            const selected = selectedPlatforms.includes(platform);
            return (
              <Pressable
                key={platform}
                onPress={() => togglePlatform(platform)}
                style={({ pressed }) => [
                  styles.platform,
                  selected && styles.platformSelected,
                  pressed && styles.pressed,
                ]}
              >
                <SymbolView
                  name={{
                    ios: selected ? 'checkmark.circle.fill' : 'plus.circle',
                    android: selected ? 'check_circle' : 'add_circle_outline',
                    web: selected ? 'check_circle' : 'add_circle_outline',
                  }}
                  size={18}
                  tintColor={selected ? '#FFFFFF' : MovieFinderTheme.blue}
                />
                <Text style={[styles.platformText, selected && styles.platformTextSelected]}>{platform}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.helperText}>We’ll prioritise titles you can play with the services you already have.</Text>

        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <SymbolView
              name={{ ios: 'theatermasks', android: 'theaters', web: 'theaters' }}
              size={21}
              tintColor={MovieFinderTheme.blue}
            />
          </View>
          <View style={styles.settingCopy}>
            <Text style={styles.settingTitle}>Theatrical releases</Text>
            <Text style={styles.settingValue}>Show nearby availability</Text>
          </View>
          <View style={styles.toggleOn}>
            <View style={styles.toggleKnob} />
          </View>
        </View>

        <Pressable
          onPress={() => setSaved(true)}
          style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
        >
          <Text style={styles.saveText}>{saved ? 'Preferences saved' : 'Save preferences'}</Text>
        </Pressable>
        {saved && <Text style={styles.savedNotice}>Your next recommendations will use these settings.</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}
