import { getCurrentWeather } from '../../services/weatherNow';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ForecastData, Weather } from '@/models/weatherData';
import { weatherIcons } from '@/constants/icons';
import * as Location from 'expo-location';
import { Coord, LocationData } from '@/models/coodrinate';
import { getCity } from '@/services/location';
import { getForecast } from '@/services/weatherForecast';

const {format, parse} = require('date-fns');

const defaultCurrentWeather = {
  city: 'Saint-Denis, RE',
  temp: 25,
  humidity: 50,
  description: 'Sunny',
  icon: '☀️',
};

export default function TabOneScreen() {
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(defaultCurrentWeather);
  const [hourlyForecast, setHourlyForecast] = useState<ForecastData[] | null>(null);
  const [location, setLocation] = useState<Coord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const city: LocationData | null = await getCity(location!);
      if (city) {
        const cityData = JSON.parse(JSON.stringify(city));
        const cityName = cityData[0].local_names.fr + ", " + cityData[0].country;
        console.log("City Name:", cityName);

        const weatherData = await getCurrentWeather(cityName);
        if (weatherData) {
          setCurrentWeather({
            city: weatherData.name,
            temp: parseFloat((weatherData.main.temp - 273.15).toFixed(2)),
            humidity: weatherData.main.humidity,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
          });
        }

        const hourlyForecastData = await getForecast(cityName);
        console.log("Hourly Forecast Data:", hourlyForecastData);

        hourlyForecastData ? setHourlyForecast(hourlyForecastData) : setHourlyForecast([]);
        hourlyForecast && console.log("Hourly length Data:", hourlyForecast.length);
      } else {
        console.log("Failed to fetch city data.");
      }
    };

    fetchWeather();
  }, [location]);

  useEffect(() => {
    console.log("Hourly Forecast Updated:", hourlyForecast);
  }, [hourlyForecast]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      console.log("Location before edit:", locationData);

      let newLocation = {
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      };
      console.log("Location after edit:", newLocation);

      setLocation(newLocation);
    }

    getCurrentLocation();
  }, []);

  return (
    <LinearGradient
      colors={currentWeather?.icon.includes("d") ? ['#4c669f', '#3b5998', '#192f6a'] : ['#907bb4', '#0f056b', '#0d0217']}
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
            {hourlyForecast && hourlyForecast.length > 0 ? (
              hourlyForecast.map((hour, index) => {
                return (
                  <View key={index} style={styles.hourlyItem}>
                    <Text style={styles.hourlyTime}>{format(parse(hour.dt_txt, 'yyyy-MM-dd HH:mm:ss', new Date()), 'EEEE HH:mm')}</Text>
                    <Image
                      source={weatherIcons[hour.weather[0].icon] || weatherIcons['01d']}
                      style={styles.hourlyIcon}
                    />
                    <Text style={styles.hourlyTemperature}>
                      {Math.round(hour.main.temp-273.15)}°C
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text>No forecast data available.</Text>
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
    height: 300,
    width: 300,
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
    height: 100,
    width: 100,
    maxWidth: 100,
    maxHeight: 100,
  },
  hourlyTemperature: {
    fontSize: 18,
    color: '#fff',
  },
});