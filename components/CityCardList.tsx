import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CityCard from './CityCard'; // Import the CityCard component
import { LocationInfo, LocationWithWeather } from '@/models/coodrinate';
import { Weather } from '@/models/weatherData';

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

interface CityListProps {
    cities: LocationWithWeather[];
}

const CityList: React.FC<CityListProps> = ({cities}) => {
  return (
    <FlatList
      data={cities}
      keyExtractor={(item) => `${item.lat}-${item.lon}`}
      renderItem={({ item }) => <CityCard city={item} />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
});

export default CityList;