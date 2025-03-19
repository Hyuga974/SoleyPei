import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons'; // For icons
import { LocationInfo, LocationWithWeather } from '@/models/coodrinate'; // Import the LocationInfo type
import { Weather } from '@/models/weatherData';

interface CityCardProps {
    city : LocationWithWeather;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => (
    <View style={styles.cardContainer}>
        <LinearGradient
            colors={city.currentWeather?.icon.includes("d") ? ['#4c669f', '#3b5998', '#192f6a'] : ['#907bb4', '#0f056b', '#0d0217']} // Overlay gradient
            style={styles.gradientOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.cardContent}>
                <Text style={styles.cityName}>{city.name}</Text>
                <View style={styles.locationContainer}>
                    <Feather name="map-pin" size={16} color="#fff" />
                    <Text style={styles.locationText}>
                        {city.state}, {city.country}
                    </Text>
                </View>
                <View style={styles.coordinatesContainer}>
                    <Feather name="map" size={16} color="#fff" />
                    <Text style={styles.coordinatesText}>
                        Lat: {city.lat.toFixed(4)}, Lon: {city.lon.toFixed(4)}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    </View>
);

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 5, // For Android
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    backgroundImage: {
        width: '100%',
        height: 180, // Adjust height as needed
    },
    backgroundImageStyle: {
        borderRadius: 16,
    },
    gradientOverlay: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    cardContent: {
        alignItems: 'flex-start',
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    locationText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 8,
    },
    coordinatesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coordinatesText: {
        fontSize: 14,
        color: '#ddd',
        marginLeft: 8,
    },
});

export default CityCard;