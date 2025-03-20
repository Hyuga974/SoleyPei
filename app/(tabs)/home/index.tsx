import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getCurrentWeather } from '../../../services/weatherNow';
import { getForecast } from '@/services/weatherForecast';
import { getCity } from '@/services/location';
import { weatherIcons } from '@/constants/icons';
import * as Location from 'expo-location';
import ForecastList from '@/components/ForecastList';
import { Coord, LocationData } from '@/models/coodrinate';
import { ForecastData, Weather } from '@/models/weatherData';

const defaultCurrentWeather = {
    city: 'Saint-Denis, RE',
    temp: 25,
    humidity: 50,
    description: 'Sunny',
    icon: '☀️',
};

export default function HomeScreen() {
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

                    const forecastData = await getForecast(cityName);
                    setHourlyForecast(forecastData || []);
                }
            };
        }

        fetchWeather();
    }, [location]);

    useEffect(() => {
        async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let locationData = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLocation({
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
        });
        }

        getCurrentLocation();
    }, []);

    return (
        <LinearGradient
        colors={currentWeather?.icon.includes("d") ? ['#4c669f', '#3b5998', '#192f6a'] : ['#907bb4', '#0f056b', '#0d0217']}
        style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {currentWeather && (
                <View style={styles.currentWeatherContainer}>
                    <Text style={styles.cityText}>{currentWeather.city}</Text>
                    <Text style={styles.temperatureText}>{currentWeather.temp}°C</Text>
                    <Text style={styles.conditionText}>{currentWeather.description}</Text>
                    <Image
                    source={weatherIcons[currentWeather.icon]}
                    style={styles.weatherIcon}
                    />
                </View>
                )}
                <ForecastList forecastData={hourlyForecast!} />
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
        height: 300,
        width: 300,
    },
});

