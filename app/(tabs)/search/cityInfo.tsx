import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ForecastData, Weather } from '@/models/weatherData';
import { weatherIcons } from '@/constants/icons';
import * as Location from 'expo-location';
import { Coord, LocationData } from '@/models/coodrinate';
import { getCity } from '@/services/location';
import { getForecast } from '@/services/weatherForecast';
import { getCurrentWeather, getCurrentWeatherFromCoord } from '@/services/weatherNow';
import { useLocalSearchParams } from 'expo-router';

export default function CitySceen() {
    
    const params = useLocalSearchParams();
    console.log("Params:", params);
    
    const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
    const [hourlyForecast, setHourlyForecast] = useState<ForecastData[] | null>(null);
    const [location, setLocation] = useState<Coord | null>(params.lat && params.lon ? { latitude: parseFloat(params.lat as string), longitude: parseFloat(params.lon as string) } : null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [cityName, setCityName] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const city: LocationData | null = await getCity(location!);
            console.log("In cityInfo -> City Data --------->", city);
            if (city) {
                console.log("In cityInfo -> City Data:", city);
                const cityData = JSON.parse(JSON.stringify(city));
                setCityName(cityData[0].local_names.fr + ", " + cityData[0].country);
                console.log("City Name:", cityName);
            } else {
                console.log("Failed to fetch city data.");
            }
        };

        fetchWeather();
        console.log("HEre")
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            const coodrinate: Coord = { latitude: location?.latitude!, longitude: location?.longitude! };
            const weatherData = await getCurrentWeatherFromCoord(coodrinate);
            if (weatherData) {
                
                console.log("In cityInfo -> Weather Data:", weatherData);
                setCurrentWeather({
                    city: weatherData.name,
                    temp: parseFloat((weatherData.main.temp).toFixed(2)),
                    humidity: weatherData.main.humidity,
                    description: weatherData.weather[0].description,
                    icon: weatherData.weather[0].icon,
                }); 
            }
            const hourlyForecastData = await getForecast(cityName!);
            hourlyForecastData ? setHourlyForecast(hourlyForecastData) : setHourlyForecast([]);
        }
        fetchWeather();
    }, [cityName]);



    return (
        <LinearGradient
        colors={currentWeather?.icon.includes("d") ? ['#4c669f', '#3b5998', '#192f6a'] : ['#907bb4', '#0f056b', '#0d0217']}
        style={styles.container}
        >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {currentWeather == null || location == null ? (
              <>
                <ActivityIndicator 
                  size="large" 
                  color="#FFFFFF" 
                  style={{ marginBottom: 20 }}
                />
                <Text style={styles.loadingText}>Chargement en cours...</Text>
              </>      
            ):(
              <View style={styles.currentWeatherContainer}>
              <Text style={styles.cityText}>{cityName}</Text>
              <Text style={styles.temperatureText}>
                  {currentWeather!.temp}°C
              </Text>
              <Text style={styles.conditionText}>{currentWeather!.description}</Text>
              <Image
                  source={weatherIcons[currentWeather!.icon]}
                  style={styles.weatherIcon}
              />
              </View>
            )}
            
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
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});