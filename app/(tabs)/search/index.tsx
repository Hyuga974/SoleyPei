import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Easing, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { getCities } from '@/services/location';
import CityCardList from '@/components/CityCardList';
import { LocationWithWeather } from '@/models/coodrinate';
import { getCurrentWeather } from '@/services/weatherNow';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const animatedWidth = new Animated.Value(200);

    const [cities, setCities] = useState<LocationWithWeather[]>([]);

    // Handle focus animation
    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(animatedWidth, {
            toValue: 300,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };

    // Handle blur animation
    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(animatedWidth, {
            toValue: 200,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };

    const search = async () => {
        console.log('You searched something ....');
        console.log('I got some cities:');

        try {
            const results = await getCities(searchQuery);

            if (results && results.length > 0) {
                const citiesWithWeather = await Promise.all(
                    results.map(async (city) => {
                        const weatherData = await getCurrentWeather(city.name);
                        const weather = weatherData ? {
                            city: weatherData.name,
                            temp: parseFloat((weatherData.main.temp - 273.15).toFixed(2)),
                            humidity: weatherData.main.humidity,
                            description: weatherData.weather[0].description,
                            icon: weatherData.weather[0].icon,
                        } : null;
                        return {
                            ...city,
                            currentWeather: weather,
                        };
                    })
                );
                setCities(citiesWithWeather);
            } else {
                setCities([]);
            }
        } catch (error) {
            console.error('Error fetching cities or weather data:', error);
            setCities([]);
        }
    };

    return (
        <LinearGradient
            colors={['#192f6a', '#3b5998', '#4c669f']}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.searchContainer}>
                    <Animated.View style={[styles.searchBarContainer, { width: animatedWidth }]}>
                        <LinearGradient
                            colors={isFocused ? ['#907bb4', '#0f056b', '#0d0217'] : ['#0d0217', '#0f056b', '#907bb4']}
                            style={styles.gradientBackground}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Feather name="search" size={20} color="#fff" style={styles.icon} />
                            <TextInput
                                style={[styles.searchBar, { color: '#fff' }]}
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
                <View style={styles.resultsContainer}>
                    {cities.length > 0 ? <CityCardList cities={cities} /> : <Text style={styles.noDataText}>No cities data.</Text>}
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: 50, // Ensures content is below the status bar
    },
    searchContainer: {
        alignItems: 'center',
        marginBottom: 20, // Adds space between search bar and results
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
    resultsContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#fff',
    },
});

