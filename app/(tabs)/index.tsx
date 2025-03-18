import { getCurrentWeather } from '../../services/weatherNow';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Weather, WeatherData } from '@/models/weatherData';
import { weatherIcons } from '@/constants/icons';
import * as Location from 'expo-location';


// Mock data for the hourly forecast

const defaultCurrentWeather = {
  city: 'Saint-Denis, RE',
  temp: 25,
  humidity: 50,
  description: 'Sunny',
  icon: '☀️', 
};
export default function TabOneScreen() {
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(defaultCurrentWeather);
  const [hourlyForecast, setHourlyForecast] = useState<{ time: string; temp: number; icon: string }[]>
  ([
    { time: '12:00', temp: 25, icon: '01d' },
    { time: '13:00', temp: 26, icon: '02d' },
    { time: '14:00', temp: 27, icon: '03d' },
    { time: '15:00', temp: 26, icon: '04d' },
    { time: '16:00', temp: 25, icon: '09d' },
    { time: '17:00', temp: 24, icon: '10d' },
    { time: '18:00', temp: 23, icon: '11d' },
    { time: '19:00', temp: 22, icon: '13d' },
    { time: '20:00', temp: 22, icon: '50d' },
  ]);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const city = "Saint-Denis, RE";
      const weatherData = await getCurrentWeather(city);
  
      if (weatherData) {
        // console.log("Weather Data:", weatherData);
        setCurrentWeather({
          city: weatherData.name,
          temp: parseFloat((weatherData.main.temp - 273.15).toFixed(2)),
          humidity: weatherData.main.humidity,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
        });
        //console.log("Weather Data:", currentWeather);
      } else {
        //console.log("Failed to fetch weather data.");
      }
    };
  
    fetchWeather();
  }, []);
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      console.log("Location before set:", location);
      setLocation(location);
    }

    getCurrentLocation();
    console.log("Location:", JSON.stringify(location));
  }, []);

  return (
    <LinearGradient
      colors={currentWeather?.icon.includes("d")?['#4c669f', '#3b5998', '#192f6a']:['#907bb4', '#0f056b', '#0d0217']}
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
          <Image
            source={weatherIcons[currentWeather!.icon]}
            style={styles.weatherIcon}
          />
        </View>

        {/* Hourly Forecast Section */}
        <View style={styles.hourlyForecastContainer}>
          <Text style={styles.sectionTitle}>Hourly Forecast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {hourlyForecast.length > 0 ? (
              hourlyForecast.map((hour, index) => {
                console.log("Hourly Forecast Item:", hour); // Debugging: Log each hourly forecast item
                return (
                  <View key={index} style={styles.hourlyItem}>
                    <Text style={styles.hourlyTime}>{hour.time}</Text>
                    <Image
                      source={weatherIcons[hour.icon] || weatherIcons['01d']} // Fallback icon if icon is missing
                      style={styles.hourlyIcon}
                    />
                    <Text style={styles.hourlyTemperature}>
                      {Math.round(hour.temp)}°C {/* Round temperature for better readability */}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text>No forecast data available.</Text> // Fallback if no data
            )}
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
    height : 300,
    width : 300,
  },
  hourlyForecastContainer: {
    marginTop: 20,
    color: 'red',
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
    height : 100,
    width : 100,
    maxWidth: 100,
    maxHeight: 100,
  },
  hourlyTemperature: {
    fontSize: 18,
    color: '#fff',
  },
});
