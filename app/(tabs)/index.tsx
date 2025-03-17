import { getCurrentWeather } from '../../services/weatherNow';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Weather, WeatherData } from '@/models/weatherData';


// Mock data for the hourly forecast
const hourlyForecast = [
  { time: '12:00', temp: 25, icon: '☀️' },
  { time: '13:00', temp: 26, icon: '☀️' },
  { time: '14:00', temp: 27, icon: '⛅' },
  { time: '15:00', temp: 26, icon: '⛅' },
  { time: '16:00', temp: 25, icon: '🌧️' },
  { time: '17:00', temp: 24, icon: '🌧️' },
  { time: '18:00', temp: 23, icon: '🌧️' },
  { time: '19:00', temp: 22, icon: '🌙' },
];

const defaultCurrentWeather = {
  city: 'Saint-Denis, RE',
  temp: 25,
  humidity: 50,
  description: 'Sunny',
  icon: '☀️', 
};
export default function TabOneScreen() {
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(defaultCurrentWeather);
  const [hourlyForecast, setHourlyForecast] = useState<{ time: string; temp: number; icon: string }[]>([]);
  useEffect(() => {
    const fetchWeather = async () => {
      const city = "Saint-Denis,RE";
      const weatherData = await getCurrentWeather(city);
  
      if (weatherData) {
        console.log("Weather Data:", weatherData);
        setCurrentWeather({
          city: weatherData.name,
          temp: parseFloat((weatherData.main.temp - 273.15).toFixed(2)),
          humidity: weatherData.main.humidity,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
        });
        console.log("Weather Data:", currentWeather);
      } else {
        console.log("Failed to fetch weather data.");
      }
    };
  
    fetchWeather();
  }, []);
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Current Weather Section */}
        <View style={styles.currentWeatherContainer}>
          <Text style={styles.cityText}>{currentWeather!.city}</Text>
          <Text style={styles.temperatureText}>
            {currentWeather!.temp}°C
          </Text>
          <Text style={styles.conditionText}>{currentWeather!.description}</Text>
          <Text style={styles.weatherIcon}>{currentWeather!.icon}</Text>
        </View>

        {/* Hourly Forecast Section */}
        <View style={styles.hourlyForecastContainer}>
          <Text style={styles.sectionTitle}>Hourly Forecast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {hourlyForecast.map((hour, index) => (
              <View key={index} style={styles.hourlyItem}>
                <Text style={styles.hourlyTime}>{hour.time}</Text>
                <Text style={styles.hourlyIcon}>{hour.icon}</Text>
                <Text style={styles.hourlyTemperature}>
                  {hour.temp}°C
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  currentWeatherContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  cityText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  temperatureText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  conditionText: {
    fontSize: 20,
    color: '#fff',
  },
  weatherIcon: {
    fontSize: 60,
    marginTop: 10,
  },
  hourlyForecastContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hourlyItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  hourlyTime: {
    fontSize: 16,
    color: '#fff',
  },
  hourlyIcon: {
    fontSize: 30,
    marginVertical: 5,
  },
  hourlyTemperature: {
    fontSize: 18,
    color: '#fff',
  },
});
