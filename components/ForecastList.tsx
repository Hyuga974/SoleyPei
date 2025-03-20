import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ForecastDay from '@/components/ForecastDay';
import { ForecastData } from '@/models/weatherData';

interface ForecastListProps {
  forecastData: ForecastData[]; // Replace 'any' with the actual forecast type if available
}

const ForecastList: React.FC<ForecastListProps> = ({ forecastData }) => {
  return (
    <View style={styles.hourlyForecastContainer}>
      <Text style={styles.sectionTitle}>Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {forecastData && forecastData.length > 0 ? (
          forecastData.map((hour, index) => <ForecastDay key={index} data={hour} />)
        ) : (
          <Text>No forecast data available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hourlyForecastContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ForecastList;
