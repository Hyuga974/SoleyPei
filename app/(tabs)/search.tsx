import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons'; // For the search icon
import { getCities } from '@/services/location';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const animatedWidth = new Animated.Value(200); // Initial width of the search bar

  const [searchResults, setSearchResults] = useState<string[]>();

  // Handle focus animation
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedWidth, {
      toValue: 300, // Expand width on focus
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  // Handle blur animation
  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedWidth, {
      toValue: 200, // Shrink width on blur
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const search = () => {
    console.log("You seach something ....")
    console.log("I got some cities : ");

    const cities = getCities(searchQuery).then((cities) => {
      cities?.map((city) => {
        console.log(city.name +" - " + city.state, " - " + city.country);
      });
    });

  };


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchBarContainer, { width: animatedWidth }]}>
        <LinearGradient
          colors={isFocused ? ['#6a11cb', '#2575fc'] : ['#f0f0f0', '#e0e0e0']} // Gradient colors
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Feather name="search" size={20} color={isFocused ? '#fff' : '#999'} style={styles.icon} />
          <TextInput
            style={[styles.searchBar, { color: isFocused ? '#fff' : '#333' }]}
            placeholder="Search..."
            placeholderTextColor={isFocused ? '#ddd' : '#999'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            returnKeyType="search"
            onSubmitEditing={search}
          />
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  searchBarContainer: {
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
});