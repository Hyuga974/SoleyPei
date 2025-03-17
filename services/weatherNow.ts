import { WeatherData } from "@/models/weatherData";
import Constants from "expo-constants";



export async function getCurrentWeather(city: string): Promise<WeatherData | null> {
  const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey; 

  if (!apiKey) {
    console.error("OpenWeather API key is missing.");
    return null;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}