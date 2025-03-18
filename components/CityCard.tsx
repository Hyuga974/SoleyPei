import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LocationInfo } from '@/models/coodrinate';

// Mock data for cities (replace with your API response)
const cities = [
  {
    name: 'Paris',
    state: 'Ile-de-France',
    country: 'FR',
    lat: 48.8588897,
    lon: 2.3200410217200766,
  },
  {
    name: 'Paris',
    state: 'Texas',
    country: 'US',
    lat: 33.6617962,
    lon: -95.555513,
  },
  {
    name: 'Paris',
    state: 'Kentucky',
    country: 'US',
    lat: 38.2097987,
    lon: -84.2529869,
  },
];

interface CityCardProps {
    city: LocationInfo;
}
useEffect(() => {
    console.log("City Card Component");
}, []);
// City Card Component
const CityCard: React.FC<CityCardProps> = ({ city }) => (

  <LinearGradient
    colors={['#6a11cb', '#2575fc']} // Gradient colors
    style={styles.card}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={styles.cardContent}>
      <Text style={styles.cityName}>{city.name}</Text>
      <Text style={styles.locationText}>
        {city.state}, {city.country}
      </Text>
      <Text style={styles.coordinatesText}>
        Lat: {city.lat.toFixed(4)}, Lon: {city.lon.toFixed(4)}
      </Text>
    </View>
    <Image
      source={require('@/assets/images/city-icon.png')} // Replace with your icon
      style={styles.icon}
    />
  </LinearGradient>
);

// Main Component
export default function CityList() {
    return (
      <FlatList
        data={cities}
        keyExtractor={(item) => `${item.lat}-${item.lon}`}
        renderItem={({ item }) => <CityCard city={item} />}
        contentContainerStyle={styles.container}
      />
    );
  }
// Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  cardContent: {
    flex: 1,
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  locationText: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 4,
  },
  coordinatesText: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 8,
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: '#fff', // Adjust icon color
  },
});